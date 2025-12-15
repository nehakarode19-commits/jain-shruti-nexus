import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LMSLecture, LMSMaterial } from "./useLMS";

// Admin: Fetch all lectures for a course
export function useAdminLectures(courseId: string) {
  return useQuery({
    queryKey: ["lms-admin-lectures", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_lectures")
        .select("*")
        .eq("course_id", courseId)
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as LMSLecture[];
    },
    enabled: !!courseId,
  });
}

// Admin: Save lecture (create or update)
export function useSaveLecture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lecture: Partial<LMSLecture> & { course_id: string; id?: string }) => {
      const { id, ...lectureData } = lecture;
      
      if (id) {
        const { data, error } = await supabase
          .from("lms_lectures")
          .update(lectureData as any)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lms_lectures")
          .insert(lectureData as any)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lms-admin-lectures", variables.course_id] });
      queryClient.invalidateQueries({ queryKey: ["lms-course"] });
    },
  });
}

// Admin: Delete lecture
export function useDeleteLecture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lectureId: string) => {
      const { error } = await supabase
        .from("lms_lectures")
        .delete()
        .eq("id", lectureId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-admin-lectures"] });
      queryClient.invalidateQueries({ queryKey: ["lms-course"] });
    },
  });
}

// Admin: Fetch all materials for a course
export function useAdminMaterials(courseId: string) {
  return useQuery({
    queryKey: ["lms-admin-materials", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_materials")
        .select("*")
        .eq("course_id", courseId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as LMSMaterial[];
    },
    enabled: !!courseId,
  });
}

// Admin: Save material (create or update)
export function useSaveMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (material: Partial<LMSMaterial> & { course_id: string; id?: string }) => {
      const { id, ...materialData } = material;
      
      if (id) {
        const { data, error } = await supabase
          .from("lms_materials")
          .update(materialData as any)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lms_materials")
          .insert(materialData as any)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lms-admin-materials", variables.course_id] });
      queryClient.invalidateQueries({ queryKey: ["lms-course"] });
    },
  });
}

// Admin: Delete material
export function useDeleteMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (materialId: string) => {
      const { error } = await supabase
        .from("lms_materials")
        .delete()
        .eq("id", materialId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-admin-materials"] });
      queryClient.invalidateQueries({ queryKey: ["lms-course"] });
    },
  });
}

// Admin: Fetch attendance for a lecture
export function useAdminAttendance(lectureId: string) {
  return useQuery({
    queryKey: ["lms-admin-attendance", lectureId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_attendance")
        .select(`
          *,
          profile:profiles(full_name, email)
        `)
        .eq("lecture_id", lectureId)
        .order("attended_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!lectureId,
  });
}

// Admin: Mark attendance
export function useMarkAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lectureId, userId, notes }: { lectureId: string; userId: string; notes?: string }) => {
      const { data, error } = await supabase
        .from("lms_attendance")
        .insert({
          lecture_id: lectureId,
          user_id: userId,
          notes: notes || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lms-admin-attendance", variables.lectureId] });
    },
  });
}
