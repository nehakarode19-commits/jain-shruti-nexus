import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface VisitorFeedback {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  feedback_type: string;
  message: string;
  rating: number | null;
  is_read: boolean;
  created_at: string;
}

export const useVisitorFeedback = () => {
  return useQuery({
    queryKey: ["visitor-feedback"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("visitor_feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as VisitorFeedback[];
    },
  });
};

export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: async (feedback: {
      name?: string;
      email?: string;
      phone?: string;
      feedback_type?: string;
      message: string;
      rating?: number;
    }) => {
      const { data, error } = await supabase
        .from("visitor_feedback")
        .insert([feedback])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
    },
    onError: (error) => {
      toast.error("Failed to submit feedback: " + error.message);
    },
  });
};

export const useMarkFeedbackRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_read }: { id: string; is_read: boolean }) => {
      const { error } = await supabase
        .from("visitor_feedback")
        .update({ is_read })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitor-feedback"] });
    },
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("visitor_feedback")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitor-feedback"] });
      toast.success("Feedback deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete: " + error.message);
    },
  });
};
