import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type LMSProgram = Tables<"lms_programs">;
export type LMSBatch = Tables<"lms_batches">;

// Programs hooks
export function usePrograms() {
  return useQuery({
    queryKey: ["lms-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_programs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LMSProgram[];
    },
  });
}

export function useSaveProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program: TablesInsert<"lms_programs"> & { id?: string }) => {
      if (program.id) {
        const { id, ...updateData } = program;
        const { data, error } = await supabase
          .from("lms_programs")
          .update(updateData as TablesUpdate<"lms_programs">)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lms_programs")
          .insert(program as TablesInsert<"lms_programs">)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-programs"] });
      toast.success("Program saved successfully");
    },
    onError: (error) => {
      toast.error("Failed to save program: " + error.message);
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lms_programs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-programs"] });
      toast.success("Program deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete program: " + error.message);
    },
  });
}

// Batches hooks
export function useBatches(courseId?: string, programId?: string) {
  return useQuery({
    queryKey: ["lms-batches", courseId, programId],
    queryFn: async () => {
      let query = supabase.from("lms_batches").select("*").order("start_date", { ascending: true });
      if (courseId) query = query.eq("course_id", courseId);
      if (programId) query = query.eq("program_id", programId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LMSBatch[];
    },
  });
}

export function useSaveBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (batch: TablesInsert<"lms_batches"> & { id?: string }) => {
      if (batch.id) {
        const { id, ...updateData } = batch;
        const { data, error } = await supabase
          .from("lms_batches")
          .update(updateData as TablesUpdate<"lms_batches">)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lms_batches")
          .insert(batch as TablesInsert<"lms_batches">)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-batches"] });
      toast.success("Batch saved successfully");
    },
    onError: (error) => {
      toast.error("Failed to save batch: " + error.message);
    },
  });
}

export function useDeleteBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lms_batches").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-batches"] });
      toast.success("Batch deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete batch: " + error.message);
    },
  });
}
