import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Globe, 
  Home, 
  Users, 
  FileText, 
  Settings, 
  Save, 
  Loader2,
  BookOpen,
  Calendar,
  Image,
  Quote
} from "lucide-react";

// Static CMS content management (stored in localStorage for demo)
interface CMSContent {
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

const defaultContent: CMSContent = {
  heroTitle: "Jambushrusti Digital Knowledge Hub",
  heroSubtitle: "Preserving Sacred Jain Wisdom",
  heroDescription: "Explore the vast repository of Jain scriptures, teachings, and scholarly works curated under the guidance of Pujya Gurudev Shri Jambuvijayji Maharaj.",
  aboutTitle: "About Jambushrusti",
  aboutDescription: "Jambushrusti is a comprehensive digital platform dedicated to preserving and sharing the profound wisdom of Jainism.",
  missionStatement: "To digitize, preserve, and make accessible the rich heritage of Jain literature and teachings for scholars and seekers worldwide.",
  contactEmail: "contact@jambushrusti.org",
  contactPhone: "+91 98765 43210",
  contactAddress: "Shantigram, Gujarat, India",
  footerText: "© 2024 Jambushrusti. All rights reserved.",
  socialFacebook: "https://facebook.com/jambushrusti",
  socialTwitter: "https://twitter.com/jambushrusti",
  socialYoutube: "https://youtube.com/jambushrusti",
};

export default function CMSManagement() {
  const { toast } = useToast();
  const [content, setContent] = useState<CMSContent>(() => {
    const saved = localStorage.getItem("cms_content");
    return saved ? JSON.parse(saved) : defaultContent;
  });
  const [isSaving, setIsSaving] = useState(false);

  // Stats from database
  const { data: stats } = useQuery({
    queryKey: ["cms-stats"],
    queryFn: async () => {
      const [books, guruvani, articles, blogs, events, gallery] = await Promise.all([
        supabase.from("books").select("id", { count: "exact", head: true }),
        supabase.from("guruvani").select("id", { count: "exact", head: true }),
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("blogs").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
      ]);
      return {
        books: books.count || 0,
        guruvani: guruvani.count || 0,
        articles: articles.count || 0,
        blogs: blogs.count || 0,
        events: events.count || 0,
        gallery: gallery.count || 0,
      };
    },
  });

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem("cms_content", JSON.stringify(content));
      toast({ title: "Settings saved successfully!" });
    } catch (error) {
      toast({ title: "Error saving settings", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setContent(defaultContent);
    localStorage.removeItem("cms_content");
    toast({ title: "Settings reset to defaults" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Website CMS</h1>
            <p className="text-muted-foreground mt-1">Manage homepage, about sections, and public content</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>

        {/* Content Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="rounded-xl border-0 shadow-soft">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats?.books || 0}</p>
              <p className="text-xs text-muted-foreground">Books</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-0 shadow-soft">
            <CardContent className="p-4 text-center">
              <Quote className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats?.guruvani || 0}</p>
              <p className="text-xs text-muted-foreground">Guruvani</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-0 shadow-soft">
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats?.articles || 0}</p>
              <p className="text-xs text-muted-foreground">Articles</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-0 shadow-soft">
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats?.blogs || 0}</p>
              <p className="text-xs text-muted-foreground">Blogs</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-0 shadow-soft">
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats?.events || 0}</p>
              <p className="text-xs text-muted-foreground">Events</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-0 shadow-soft">
            <CardContent className="p-4 text-center">
              <Image className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats?.gallery || 0}</p>
              <p className="text-xs text-muted-foreground">Gallery</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="homepage" className="space-y-6">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="homepage" className="rounded-lg data-[state=active]:bg-background gap-2">
              <Home className="h-4 w-4" />
              Homepage
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-lg data-[state=active]:bg-background gap-2">
              <Users className="h-4 w-4" />
              About
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-lg data-[state=active]:bg-background gap-2">
              <FileText className="h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-background gap-2">
              <Settings className="h-4 w-4" />
              Site Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="homepage" className="space-y-4">
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Hero Section
                </CardTitle>
                <CardDescription>Manage the main banner on the homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Hero Title</Label>
                  <Input
                    value={content.heroTitle}
                    onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                    placeholder="Main headline"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label>Hero Subtitle</Label>
                  <Input
                    value={content.heroSubtitle}
                    onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                    placeholder="Subtitle text"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label>Hero Description</Label>
                  <Textarea
                    value={content.heroDescription}
                    onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
                    placeholder="Description paragraph"
                    rows={3}
                    className="rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  About Section
                </CardTitle>
                <CardDescription>Manage the about page content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>About Title</Label>
                  <Input
                    value={content.aboutTitle}
                    onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
                    placeholder="About section title"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label>About Description</Label>
                  <Textarea
                    value={content.aboutDescription}
                    onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })}
                    placeholder="About section description"
                    rows={4}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label>Mission Statement</Label>
                  <Textarea
                    value={content.missionStatement}
                    onChange={(e) => setContent({ ...content, missionStatement: e.target.value })}
                    placeholder="Organization mission statement"
                    rows={3}
                    className="rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>Manage contact details displayed on the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Contact Email</Label>
                  <Input
                    type="email"
                    value={content.contactEmail}
                    onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                    placeholder="contact@example.com"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label>Contact Phone</Label>
                  <Input
                    value={content.contactPhone}
                    onChange={(e) => setContent({ ...content, contactPhone: e.target.value })}
                    placeholder="+91 12345 67890"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label>Contact Address</Label>
                  <Textarea
                    value={content.contactAddress}
                    onChange={(e) => setContent({ ...content, contactAddress: e.target.value })}
                    placeholder="Full address"
                    rows={2}
                    className="rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Site Settings
                </CardTitle>
                <CardDescription>General website configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Footer Text</Label>
                  <Input
                    value={content.footerText}
                    onChange={(e) => setContent({ ...content, footerText: e.target.value })}
                    placeholder="Footer copyright text"
                    className="rounded-xl"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Facebook URL</Label>
                    <Input
                      value={content.socialFacebook}
                      onChange={(e) => setContent({ ...content, socialFacebook: e.target.value })}
                      placeholder="Facebook page URL"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Twitter URL</Label>
                    <Input
                      value={content.socialTwitter}
                      onChange={(e) => setContent({ ...content, socialTwitter: e.target.value })}
                      placeholder="Twitter profile URL"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>YouTube URL</Label>
                    <Input
                      value={content.socialYoutube}
                      onChange={(e) => setContent({ ...content, socialYoutube: e.target.value })}
                      placeholder="YouTube channel URL"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links to Content Management */}
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Quick Content Management</CardTitle>
                <CardDescription>Manage different content types from dedicated pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/admin/books">
                      <BookOpen className="h-6 w-6" />
                      <span>Manage Books</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/admin/guruvani">
                      <Quote className="h-6 w-6" />
                      <span>Manage Guruvani</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/admin/articles">
                      <FileText className="h-6 w-6" />
                      <span>Manage Articles</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/admin/blog">
                      <FileText className="h-6 w-6" />
                      <span>Manage Blog</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/admin/events">
                      <Calendar className="h-6 w-6" />
                      <span>Manage Events</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <a href="/admin/gallery">
                      <Image className="h-6 w-6" />
                      <span>Manage Gallery</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
