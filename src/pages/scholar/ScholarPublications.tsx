import { useState } from "react";
import { Link } from "react-router-dom";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Search,
  Plus,
  Eye,
  Download,
  Calendar,
  User,
  Filter,
  BookOpen,
  Star,
  Loader2,
  ExternalLink
} from "lucide-react";
import { usePublications, useMyPublications, PUBLICATION_CATEGORIES, PUBLICATION_STATUS } from "@/hooks/useScholarPublications";
import { format } from "date-fns";

const ScholarPublications = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const { data: publications = [], isLoading: loadingPublications } = usePublications({
    category: categoryFilter,
    search: searchQuery
  });
  
  const { data: myPublications = [], isLoading: loadingMyPublications } = useMyPublications();

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      draft: "bg-gray-100 text-gray-700",
      submitted: "bg-blue-100 text-blue-700",
      under_review: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      published: "bg-primary/10 text-primary",
      rejected: "bg-red-100 text-red-700"
    };
    return statusStyles[status] || "bg-gray-100 text-gray-700";
  };

  const PublicationCard = ({ publication, showStatus = false }: { publication: any; showStatus?: boolean }) => (
    <Card variant="feature" className="hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {publication.cover_image ? (
            <img
              src={publication.cover_image}
              alt={publication.title}
              className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-28 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {publication.category}
              </Badge>
              {showStatus && (
                <Badge className={getStatusBadge(publication.status)}>
                  {publication.status.replace("_", " ")}
                </Badge>
              )}
            </div>
            <Link to={`/scholar/publications/${publication.id}`}>
              <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {publication.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {publication.abstract || "No abstract available"}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
              {publication.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(publication.published_at), "MMM d, yyyy")}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {publication.views_count} views
              </span>
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {publication.downloads_count} downloads
              </span>
            </div>
            {publication.keywords && publication.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {publication.keywords.slice(0, 3).map((keyword: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
                {publication.keywords.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{publication.keywords.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ScholarLayout title="Publications">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Scholar Publications
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Browse, submit, and manage scholarly publications</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/scholar/publications/submit">
              <Plus className="h-4 w-4 mr-2" />
              Submit Publication
            </Link>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="browse">Browse All</TabsTrigger>
            <TabsTrigger value="my-publications">My Publications</TabsTrigger>
          </TabsList>

          {/* Browse Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card variant="feature">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by title, abstract, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {PUBLICATION_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{publications.length} publication(s) found</span>
              <span>Sorted by: Most Recent</span>
            </div>

            {/* Publications Grid */}
            {loadingPublications ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : publications.length === 0 ? (
              <Card variant="feature">
                <CardContent className="py-16 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">No publications found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || categoryFilter !== "all"
                      ? "Try adjusting your filters or search query"
                      : "Be the first to submit a publication!"}
                  </p>
                  <Button variant="hero" asChild>
                    <Link to="/scholar/publications/submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Publication
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {publications.map((pub) => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Publications Tab */}
          <TabsContent value="my-publications" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="feature">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{myPublications.length}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </CardContent>
              </Card>
              <Card variant="feature">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {myPublications.filter(p => p.is_published).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Published</div>
                </CardContent>
              </Card>
              <Card variant="feature">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {myPublications.filter(p => p.status === "under_review").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Under Review</div>
                </CardContent>
              </Card>
              <Card variant="feature">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {myPublications.filter(p => p.status === "draft").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Drafts</div>
                </CardContent>
              </Card>
            </div>

            {/* My Publications List */}
            {loadingMyPublications ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : myPublications.length === 0 ? (
              <Card variant="feature">
                <CardContent className="py-16 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">No publications yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start sharing your research with the community
                  </p>
                  <Button variant="hero" asChild>
                    <Link to="/scholar/publications/submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Your First Publication
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myPublications.map((pub) => (
                  <PublicationCard key={pub.id} publication={pub} showStatus />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ScholarLayout>
  );
};

export default ScholarPublications;
