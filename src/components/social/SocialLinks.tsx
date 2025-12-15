import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { useEnabledSocialMedia } from "@/hooks/useSocialMedia";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

interface SocialLinksProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

export function SocialLinks({ className = "", iconSize = "md" }: SocialLinksProps) {
  const { data: socialMedia, isLoading } = useEnabledSocialMedia();

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  if (isLoading || !socialMedia?.length) {
    return null;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialMedia.map((social) => {
        const Icon = iconMap[social.platform.toLowerCase()];
        if (!Icon || !social.url) return null;

        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sizeClasses[iconSize]} rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110`}
            aria-label={social.platform}
          >
            <Icon className={iconSizes[iconSize]} />
          </a>
        );
      })}
    </div>
  );
}
