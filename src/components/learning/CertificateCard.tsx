import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar, BookOpen } from "lucide-react";
import { format } from "date-fns";
import type { LMSCertificate } from "@/hooks/useLMSCertificates";

interface CertificateCardProps {
  certificate: LMSCertificate;
  courseName?: string;
  onDownload: (certificate: LMSCertificate) => void;
}

export function CertificateCard({ certificate, courseName, onDownload }: CertificateCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1">
              {courseName || "Course Completion Certificate"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Certificate #{certificate.certificate_number}
            </p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Issued: {certificate.issued_at ? format(new Date(certificate.issued_at), "MMM dd, yyyy") : "N/A"}</span>
          </div>
          {certificate.valid_until && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Valid until: {format(new Date(certificate.valid_until), "MMM dd, yyyy")}</span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => onDownload(certificate)}
          className="w-full gap-2"
          variant="default"
        >
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
      </CardContent>
    </Card>
  );
}
