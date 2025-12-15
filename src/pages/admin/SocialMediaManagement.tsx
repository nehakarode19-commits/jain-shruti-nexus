import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Save, Globe, ExternalLink } from "lucide-react";
import { useSocialMediaSettings, useUpdateSocialMedia, SocialMediaSetting } from "@/hooks/useSocialMedia";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

const platformColors: Record<string, string> = {
  facebook: "bg-[#1877F2]",
  twitter: "bg-[#1DA1F2]",
  instagram: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  youtube: "bg-[#FF0000]",
  linkedin: "bg-[#0A66C2]",
};

export default function SocialMediaManagement() {
  const { data: settings, isLoading } = useSocialMediaSettings();
  const updateMutation = useUpdateSocialMedia();
  const [editedSettings, setEditedSettings] = useState<Record<string, Partial<SocialMediaSetting>>>({});

  const handleUrlChange = (id: string, url: string) => {
    setEditedSettings((prev) => ({
      ...prev,
      [id]: { ...prev[id], url },
    }));
  };

  const handleToggle = (setting: SocialMediaSetting) => {
    updateMutation.mutate({
      id: setting.id,
      is_enabled: !setting.is_enabled,
    });
  };

  const handleSave = (setting: SocialMediaSetting) => {
    const edited = editedSettings[setting.id];
    if (edited?.url !== undefined) {
      updateMutation.mutate({
        id: setting.id,
        url: edited.url,
      });
      setEditedSettings((prev) => {
        const newState = { ...prev };
        delete newState[setting.id];
        return newState;
      });
    }
  };

  const getCurrentUrl = (setting: SocialMediaSetting) => {
    return editedSettings[setting.id]?.url ?? setting.url ?? "";
  };

  const hasChanges = (id: string) => {
    return editedSettings[id]?.url !== undefined;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-gold flex items-center justify-center">
            <Globe className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Social Media Management</h1>
            <p className="text-muted-foreground">Manage social media links displayed on the website</p>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="border-border/50">
                <CardHeader className="pb-3">
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full mb-3" />
                  <Skeleton className="h-6 w-20" />
                </CardContent>
              </Card>
            ))
          ) : (
            settings?.map((setting) => {
              const Icon = iconMap[setting.platform.toLowerCase()] || Globe;
              const colorClass = platformColors[setting.platform.toLowerCase()] || "bg-primary";

              return (
                <Card 
                  key={setting.id} 
                  className={`border-border/50 transition-all duration-300 ${
                    setting.is_enabled ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg ${colorClass} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg capitalize">{setting.platform}</CardTitle>
                          <CardDescription className="text-xs">
                            {setting.is_enabled ? "Visible on website" : "Hidden"}
                          </CardDescription>
                        </div>
                      </div>
                      <Switch
                        checked={setting.is_enabled}
                        onCheckedChange={() => handleToggle(setting)}
                        disabled={updateMutation.isPending}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`url-${setting.id}`} className="text-sm">
                        Profile URL
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id={`url-${setting.id}`}
                          value={getCurrentUrl(setting)}
                          onChange={(e) => handleUrlChange(setting.id, e.target.value)}
                          placeholder={`https://${setting.platform}.com/yourprofile`}
                          className="flex-1"
                        />
                        {getCurrentUrl(setting) && (
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <a
                              href={getCurrentUrl(setting)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {hasChanges(setting.id) && (
                      <Button
                        onClick={() => handleSave(setting)}
                        disabled={updateMutation.isPending}
                        size="sm"
                        className="w-full gap-2"
                      >
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Info Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Social Media Integration</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Social media links are displayed in the website footer and can be used for sharing content. 
                  Enable or disable platforms as needed. Users can also share content directly to these platforms 
                  using the share buttons available on articles, blogs, and other content pages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
