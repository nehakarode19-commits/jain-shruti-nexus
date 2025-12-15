import { Facebook, Twitter, Linkedin, Mail, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  url?: string;
  title: string;
  description?: string;
  compact?: boolean;
}

export function SocialShareButtons({ 
  url = typeof window !== "undefined" ? window.location.href : "", 
  title, 
  description = "",
  compact = false 
}: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "hover:bg-primary hover:text-primary-foreground",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Share2 className="h-4 w-4" /> Share:
        </span>
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full bg-secondary/50 ${link.color} transition-all duration-300`}
            onClick={() => handleShare(link.url)}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          onClick={copyToClipboard}
          aria-label="Copy link"
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
        <Share2 className="h-4 w-4 text-primary" />
        Share This
      </h4>
      <div className="flex items-center gap-2 flex-wrap">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            className={`gap-2 rounded-full ${link.color} transition-all duration-300`}
            onClick={() => handleShare(link.url)}
          >
            <link.icon className="h-4 w-4" />
            {link.name}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          onClick={copyToClipboard}
        >
          <Link2 className="h-4 w-4" />
          Copy Link
        </Button>
      </div>
    </div>
  );
}
