import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GoogleMapProps {
  className?: string;
  height?: string;
  showCard?: boolean;
}

export function GoogleMap({ className = "", height = "400px", showCard = true }: GoogleMapProps) {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.2!2d72.6!3d23.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA2JzAwLjAiTiA3MsKwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin";
  const directionsUrl = "https://maps.app.goo.gl/mk3KCxWMSVLmXYiC6";

  const mapContent = (
    <div className="relative overflow-hidden rounded-xl" style={{ height }}>
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Muni Jambuvijayji Gyan Mandir Location"
        className="rounded-xl"
      />
      
      {/* Overlay with button */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border/50 max-w-xs">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-heading font-semibold text-foreground text-sm">
                Muni Jambuvijayji Gyan Mandir
              </p>
              <p className="text-xs text-muted-foreground">
                Near Adani Shantigram Jain Temple, Ahmedabad
              </p>
            </div>
          </div>
        </div>
        
        <Button
          variant="hero"
          size="sm"
          className="shadow-lg"
          onClick={() => window.open(directionsUrl, "_blank")}
        >
          <MapPin className="h-4 w-4 mr-1" />
          Get Directions
        </Button>
      </div>
    </div>
  );

  if (!showCard) {
    return <div className={className}>{mapContent}</div>;
  }

  return (
    <Card className={`border-border/50 overflow-hidden ${className}`}>
      <CardContent className="p-0">
        {mapContent}
      </CardContent>
    </Card>
  );
}
