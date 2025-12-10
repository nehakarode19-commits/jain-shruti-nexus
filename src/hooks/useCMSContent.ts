import { useState, useEffect } from "react";

export interface CMSContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  missionStatement: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  footerText: string;
  socialFacebook: string;
  socialTwitter: string;
  socialYoutube: string;
}

export const defaultCMSContent: CMSContent = {
  heroTitle: "Jambushrusti Digital Knowledge Hub",
  heroSubtitle: "Preserving Sacred Jain Wisdom",
  heroDescription: "Explore the vast repository of Jain scriptures, teachings, and scholarly works curated under the guidance of Pujya Gurudev Shri Jambuvijayji Maharaj.",
  aboutTitle: "About Jambushrusti",
  aboutDescription: "A comprehensive digital ecosystem dedicated to preserving, researching, and sharing the timeless wisdom of Jain philosophy through the teachings of Gurudev Muni Jambuvijayji Maharaj.",
  missionStatement: "To digitize, preserve, and make accessible the rich heritage of Jain literature and teachings for scholars and seekers worldwide.",
  contactEmail: "contact@jambushrusti.org",
  contactPhone: "+91 98765 43210",
  contactAddress: "Shantigram, Gujarat, India",
  footerText: "© 2024 Jambushrusti. All rights reserved.",
  socialFacebook: "https://facebook.com/jambushrusti",
  socialTwitter: "https://twitter.com/jambushrusti",
  socialYoutube: "https://youtube.com/jambushrusti",
};

export function useCMSContent() {
  const [content, setContent] = useState<CMSContent>(() => {
    const saved = localStorage.getItem("cms_content");
    return saved ? { ...defaultCMSContent, ...JSON.parse(saved) } : defaultCMSContent;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("cms_content");
      setContent(saved ? { ...defaultCMSContent, ...JSON.parse(saved) } : defaultCMSContent);
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen to custom event for same-window updates
    window.addEventListener("cms-content-updated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cms-content-updated", handleStorageChange);
    };
  }, []);

  return content;
}

export function saveCMSContent(content: CMSContent) {
  localStorage.setItem("cms_content", JSON.stringify(content));
  window.dispatchEvent(new Event("cms-content-updated"));
}
