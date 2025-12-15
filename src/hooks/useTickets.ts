import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description: string | null;
  category_id: string | null;
  sub_category: string | null;
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "on_hold" | "resolved" | "closed";
  tags: string[] | null;
  attachment_url: string | null;
  created_by: string | null;
  assigned_to: string | null;
  resolved_at: string | null;
  closed_at: string | null;
  sla_deadline: string | null;
  sla_breached: boolean | null;
  created_at: string;
  updated_at: string;
  category?: TicketCategory;
}

export interface TicketCategory {
  id: string;
  name: string;
  parent_id: string | null;
  description: string | null;
  sla_hours: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  user_id: string | null;
  comment: string;
  is_internal: boolean | null;
  created_at: string;
}

export interface TicketActivity {
  id: string;
  ticket_id: string;
  user_id: string | null;
  action: string;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
}

export interface TicketSLAConfig {
  id: string;
  category_id: string | null;
  priority: string;
  response_hours: number;
  resolution_hours: number;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

// Fetch all tickets
export function useTickets(filters?: {
  status?: string;
  category?: string;
  priority?: string;
  assignedTo?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["tickets", filters],
    queryFn: async () => {
      let query = supabase
        .from("tickets")
        .select(`*, category:ticket_categories(*)`)
        .order("created_at", { ascending: false });

      if (filters?.status) {
        query = query.eq("status", filters.status);
      }
      if (filters?.category) {
        query = query.eq("category_id", filters.category);
      }
      if (filters?.priority) {
        query = query.eq("priority", filters.priority);
      }
      if (filters?.assignedTo) {
        query = query.eq("assigned_to", filters.assignedTo);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,ticket_number.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Ticket[];
    },
  });
}

// Fetch single ticket
export function useTicket(id: string) {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select(`*, category:ticket_categories(*)`)
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Ticket;
    },
    enabled: !!id,
  });
}

// Create/Update ticket
export function useSaveTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ticket: Partial<Ticket> & { id?: string }) => {
      // Calculate SLA deadline based on priority
      const slaHours: Record<string, number> = {
        critical: 4,
        high: 24,
        medium: 48,
        low: 72,
      };
      const deadline = new Date();
      deadline.setHours(deadline.getHours() + (slaHours[ticket.priority || "medium"] || 48));

      if (ticket.id) {
        const { id, category, ...updateData } = ticket as any;
        const { data, error } = await supabase
          .from("tickets")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { category, ...insertData } = ticket as any;
        const { data, error } = await supabase
          .from("tickets")
          .insert({ ...insertData, sla_deadline: deadline.toISOString() })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket saved successfully");
    },
    onError: (error) => {
      toast.error("Failed to save ticket: " + error.message);
    },
  });
}

// Delete ticket
export function useDeleteTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tickets").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete ticket: " + error.message);
    },
  });
}

// Update ticket status
export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const updateData: any = { status };
      if (status === "resolved") {
        updateData.resolved_at = new Date().toISOString();
      } else if (status === "closed") {
        updateData.closed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("tickets")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;

      // Log activity
      await supabase.from("ticket_activity_log").insert({
        ticket_id: id,
        action: `Status changed to ${status}`,
        new_value: status,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket status updated");
    },
    onError: (error) => {
      toast.error("Failed to update status: " + error.message);
    },
  });
}

// Assign ticket
export function useAssignTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, assignedTo }: { id: string; assignedTo: string }) => {
      const { data, error } = await supabase
        .from("tickets")
        .update({ assigned_to: assignedTo })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;

      // Log activity
      await supabase.from("ticket_activity_log").insert({
        ticket_id: id,
        action: "Ticket assigned",
        new_value: assignedTo,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket assigned");
    },
    onError: (error) => {
      toast.error("Failed to assign ticket: " + error.message);
    },
  });
}

// Fetch categories
export function useTicketCategories() {
  return useQuery({
    queryKey: ["ticket-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticket_categories")
        .select("*")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return data as TicketCategory[];
    },
  });
}

// Save category
export function useSaveCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Partial<TicketCategory> & { id?: string; name: string }) => {
      if (category.id) {
        const { id, ...updateData } = category;
        const { data, error } = await supabase
          .from("ticket_categories")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("ticket_categories")
          .insert({ name: category.name, description: category.description, sla_hours: category.sla_hours })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket-categories"] });
      toast.success("Category saved");
    },
    onError: (error) => {
      toast.error("Failed to save category: " + error.message);
    },
  });
}

