import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calendar, BookOpen, Loader2 } from "lucide-react";
import { useEmagazinesByYear, Emagazine } from "@/hooks/useEmagazines";
import { format } from "date-fns";

export default function EmagazinePage() {
  const { data: magazinesByYear, isLoading } = useEmagazinesByYear();
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const years = magazinesByYear ? Object.keys(magazinesByYear).sort((a, b) => Number(b) - Number(a)) : [];

  const filteredMagazines = () => {
    if (!magazinesByYear) return [];
    if (selectedYear === "all") {
      return Object.values(magazinesByYear).flat();
    }
    return magazinesByYear[Number(selectedYear)] || [];
  };

  const magazines = filteredMagazines();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 lg:py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "eMagazine – Jambu Jyoti", href: "/emagazine" },
              ]}
            />
            <div className="mt-8 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4" />
                Digital Publication
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                eMagazine – Jambu Jyoti
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore our digital magazine collection featuring insights, articles, and teachings 
                from the rich tradition of Jain scholarship and Gurudev's wisdom.
              </p>
            </div>
          </div>
        </section>

        {/* Archive Section */}
        <section className="py-12 lg:py-16">
          <div className="container max-w-7xl mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Magazine Archive</h2>
                <p className="text-muted-foreground">Browse and download past issues</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter by year:</span>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Magazine Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : magazines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {magazines.map((magazine) => (
                  <MagazineCard key={magazine.id} magazine={magazine} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Issues Available</h3>
                <p className="text-muted-foreground">
                  {selectedYear === "all" 
                    ? "Magazine issues will be available soon." 
                    : `No issues found for ${selectedYear}.`}
                </p>
              </div>
            )}

            {/* Year-wise Archive (when showing all) */}
            {selectedYear === "all" && magazinesByYear && Object.keys(magazinesByYear).length > 0 && (
              <div className="mt-16 space-y-12">
                <h2 className="text-2xl font-display font-bold text-foreground text-center">
                  Browse by Year
                </h2>
                {years.map((year) => (
                  <div key={year} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">{year}</h3>
                      <span className="text-sm text-muted-foreground">
                        ({magazinesByYear[Number(year)].length} issue{magazinesByYear[Number(year)].length !== 1 ? 's' : ''})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {magazinesByYear[Number(year)].map((magazine) => (
                        <MagazineCard key={magazine.id} magazine={magazine} compact />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function MagazineCard({ magazine, compact = false }: { magazine: Emagazine; compact?: boolean }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
        {magazine.cover_image ? (
          <img
            src={magazine.cover_image}
            alt={magazine.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-primary/60">
            <FileText className="h-16 w-16 mb-2" />
            <span className="text-sm font-medium">Jambu Jyoti</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
          {magazine.year}
        </div>
      </div>
      <CardContent className={compact ? "p-3" : "p-4"}>
        <h3 className={`font-semibold text-foreground line-clamp-2 ${compact ? "text-sm" : "text-base"} mb-1`}>
          {magazine.title}
        </h3>
        {magazine.volume && (
          <p className="text-xs text-muted-foreground mb-1">{magazine.volume}</p>
        )}
        {magazine.issue_date && (
          <p className="text-xs text-muted-foreground mb-3">
            {format(new Date(magazine.issue_date), "MMMM yyyy")}
          </p>
        )}
        {!compact && magazine.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {magazine.description}
          </p>
        )}
        <Button
          asChild
          size={compact ? "sm" : "default"}
          className="w-full gap-2"
        >
          <a href={magazine.pdf_url} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
