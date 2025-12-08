import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, ArrowRight, Lock, Globe, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContentCardProps {
  id: string | number;
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  categoryIcon?: LucideIcon;
  badges?: Array<{ label: string; variant?: "default" | "secondary" | "outline" }>;
  metadata?: Array<{ icon: LucideIcon; label: string }>;
  tags?: string[];
  isRestricted?: boolean;
  isAvailable?: boolean;
  actionLabel?: string;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
  index?: number;
}

export const ContentCard = React.forwardRef<HTMLAnchorElement, ContentCardProps>(
  ({
    id,
    href,
    image,
    title,
    subtitle,
    description,
    category,
    categoryIcon: CategoryIcon,
    badges = [],
    metadata = [],
    tags = [],
    isRestricted = false,
    isAvailable,
    actionLabel = "View Details",
    aspectRatio = "portrait",
    className,
    index = 0,
  }, ref) => {
    const aspectClasses = {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
    };

    return (
      <Link
        ref={ref}
        to={href}
        className={cn("group block h-full", className)}
      >
        <Card 
          variant="interactive"
          className="overflow-hidden h-full animate-fade-up"
          style={{ animationDelay: `${(index % 12) * 50}ms` }}
        >
          {/* Cover Image */}
          <div className={cn("overflow-hidden bg-secondary/30 relative", aspectClasses[aspectRatio])}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
              {category && (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-background/90 backdrop-blur-sm border-0"
                >
                  {CategoryIcon && <CategoryIcon className="h-3 w-3 mr-1" />}
                  {category}
                </Badge>
              )}
              
              {isAvailable !== undefined && (
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-xs bg-background/90 backdrop-blur-sm",
                    isAvailable 
                      ? "text-sage border-sage/50" 
                      : "text-muted-foreground border-border"
                  )}
                >
                  {isAvailable ? "Available" : "Reference Only"}
                </Badge>
              )}
              
              {isRestricted && (
                <Badge 
                  variant="outline"
                  className="text-xs bg-background/90 backdrop-blur-sm"
                >
                  <Lock className="h-3 w-3 mr-1" />
                  Restricted
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-4 flex flex-col">
            {/* Custom Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {badges.map((badge, i) => (
                  <Badge 
                    key={i} 
                    variant={badge.variant || "secondary"} 
                    className="text-xs"
                  >
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="font-display font-semibold text-foreground text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-1">
              {title}
            </h3>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xs text-primary font-medium mb-2 line-clamp-1">
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {description}
              </p>
            )}

            {/* Metadata */}
            {metadata.length > 0 && (
              <div className="space-y-1 mb-3">
                {metadata.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <item.icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-clamp-1">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Action */}
            <div className="mt-auto pt-3 border-t border-border">
              {isRestricted ? (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Sign In to Access</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary flex items-center gap-1 group-hover:underline">
                    {actionLabel}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }
);

ContentCard.displayName = "ContentCard";

// Compact variant for smaller grids
export interface CompactCardProps {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  index?: number;
  className?: string;
}

export const CompactCard = React.forwardRef<HTMLAnchorElement, CompactCardProps>(
  ({ href, image, title, subtitle, badge, index = 0, className }, ref) => {
    return (
      <Link
        ref={ref}
        to={href}
        className={cn("group block", className)}
      >
        <Card 
          variant="interactive"
          className="overflow-hidden animate-fade-up"
          style={{ animationDelay: `${(index % 12) * 50}ms` }}
        >
          <div className="aspect-square bg-secondary/30 overflow-hidden relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {badge && (
              <Badge 
                variant="secondary" 
                className="absolute top-2 left-2 text-[10px] bg-background/90 backdrop-blur-sm border-0"
              >
                {badge}
              </Badge>
            )}
          </div>
          <CardContent className="p-3">
            <h3 className="font-display font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {subtitle}
              </p>
            )}
          </CardContent>
        </Card>
      </Link>
    );
  }
);

CompactCard.displayName = "CompactCard";
