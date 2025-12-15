import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Image, FileText, PenTool, Calendar, GraduationCap, Search, Library, Building, Brain, Key, ClipboardList, Settings } from "lucide-react";

const placeholderModules = [
  { title: "Website CMS", icon: Globe, description: "Manage homepage, about sections, and public content" },
  { title: "Gallery", icon: Image, description: "Upload and organize images and videos" },
  { title: "Books (PDFs)", icon: FileText, description: "Manage digital book uploads and metadata" },
  { title: "Blog", icon: PenTool, description: "Create and publish blog posts" },
  { title: "Events", icon: Calendar, description: "Manage community events and registrations" },
  { title: "Scholars", icon: GraduationCap, description: "Approve and manage scholar applications" },
  { title: "Research Tools", icon: Search, description: "SodhSanchay, SodhSandarbh, Śabdasaṅgraha management" },
  { title: "LMS", icon: Library, description: "Library Management System for Shantigram" },
  { title: "Digital Museum", icon: Building, description: "Muni Jambuvijayaji Research Center exhibits and multimedia" },
  { title: "AI & Indexing", icon: Brain, description: "Search index and AI configuration" },
  { title: "Access Requests", icon: Key, description: "Manage content access approvals" },
  { title: "Logs", icon: ClipboardList, description: "System audit trails and activity logs" },
  { title: "Settings", icon: Settings, description: "System configuration and preferences" },
];

export function AdminPlaceholder({ title }: { title: string }) {
  const module = placeholderModules.find(m => m.title === title) || placeholderModules[0];
  const Icon = module.icon;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{module.description}</p>
        </div>
        <Card className="rounded-2xl border-0 shadow-soft">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">{title} Module</h3>
            <p className="text-muted-foreground text-center max-w-md">
              This module is ready for implementation. Connect to Lovable Cloud for full CRUD functionality with database storage.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

// Export individual page components
// CMSPage is now in CMSManagement.tsx
export const GalleryPage = () => <AdminPlaceholder title="Gallery" />;
export const BooksPage = () => <AdminPlaceholder title="Books (PDFs)" />;
export const ArticlesPage = () => <AdminPlaceholder title="Articles/Tributes" />;
export const BlogPage = () => <AdminPlaceholder title="Blog" />;
export const EventsPage = () => <AdminPlaceholder title="Events" />;
export const ScholarsPage = () => <AdminPlaceholder title="Scholars" />;
export const ResearchPage = () => <AdminPlaceholder title="Research Tools" />;
export const LMSPage = () => <AdminPlaceholder title="LMS" />;
export const MuseumPage = () => <AdminPlaceholder title="Digital Museum" />;
export const AIPage = () => <AdminPlaceholder title="AI & Indexing" />;
export const AccessRequestsPage = () => <AdminPlaceholder title="Access Requests" />;
export const LogsPage = () => <AdminPlaceholder title="Logs" />;
export const SettingsPage = () => <AdminPlaceholder title="Settings" />;
