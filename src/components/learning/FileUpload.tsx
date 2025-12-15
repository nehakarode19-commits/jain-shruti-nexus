import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, FileText, Video, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  label?: string;
  folder?: string;
  currentUrl?: string;
  maxSizeMB?: number;
}

export function FileUpload({
  onUploadComplete,
  accept = "*",
  label = "Upload File",
  folder = "files",
  currentUrl,
  maxSizeMB = 50,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState(currentUrl || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      toast.error(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setError("");
    setIsUploading(true);
    setProgress(10);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      setProgress(30);

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("lms-content")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      setProgress(80);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("lms-content")
        .getPublicUrl(data.path);

      const publicUrl = urlData.publicUrl;
      setUploadedUrl(publicUrl);
      onUploadComplete(publicUrl);
      setProgress(100);
      toast.success("File uploaded successfully");
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed");
      toast.error("Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setUploadedUrl("");
    onUploadComplete("");
    setProgress(0);
  };

  const getFileIcon = () => {
    if (accept.includes("video")) {
      return <Video className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const getFileName = (url: string) => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1].substring(0, 30) + "...";
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {uploadedUrl ? (
        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-800 dark:text-green-200 truncate">
              {getFileName(uploadedUrl)}
            </p>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-600 hover:underline"
            >
              View file
            </a>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isUploading
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center gap-2">
              {getFileIcon()}
              <p className="text-sm text-muted-foreground">
                {isUploading ? "Uploading..." : "Click or drag to upload"}
              </p>
              <p className="text-xs text-muted-foreground">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          </div>

          {isUploading && (
            <Progress value={progress} className="h-2" />
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>
      )}

      {/* Manual URL input as fallback */}
      <div className="pt-2">
        <Label className="text-xs text-muted-foreground">Or paste URL directly:</Label>
        <Input
          value={uploadedUrl}
          onChange={(e) => {
            setUploadedUrl(e.target.value);
            onUploadComplete(e.target.value);
          }}
          placeholder="https://..."
          className="mt-1"
        />
      </div>
    </div>
  );
}