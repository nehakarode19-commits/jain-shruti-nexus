import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SocialMediaSetting {
  id: string;
  platform: string;
  url: string | null;
  is_enabled: boolean;
  icon_name: string | null;
  display_order: number;
}

export const useSocialMediaSettings = () => {
  return useQuery({
    queryKey: ["social-media-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_media_settings")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as SocialMediaSetting[];
    },
  });
};

export const useEnabledSocialMedia = () => {
  return useQuery({
    queryKey: ["social-media-enabled"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_media_settings")
        .select("*")
        .eq("is_enabled", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as SocialMediaSetting[];
    },
  });
};

export const useUpdateSocialMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<SocialMediaSetting> & { id: string }) => {
      const { id, ...updateData } = settings;
      const { data, error } = await supabase
        .from("social_media_settings")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-media-settings"] });
      queryClient.invalidateQueries({ queryKey: ["social-media-enabled"] });
      toast.success("Social media settings updated");
    },
    onError: (error) => {
      toast.error("Failed to update: " + error.message);
    },
  });
};
