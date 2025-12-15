import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type LMSAssignment = Tables<"lms_assignments">;
export type LMSAssignmentSubmission = Tables<"lms_assignment_submissions">;

// Assignments hooks
export function useAssignments(courseId?: string) {
  return useQuery({
    queryKey: ["lms-assignments", courseId],
    queryFn: async () => {
      let query = supabase.from("lms_assignments").select("*").order("created_at", { ascending: false });
      if (courseId) query = query.eq("course_id", courseId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LMSAssignment[];
    },
  });
}

export function useSaveAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (assignment: TablesInsert<"lms_assignments"> & { id?: string }) => {
      if (assignment.id) {
        const { id, ...updateData } = assignment;
        const { data, error } = await supabase
          .from("lms_assignments")
          .update(updateData as TablesUpdate<"lms_assignments">)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lms_assignments")
          .insert(assignment as TablesInsert<"lms_assignments">)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-assignments"] });
      toast.success("Assignment saved successfully");
    },
    onError: (error) => {
      toast.error("Failed to save assignment: " + error.message);
    },
  });
}

export function useDeleteAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lms_assignments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-assignments"] });
      toast.success("Assignment deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete assignment: " + error.message);
    },
  });
}

// Assignment Submissions hooks
export function useAssignmentSubmissions(assignmentId: string) {
  return useQuery({
    queryKey: ["lms-assignment-submissions", assignmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_assignment_submissions")
        .select("*")
        .eq("assignment_id", assignmentId)
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return data as LMSAssignmentSubmission[];
    },
    enabled: !!assignmentId,
  });
}

export function useSubmitAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (submission: TablesInsert<"lms_assignment_submissions">) => {
      const { data, error } = await supabase
        .from("lms_assignment_submissions")
        .insert(submission)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lms-assignment-submissions", variables.assignment_id] });
      toast.success("Assignment submitted!");
    },
    onError: (error) => {
      toast.error("Failed to submit assignment: " + error.message);
    },
  });
}

export function useGradeAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, score, feedback, graded_by }: { id: string; score: number; feedback: string; graded_by: string }) => {
      const { data, error } = await supabase
        .from("lms_assignment_submissions")
        .update({
          score,
          feedback,
          graded_by,
          status: "graded",
          graded_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-assignment-submissions"] });
      toast.success("Assignment graded!");
    },
    onError: (error) => {
      toast.error("Failed to grade assignment: " + error.message);
    },
  });
}
