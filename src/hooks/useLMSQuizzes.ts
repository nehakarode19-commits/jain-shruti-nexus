import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables, TablesInsert, TablesUpdate, Json } from "@/integrations/supabase/types";

export type LMSQuiz = Tables<"lms_quizzes">;
export type LMSQuizQuestion = Tables<"lms_quiz_questions">;
export type LMSQuizAttempt = Tables<"lms_quiz_attempts">;

// Quizzes hooks
export function useQuizzes(courseId?: string) {
  return useQuery({
    queryKey: ["lms-quizzes", courseId],
    queryFn: async () => {
      let query = supabase.from("lms_quizzes").select("*").order("created_at", { ascending: false });
      if (courseId) query = query.eq("course_id", courseId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LMSQuiz[];
    },
  });
}

export function useQuiz(quizId: string) {
  return useQuery({
    queryKey: ["lms-quiz", quizId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_quizzes")
        .select("*")
        .eq("id", quizId)
        .single();
      if (error) throw error;
      return data as LMSQuiz;
    },
    enabled: !!quizId,
  });
}

export function useSaveQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quiz: TablesInsert<"lms_quizzes"> & { id?: string }) => {
      if (quiz.id) {
        const { id, ...updateData } = quiz;
        const { data, error } = await supabase
          .from("lms_quizzes")
          .update(updateData as TablesUpdate<"lms_quizzes">)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lms_quizzes")
          .insert(quiz as TablesInsert<"lms_quizzes">)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-quizzes"] });
      toast.success("Quiz saved successfully");
    },
    onError: (error) => {
      toast.error("Failed to save quiz: " + error.message);
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lms_quizzes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lms-quizzes"] });
      toast.success("Quiz deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete quiz: " + error.message);
    },
  });
}

// Quiz Questions hooks
export function useQuizQuestions(quizId: string) {
  return useQuery({
    queryKey: ["lms-quiz-questions", quizId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_quiz_questions")
        .select("*")
        .eq("quiz_id", quizId)
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as LMSQuizQuestion[];
    },
    enabled: !!quizId,
  });
}

export function useSaveQuizQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (question: TablesInsert<"lms_quiz_questions"> & { id?: string }) => {
      if (question.id) {
        const { id, ...updateData } = question;
        const { data, error } = await supabase
          .from("lms_quiz_questions")
          .update(updateData as TablesUpdate<"lms_quiz_questions">)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lms_quiz_questions")
          .insert(question as TablesInsert<"lms_quiz_questions">)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lms-quiz-questions", variables.quiz_id] });
      toast.success("Question saved");
    },
    onError: (error) => {
      toast.error("Failed to save question: " + error.message);
    },
  });
}

export function useDeleteQuizQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, quizId }: { id: string; quizId: string }) => {
      const { error } = await supabase.from("lms_quiz_questions").delete().eq("id", id);
      if (error) throw error;
      return quizId;
    },
    onSuccess: (quizId) => {
      queryClient.invalidateQueries({ queryKey: ["lms-quiz-questions", quizId] });
      toast.success("Question deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete question: " + error.message);
    },
  });
}

// Quiz Attempts hooks
export function useQuizAttempts(quizId: string) {
  return useQuery({
    queryKey: ["lms-quiz-attempts", quizId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lms_quiz_attempts")
        .select("*")
        .eq("quiz_id", quizId)
        .order("started_at", { ascending: false });
      if (error) throw error;
      return data as LMSQuizAttempt[];
    },
    enabled: !!quizId,
  });
}

export function useSubmitQuizAttempt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (attempt: TablesInsert<"lms_quiz_attempts">) => {
      const { data, error } = await supabase
        .from("lms_quiz_attempts")
        .insert(attempt)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lms-quiz-attempts", variables.quiz_id] });
      toast.success("Quiz submitted!");
    },
    onError: (error) => {
      toast.error("Failed to submit quiz: " + error.message);
    },
  });
}
