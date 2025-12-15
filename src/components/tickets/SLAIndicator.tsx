import { cn } from "@/lib/utils";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface SLAIndicatorProps {
  deadline: string | null;
  status: string;
  className?: string;
}

export function SLAIndicator({ deadline, status, className }: SLAIndicatorProps) {
  if (!deadline || ["resolved", "closed"].includes(status)) {
    return (
      <div className={cn("flex items-center gap-1 text-green-600", className)}>
        <CheckCircle className="h-4 w-4" />
        <span className="text-xs font-medium">Completed</span>
      </div>
    );
  }

  const now = new Date();
  const slaDeadline = new Date(deadline);
  const hoursRemaining = (slaDeadline.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursRemaining < 0) {
    // Breached
    return (
      <div className={cn("flex items-center gap-1 text-red-600", className)}>
        <AlertTriangle className="h-4 w-4" />
        <span className="text-xs font-medium">SLA Breached</span>
      </div>
    );
  } else if (hoursRemaining < 4) {
    // Near breach (yellow)
    return (
      <div className={cn("flex items-center gap-1 text-yellow-600", className)}>
        <Clock className="h-4 w-4" />
        <span className="text-xs font-medium">{Math.ceil(hoursRemaining)}h remaining</span>
      </div>
    );
  } else {
    // On track (green)
    return (
      <div className={cn("flex items-center gap-1 text-green-600", className)}>
        <Clock className="h-4 w-4" />
        <span className="text-xs font-medium">{Math.ceil(hoursRemaining)}h remaining</span>
      </div>
    );
  }
}
