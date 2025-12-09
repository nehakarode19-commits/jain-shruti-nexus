import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedLMSRouteProps {
  children: ReactNode;
}

export function ProtectedLMSRoute({ children }: ProtectedLMSRouteProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // DEMO MODE: Only check authentication, bypass role checks
  if (!isAuthenticated) {
    return <Navigate to="/lms" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
