import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { books as staticBooks, galleryImages as staticGallery, blogPosts as staticBlogs, events as staticEvents, articles as staticArticles } from "@/data/gurudevData";

// Books Hook - fetches from DB with fallback to static data
export function useBooksFromDB() {
  return useQuery({
    queryKey: ["books-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching books:", error);
        // Return static data as fallback
        return staticBooks.map((book) => ({
          id: String(book.id),
          title: book.title,
          author: "Gurudev Muni Jambuvijayaji",
          description: "",
          cover_image: book.image,
          category: book.category || "Agama",
          language: book.language || "Sanskrit",
          year: null,
          is_published: true,
          pdf_url: book.link || null,
          audio_hindi: null,
          audio_english: null,
          audio_sanskrit: null,
          audio_prakrit: null,
          audio_gujarati: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }

      // If no data from DB, use static data
      if (!data || data.length === 0) {
        return staticBooks.map((book) => ({
          id: String(book.id),
          title: book.title,
          author: "Gurudev Muni Jambuvijayaji",
          description: "",
          cover_image: book.image,
          category: book.category || "Agama",
          language: book.language || "Sanskrit",
          year: null,
          is_published: true,
          pdf_url: book.link || null,
          audio_hindi: null,
          audio_english: null,
          audio_sanskrit: null,
          audio_prakrit: null,
          audio_gujarati: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }

      return data;
    },
  });
}

// Guruvani Hook - fetches from DB with fallback
export function useGuruvaniFromDB() {
  return useQuery({
    queryKey: ["guruvani-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guruvani")
        .select("*")
        .eq("is_published", true)
        .eq("is_restricted", false)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching guruvani:", error);
        return getStaticGuruvani();
      }

      if (!data || data.length === 0) {
        return getStaticGuruvani();
      }

      return data;
    },
  });
}

function getStaticGuruvani() {
  return [
    {
      id: "1",
      title: "On the Nature of Soul (Jiva)",
      category: "Discourse",
      content: "The soul is eternal, ever-conscious, and inherently pure. Through right knowledge and conduct, one realizes the true nature of the self...",
      source: "Gujarati",
      date: "1985-01-01",
      image_url: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg",
      is_published: true,
      is_restricted: false,
    },
    {
      id: "2",
      title: "Commentary on Tattvartha Sutra",
      category: "Written Work",
      content: "A comprehensive examination of reality as presented in the foundational Jain scripture by Umaswati...",
      source: "Sanskrit",
      date: "1978-01-01",
      image_url: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/99-min.jpg",
      is_published: true,
      is_restricted: false,
    },
    {
      id: "3",
      title: "Pravachan on Anekantavada",
      category: "Discourse",
      content: "The doctrine of many-sidedness teaches us that truth can be perceived from multiple perspectives...",
      source: "Gujarati",
      date: "1995-01-01",
      image_url: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/48-min.jpg",
      is_published: true,
      is_restricted: false,
    },
    {
      id: "4",
      title: "On Samyak Darshan",
      category: "Discourse",
      content: "Right faith is the foundation of spiritual progress. Without samyak darshan, neither knowledge nor conduct can lead to liberation...",
      source: "Gujarati",
      date: "1988-01-01",
      image_url: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/76-min.jpg",
      is_published: true,
      is_restricted: false,
    },
  ];
}

// Articles Hook
export function useArticlesFromDB() {
  return useQuery({
    queryKey: ["articles-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        return staticArticles.map((article) => ({
          id: String(article.id),
          title: article.title,
          author: article.author || "Research Team",
          excerpt: article.excerpt || "",
          content: "",
          cover_image: article.image,
          category: article.category || "Research",
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }

      return data;
    },
  });
}

// Blogs Hook
export function useBlogsFromDB() {
  return useQuery({
    queryKey: ["blogs-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        return staticBlogs.map((blog) => ({
          id: String(blog.id),
          title: blog.title,
          author: blog.author || "Editorial Team",
          excerpt: blog.excerpt || "",
          content: "",
          cover_image: blog.image,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }

      return data;
    },
  });
}

// Events Hook
export function useEventsFromDB() {
  return useQuery({
    queryKey: ["events-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("event_date", { ascending: true });

      if (error || !data || data.length === 0) {
        return staticEvents.map((event) => ({
          id: String(event.id),
          title: event.titleEn || event.title,
          description: `${event.titleEn || event.title} - Community Event`,
          event_date: event.date,
          location: "Muni Jambuvijayaji Research Center",
          image_url: event.image,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }

      return data;
    },
  });
}

// Gallery Hook
export function useGalleryFromDB() {
  return useQuery({
    queryKey: ["gallery-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        return staticGallery.map((img, index) => ({
          id: String(index + 1),
          title: img.alt || `Photo ${index + 1}`,
          description: img.alt || "",
          image_url: img.url,
          category: "Gurudev",
          category_division: "gurudev",
          is_published: true,
          created_at: new Date().toISOString(),
        }));
      }

      return data;
    },
  });
}

// Live Telecasts Hook
export function useLiveTelecastsFromDB() {
  return useQuery({
    queryKey: ["live-telecasts-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_telecasts")
        .select("*")
        .eq("is_published", true)
        .order("event_date", { ascending: false });

      if (error) {
        console.error("Error fetching live telecasts:", error);
        return [];
      }

      return data || [];
    },
  });
}
