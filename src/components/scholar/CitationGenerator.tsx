import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface PublicationData {
  title: string;
  published_at?: string | null;
  category: string;
  keywords?: string[] | null;
}

interface CitationGeneratorProps {
  publication: PublicationData;
  authorName?: string;
}

export const CitationGenerator = ({ publication, authorName = "Unknown Author" }: CitationGeneratorProps) => {
  const { toast } = useToast();
  const [copiedStyle, setCopiedStyle] = useState<string | null>(null);

  const year = publication.published_at 
    ? format(new Date(publication.published_at), "yyyy")
    : new Date().getFullYear().toString();
  
  const fullDate = publication.published_at
    ? format(new Date(publication.published_at), "MMMM d, yyyy")
    : format(new Date(), "MMMM d, yyyy");

  const accessDate = format(new Date(), "MMMM d, yyyy");
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Generate citations in different formats
  const citations = {
    apa: `${authorName}. (${year}). ${publication.title}. Jambushrusti Scholar Publications. Retrieved ${accessDate}, from ${currentUrl}`,
    
    mla: `${authorName}. "${publication.title}." Jambushrusti Scholar Publications, ${fullDate}, ${currentUrl}. Accessed ${accessDate}.`,
    
    chicago: `${authorName}. "${publication.title}." Jambushrusti Scholar Publications. Published ${fullDate}. ${currentUrl}.`,
    
    harvard: `${authorName} (${year}) '${publication.title}', Jambushrusti Scholar Publications. Available at: ${currentUrl} (Accessed: ${accessDate}).`,
    
    bibtex: `@article{${authorName.split(' ')[0]?.toLowerCase() || 'author'}${year},
  author = {${authorName}},
  title = {${publication.title}},
  journal = {Jambushrusti Scholar Publications},
  year = {${year}},
  url = {${currentUrl}},
  note = {Accessed: ${accessDate}}
}`
  };

  const handleCopy = async (style: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStyle(style);
      toast({
        title: "Citation copied!",
        description: `${style.toUpperCase()} citation copied to clipboard.`,
      });
      setTimeout(() => setCopiedStyle(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card variant="feature">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Quote className="h-4 w-4" />
          Cite This Publication
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="apa" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="apa" className="text-xs px-2 py-1.5">APA</TabsTrigger>
            <TabsTrigger value="mla" className="text-xs px-2 py-1.5">MLA</TabsTrigger>
            <TabsTrigger value="chicago" className="text-xs px-2 py-1.5">Chicago</TabsTrigger>
            <TabsTrigger value="harvard" className="text-xs px-2 py-1.5">Harvard</TabsTrigger>
            <TabsTrigger value="bibtex" className="text-xs px-2 py-1.5">BibTeX</TabsTrigger>
          </TabsList>
          
          {Object.entries(citations).map(([style, citation]) => (
            <TabsContent key={style} value={style} className="mt-3">
              <div className="relative">
                <div className="bg-muted/50 rounded-lg p-3 pr-12 text-xs leading-relaxed text-muted-foreground font-mono whitespace-pre-wrap break-all">
                  {citation}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={() => handleCopy(style, citation)}
                >
                  {copiedStyle === style ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
