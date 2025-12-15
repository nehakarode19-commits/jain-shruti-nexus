import { QrCode, MessageSquare, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeedbackQRCodeProps {
  compact?: boolean;
  className?: string;
}

export function FeedbackQRCode({ compact = false, className = "" }: FeedbackQRCodeProps) {
  // Generate QR code URL - this links to the feedback form
  const feedbackUrl = `${window.location.origin}/feedback`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(feedbackUrl)}&bgcolor=FAF7F2&color=2D2A26`;

  if (compact) {
    return (
      <div className={`flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 ${className}`}>
        <img
          src={qrCodeUrl}
          alt="Scan to give feedback"
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <p className="font-heading font-semibold text-foreground text-sm">Share Your Feedback</p>
          <p className="text-xs text-muted-foreground">Scan QR code with your phone</p>
        </div>
      </div>
    );
  }

  return (
    <Card className={`border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden ${className}`}>
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
          Visitor Feedback
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Scan this QR code to share your experience and help us improve
        </p>

        <div className="relative inline-block">
          <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl blur-sm" />
          <img
            src={qrCodeUrl}
            alt="Scan to give feedback"
            className="relative w-40 h-40 mx-auto rounded-xl border-4 border-background shadow-lg"
          />
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
          <Smartphone className="h-4 w-4" />
          <span>Scan with your mobile camera</span>
        </div>
      </CardContent>
    </Card>
  );
}