// Fetch comments for a ticket
export function useTicketComments(ticketId: string) {
  return useQuery({
    queryKey: ["ticket-comments", ticketId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticket_comments")
        .select("*")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as TicketComment[];
    },
    enabled: !!ticketId,
  });
}

// Add comment
export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: { ticket_id: string; comment: string; is_internal?: boolean }) => {
      const { data, error } = await supabase
        .from("ticket_comments")
        .insert(comment)
        .select()
        .single();
      if (error) throw error;

      // Log activity
      await supabase.from("ticket_activity_log").insert({
        ticket_id: comment.ticket_id,
        action: comment.is_internal ? "Internal comment added" : "Comment added",
      });

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ticket-comments", variables.ticket_id] });
      queryClient.invalidateQueries({ queryKey: ["ticket-activity", variables.ticket_id] });
      toast.success("Comment added");
    },
    onError: (error) => {
      toast.error("Failed to add comment: " + error.message);
    },
  });
}

// Fetch activity log for a ticket
export function useTicketActivity(ticketId: string) {
  return useQuery({
    queryKey: ["ticket-activity", ticketId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticket_activity_log")
        .select("*")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as TicketActivity[];
    },
    enabled: !!ticketId,
  });
}

// Fetch SLA configs
export function useSLAConfigs() {
  return useQuery({
    queryKey: ["ticket-sla-configs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticket_sla_configs")
        .select("*")
        .order("priority");
      if (error) throw error;
      return data as TicketSLAConfig[];
    },
  });
}

// Save SLA config
export function useSaveSLAConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: Partial<TicketSLAConfig> & { id?: string; priority: string }) => {
      if (config.id) {
        const { id, ...updateData } = config;
        const { data, error } = await supabase
          .from("ticket_sla_configs")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("ticket_sla_configs")
          .insert({ priority: config.priority, response_hours: config.response_hours, resolution_hours: config.resolution_hours, category_id: config.category_id })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket-sla-configs"] });
      toast.success("SLA configuration saved");
    },
    onError: (error) => {
      toast.error("Failed to save SLA config: " + error.message);
    },
  });
}

// Dashboard stats
export function useTicketStats() {
  return useQuery({
    queryKey: ["ticket-stats"],
    queryFn: async () => {
      const { data: tickets, error } = await supabase.from("tickets").select("*");
      if (error) throw error;

      const now = new Date();
      const stats = {
        total: tickets.length,
        open: tickets.filter((t) => t.status === "open").length,
        inProgress: tickets.filter((t) => t.status === "in_progress").length,
        onHold: tickets.filter((t) => t.status === "on_hold").length,
        resolved: tickets.filter((t) => t.status === "resolved").length,
        closed: tickets.filter((t) => t.status === "closed").length,
        overdue: tickets.filter((t) => t.sla_deadline && new Date(t.sla_deadline) < now && !["resolved", "closed"].includes(t.status)).length,
        critical: tickets.filter((t) => t.priority === "critical" && !["resolved", "closed"].includes(t.status)).length,
        byCategory: {} as Record<string, number>,
        byPriority: {
          low: tickets.filter((t) => t.priority === "low").length,
          medium: tickets.filter((t) => t.priority === "medium").length,
          high: tickets.filter((t) => t.priority === "high").length,
          critical: tickets.filter((t) => t.priority === "critical").length,
        },
      };

      return stats;
    },
  });
}

// Fetch admin/staff users for assignment
export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      // Fetch users who have admin, librarian, or superadmin roles
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .in("role", ["admin", "superadmin", "librarian"]);

      if (roleError) throw roleError;

      if (!roleData || roleData.length === 0) {
        return [];
      }

      const userIds = [...new Set(roleData.map((r) => r.user_id))];

      // Fetch profiles for these users
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .in("user_id", userIds);

      if (profileError) throw profileError;

      // Combine role and profile data
      return (profiles || []).map((profile) => ({
        id: profile.user_id,
        name: profile.full_name || profile.email || "Unknown User",
        email: profile.email,
        role: roleData.find((r) => r.user_id === profile.user_id)?.role,
      }));
    },
  });
}
