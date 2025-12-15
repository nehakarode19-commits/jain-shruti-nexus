import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export interface LMSCourse {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  level: string;
  language: string | null;
  instructor_id: string | null;
  instructor_name: string | null;
  duration: string | null;
  course_mode: string;
  thumbnail_url: string | null;
  is_published: boolean;
  is_restricted: boolean;
  is_paid: boolean | null;
  price: number | null;
  created_at: string;
  updated_at: string;
}

export interface LMSLecture {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  lecture_type: string;
  video_url: string | null;
  stream_url: string | null;
  scheduled_date: string | null;
  venue: string | null;
  speaker: string | null;
  notes: string | null;
  references_text: string | null;
  duration_minutes: number | null;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LMSEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  enrolled_at: string;
  completed_at: string | null;
}

export interface LMSProgress {
  id: string;
  user_id: string;
  lecture_id: string;
  status: string;
  watched_seconds: number;
  completed_at: string | null;
}

export interface LMSMaterial {
  id: string;
  course_id: string | null;
  lecture_id: string | null;
  title: string;
  file_url: string;
  file_type: string | null;
  created_at: string;
}

// Fetch all published courses
export function useCourses() {
  return useQuery({
    queryKey: ["lms-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_courses")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as LMSCourse[];
    },
  });
}

// Fetch single course with lectures
export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ["lms-course", courseId],
    queryFn: async () => {
      const { data: course, error: courseError } = await supabase
        .from("lms_courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;

      const { data: lectures, error: lecturesError } = await supabase
        .from("lms_lectures")
        .select("*")
        .eq("course_id", courseId)
        .eq("is_published", true)
        .order("order_index", { ascending: true });

      if (lecturesError) throw lecturesError;

      const { data: materials, error: materialsError } = await supabase
        .from("lms_materials")
        .select("*")
        .eq("course_id", courseId);

      if (materialsError) throw materialsError;

      return {
        course: course as LMSCourse,
        lectures: lectures as LMSLecture[],
        materials: materials as LMSMaterial[],
      };
    },
    enabled: !!courseId,
  });
}

// Fetch user enrollments
export function useEnrollments() {
  const { user } = useAdminAuth();

  return useQuery({
    queryKey: ["lms-enrollments", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("lms_enrollments")
        .select(`
          *,
          course:lms_courses(*)
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
}

// Enroll in a course
export function useEnrollCourse() {
  const queryClient = useQueryClient();
  const { user } = useAdminAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("lms_enrollments")
        .insert({ user_id: user.id, course_id: courseId })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-enrollments"] });
    },
  });
}

// Check if user is enrolled
export function useIsEnrolled(courseId: string) {
  const { user } = useAdminAuth();

  return useQuery({
    queryKey: ["lms-enrollment-check", courseId, user?.id],
    queryFn: async () => {
      if (!user?.id) return false;

      const { data, error } = await supabase
        .from("lms_enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!user?.id && !!courseId,
  });
}

// Update lecture progress
export function useUpdateProgress() {
  const queryClient = useQueryClient();
  const { user } = useAdminAuth();

  return useMutation({
    mutationFn: async ({
      lectureId,
      status,
      watchedSeconds,
    }: {
      lectureId: string;
      status: string;
      watchedSeconds?: number;
    }) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("lms_lecture_progress")
        .upsert(
          {
            user_id: user.id,
            lecture_id: lectureId,
            status,
            watched_seconds: watchedSeconds || 0,
            completed_at: status === "completed" ? new Date().toISOString() : null,
          },
          { onConflict: "user_id,lecture_id" }
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-progress"] });
    },
  });
}

// Fetch user progress for a course
export function useCourseProgress(courseId: string) {
  const { user } = useAdminAuth();

  return useQuery({
    queryKey: ["lms-progress", courseId, user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data: lectures } = await supabase
        .from("lms_lectures")
        .select("id")
        .eq("course_id", courseId);

      if (!lectures || lectures.length === 0) return [];

      const lectureIds = lectures.map((l) => l.id);

      const { data, error } = await supabase
        .from("lms_lecture_progress")
        .select("*")
        .eq("user_id", user.id)
        .in("lecture_id", lectureIds);

      if (error) throw error;
      return data as LMSProgress[];
    },
    enabled: !!user?.id && !!courseId,
  });
}

// Admin: Fetch all courses
export function useAdminCourses() {
  return useQuery({
    queryKey: ["lms-admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as LMSCourse[];
    },
  });
}

// Admin: Create/Update course
export function useSaveCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (course: Partial<LMSCourse> & { id?: string }) => {
      const { id, ...courseData } = course;
      if (id) {
        const { data, error } = await supabase
          .from("lms_courses")
          .update(courseData as any)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lms_courses")
          .insert(courseData as any)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-admin-courses"] });
      queryClient.invalidateQueries({ queryKey: ["lms-courses"] });
    },
  });
}

// Admin: Delete course
export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const { error } = await supabase
        .from("lms_courses")
        .delete()
        .eq("id", courseId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-admin-courses"] });
      queryClient.invalidateQueries({ queryKey: ["lms-courses"] });
    },
  });
}
