import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type LMSCertificate = Tables<"lms_certificates">;
export type LMSNotification = Tables<"lms_notifications">;
export type LMSAnnouncement = Tables<"lms_announcements">;

// Certificates hooks
export function useCertificates(userId?: string) {
  return useQuery({
    queryKey: ["lms-certificates", userId],
    queryFn: async () => {
      let query = supabase.from("lms_certificates").select("*").order("issued_at", { ascending: false });
      if (userId) query = query.eq("user_id", userId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LMSCertificate[];
    },
  });
}

export function useIssueCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (certificate: Omit<TablesInsert<"lms_certificates">, "certificate_number">) => {
      const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const { data, error } = await supabase
        .from("lms_certificates")
        .insert({
          ...certificate,
          certificate_number: certificateNumber,
        } as TablesInsert<"lms_certificates">)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-certificates"] });
      toast.success("Certificate issued!");
    },
    onError: (error) => {
      toast.error("Failed to issue certificate: " + error.message);
    },
  });
}

// Notifications hooks
export function useNotifications(userId?: string) {
  return useQuery({
    queryKey: ["lms-notifications", userId],
    queryFn: async () => {
      let query = supabase.from("lms_notifications").select("*").order("created_at", { ascending: false });
      if (userId) query = query.eq("user_id", userId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LMSNotification[];
    },
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("lms_notifications")
        .update({ is_read: true })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-notifications"] });
    },
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notification: TablesInsert<"lms_notifications">) => {
      const { data, error } = await supabase
        .from("lms_notifications")
        .insert(notification)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-notifications"] });
    },
  });
}

// Announcements hooks
export function useAnnouncements(courseId?: string) {
  return useQuery({
    queryKey: ["lms-announcements", courseId],
    queryFn: async () => {
      let query = supabase.from("lms_announcements").select("*").order("created_at", { ascending: false });
      if (courseId) query = query.eq("course_id", courseId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LMSAnnouncement[];
    },
  });
}

export function useSaveAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (announcement: TablesInsert<"lms_announcements">) => {
      const { data, error } = await supabase
        .from("lms_announcements")
        .insert(announcement)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-announcements"] });
      toast.success("Announcement posted!");
    },
    onError: (error) => {
      toast.error("Failed to post announcement: " + error.message);
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lms_announcements").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-announcements"] });
      toast.success("Announcement deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete announcement: " + error.message);
    },
  });
}
