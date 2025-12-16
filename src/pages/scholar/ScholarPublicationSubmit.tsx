import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Save,
  Send,
  ArrowLeft,
  Plus,
  X,
  Upload,
  Image,
  Loader2,
  File,
  CheckCircle
} from "lucide-react";
import { useCreatePublication, PUBLICATION_CATEGORIES } from "@/hooks/useScholarPublications";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ScholarPublicationSubmit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createPublication = useCreatePublication();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    content: "",
    category: "Research Paper",
    sub_category: "",
    cover_image: "",
    file_url: "",
  });
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useFileUpload, setUseFileUpload] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 50MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!selectedFile) return formData.file_url || null;

    setIsUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `publications/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('scholar-publications')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('scholar-publications')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload the file. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your publication.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let fileUrl = formData.file_url;
      if (useFileUpload && selectedFile) {
        const uploadedUrl = await uploadFile();
        if (uploadedUrl) {
          fileUrl = uploadedUrl;
        }
      }

      await createPublication.mutateAsync({
        ...formData,
        file_url: fileUrl,
        keywords,
        status: "draft",
        is_published: false,
      });
      navigate("/scholar/publications");
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your publication.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.abstract.trim()) {
      toast({
        title: "Abstract required",
        description: "Please provide an abstract for your publication.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let fileUrl = formData.file_url;
      if (useFileUpload && selectedFile) {
        const uploadedUrl = await uploadFile();
        if (uploadedUrl) {
          fileUrl = uploadedUrl;
        }
      }

      await createPublication.mutateAsync({
        ...formData,
        file_url: fileUrl,
        keywords,
        status: "published",
        is_published: true,
        submitted_at: new Date().toISOString(),
        published_at: new Date().toISOString(),
      });
      toast({
        title: "Publication submitted!",
        description: "Your publication has been submitted successfully.",
      });
      navigate("/scholar/publications");
    } catch (error) {
      console.error("Error submitting publication:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScholarLayout title="Submit Publication">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/scholar/publications")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Publications
        </Button>

        {/* Form Card */}
        <Card variant="feature">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Publication Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter the title of your publication"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PUBLICATION_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sub_category">Sub-Category</Label>
                <Input
                  id="sub_category"
                  placeholder="e.g., Jain Philosophy, Agam Studies"
                  value={formData.sub_category}
                  onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
                />
              </div>
            </div>

            {/* Abstract */}
            <div className="space-y-2">
              <Label htmlFor="abstract">Abstract *</Label>
              <Textarea
                id="abstract"
                placeholder="Provide a brief summary of your publication (200-500 words)"
                rows={4}
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                {formData.abstract.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Full Content</Label>
              <Textarea
                id="content"
                placeholder="Enter the full text of your publication or provide a summary"
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            {/* Keywords */}
            <div className="space-y-2">
              <Label>Keywords</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add keywords (press Enter)"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button type="button" variant="outline" onClick={handleAddKeyword}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="gap-1">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Cover Image URL */}
            <div className="space-y-2">
              <Label htmlFor="cover_image">Cover Image URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cover_image"
                    placeholder="https://example.com/image.jpg"
                    className="pl-10"
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  />
                </div>
              </div>
              {formData.cover_image && (
                <div className="mt-2">
                  <img
                    src={formData.cover_image}
                    alt="Cover preview"
                    className="w-32 h-44 object-cover rounded-lg border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* File Upload / URL Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Document (PDF/Word)</Label>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${!useFileUpload ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Paste URL
                  </span>
                  <Switch
                    checked={useFileUpload}
                    onCheckedChange={setUseFileUpload}
                  />
                  <span className={`text-sm ${useFileUpload ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Upload File
                  </span>
                </div>
              </div>

              {useFileUpload ? (
                <div className="space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
                  >
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <div className="text-left">
                          <p className="font-medium text-foreground">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <File className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF or Word document (max 50MB)
                        </p>
                      </>
                    )}
                  </div>
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading file...
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="file_url"
                      placeholder="https://example.com/document.pdf"
                      className="pl-10"
                      value={formData.file_url}
                      onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Provide a direct link to the full document
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save as Draft
              </Button>
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Submit for Publication
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card variant="feature">
          <CardHeader>
            <CardTitle className="text-lg">Submission Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Ensure your publication is original work and properly cites all references
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Provide a clear and concise abstract (200-500 words recommended)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Add relevant keywords to help others discover your work
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Include a link to the full document (PDF) if available
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Publications related to Jain studies, manuscripts, and philosophy are preferred
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ScholarLayout>
  );
};

export default ScholarPublicationSubmit;
