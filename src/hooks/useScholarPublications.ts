import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Publication {
  id: string;
  user_id: string;
  title: string;
  abstract: string | null;
  content: string | null;
  category: string;
  sub_category: string | null;
  keywords: string[] | null;
  cover_image: string | null;
  file_url: string | null;
  status: string;
  is_published: boolean;
  views_count: number;
  downloads_count: number;
  submitted_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_name?: string;
  author_email?: string;
}

export interface PublicationReview {
  id: string;
  publication_id: string;
  reviewer_id: string;
  rating: number | null;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
  reviewer_name?: string;
}

export const PUBLICATION_CATEGORIES = [
  "Research Paper",
  "Thesis",
  "Dissertation",
  "Article",
  "Book Chapter",
  "Conference Paper",
  "Review Paper",
  "Case Study",
  "Technical Report",
  "Working Paper",
  "Manuscript Study",
  "Translation",
  "Commentary",
  "Other"
];

export const PUBLICATION_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  PUBLISHED: "published",
  REJECTED: "rejected"
};

export function usePublications(filters?: { category?: string; search?: string; status?: string }) {
  return useQuery({
    queryKey: ["scholar-publications", filters],
    queryFn: async () => {
      let query = supabase
        .from("scholar_publications")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (filters?.category && filters.category !== "all") {
        query = query.eq("category", filters.category);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,abstract.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Publication[];
    },
  });
}

export function useMyPublications() {
  return useQuery({
    queryKey: ["my-publications"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("scholar_publications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Publication[];
    },
  });
}

export function usePublication(id: string) {
  return useQuery({
    queryKey: ["publication", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scholar_publications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Publication;
    },
    enabled: !!id,
  });
}

export function usePublicationReviews(publicationId: string) {
  return useQuery({
    queryKey: ["publication-reviews", publicationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publication_reviews")
        .select("*")
        .eq("publication_id", publicationId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PublicationReview[];
    },
    enabled: !!publicationId,
  });
}

export function useCreatePublication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (publication: {
      title: string;
      abstract?: string;
      content?: string;
      category?: string;
      sub_category?: string;
      keywords?: string[];
      cover_image?: string;
      file_url?: string;
      status?: string;
      is_published?: boolean;
      submitted_at?: string;
      published_at?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("scholar_publications")
        .insert({
          title: publication.title,
          abstract: publication.abstract || null,
          content: publication.content || null,
          category: publication.category || "Research Paper",
          sub_category: publication.sub_category || null,
          keywords: publication.keywords || null,
          cover_image: publication.cover_image || null,
          file_url: publication.file_url || null,
          status: publication.status || "draft",
          is_published: publication.is_published || false,
          submitted_at: publication.submitted_at || null,
          published_at: publication.published_at || null,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-publications"] });
      queryClient.invalidateQueries({ queryKey: ["scholar-publications"] });
      toast({
        title: "Publication created",
        description: "Your publication has been saved successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdatePublication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Publication> & { id: string }) => {
      const { data, error } = await supabase
        .from("scholar_publications")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-publications"] });
      queryClient.invalidateQueries({ queryKey: ["scholar-publications"] });
      queryClient.invalidateQueries({ queryKey: ["publication", data.id] });
      toast({
        title: "Publication updated",
        description: "Your changes have been saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeletePublication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("scholar_publications")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-publications"] });
      queryClient.invalidateQueries({ queryKey: ["scholar-publications"] });
      toast({
        title: "Publication deleted",
        description: "The publication has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (review: { publication_id: string; rating: number; comment: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("publication_reviews")
        .insert({
          ...review,
          reviewer_id: user.id,
          is_approved: true, // Auto-approve for demo
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["publication-reviews", data.publication_id] });
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
