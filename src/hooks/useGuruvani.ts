import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Guruvani {
  id: string;
  title: string;
  content: string | null;
  category: string | null;
  source: string | null;
  date: string | null;
  audio_url: string | null;
  video_url: string | null;
  image_url: string | null;
  is_published: boolean;
  is_restricted: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface GuruvaniInput {
  title?: string;
  content?: string;
  category?: string;
  source?: string;
  date?: string;
  audio_url?: string;
  video_url?: string;
  image_url?: string;
  is_published?: boolean;
  is_restricted?: boolean;
}

export function useGuruvaniList(includeUnpublished = false) {
  return useQuery({
    queryKey: ["guruvani", includeUnpublished],
    queryFn: async () => {
      let query = supabase.from("guruvani").select("*").order("created_at", { ascending: false });
      
      if (!includeUnpublished) {
        query = query.eq("is_published", true).eq("is_restricted", false);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Guruvani[];
    },
  });
}

export function useGuruvaniById(id: string) {
  return useQuery({
    queryKey: ["guruvani", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guruvani")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Guruvani | null;
    },
    enabled: !!id,
  });
}

export function useCreateGuruvani() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: GuruvaniInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from("guruvani")
        .insert({
          title: input.title || "",
          content: input.content,
          category: input.category,
          source: input.source,
          date: input.date,
          audio_url: input.audio_url,
          video_url: input.video_url,
          image_url: input.image_url,
          is_published: input.is_published,
          is_restricted: input.is_restricted,
          created_by: user?.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guruvani"] });
      toast({
        title: "Success",
        description: "Guruvani created successfully",
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

export function useUpdateGuruvani() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: GuruvaniInput & { id: string }) => {
      const { data, error } = await supabase
        .from("guruvani")
        .update(input)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guruvani"] });
      toast({
        title: "Success",
        description: "Guruvani updated successfully",
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

export function useDeleteGuruvani() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("guruvani").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guruvani"] });
      toast({
        title: "Success",
        description: "Guruvani deleted successfully",
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
