import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Emagazine {
  id: string;
  title: string;
  volume: string | null;
  issue_date: string | null;
  year: number;
  cover_image: string | null;
  pdf_url: string;
  description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export function useEmagazinesFromDB() {
  return useQuery({
    queryKey: ["emagazines"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emagazines")
        .select("*")
        .eq("is_published", true)
        .order("year", { ascending: false })
        .order("issue_date", { ascending: false });

      if (error) throw error;
      return data as Emagazine[];
    },
  });
}

export function useAllEmagazines() {
  return useQuery({
    queryKey: ["emagazines-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emagazines")
        .select("*")
        .order("year", { ascending: false })
        .order("issue_date", { ascending: false });

      if (error) throw error;
      return data as Emagazine[];
    },
  });
}

export function useEmagazinesByYear() {
  return useQuery({
    queryKey: ["emagazines-by-year"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emagazines")
        .select("*")
        .eq("is_published", true)
        .order("year", { ascending: false })
        .order("issue_date", { ascending: false });

      if (error) throw error;

      // Group by year
      const grouped: Record<number, Emagazine[]> = {};
      (data as Emagazine[]).forEach((magazine) => {
        if (!grouped[magazine.year]) {
          grouped[magazine.year] = [];
        }
        grouped[magazine.year].push(magazine);
      });

      return grouped;
    },
  });
}
