import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface ProtectedScholarRouteProps {
  children: ReactNode;
}

export function ProtectedScholarRoute({ children }: ProtectedScholarRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/scholar/login" replace />;
  }

  // Allow scholars, admins, and superadmins
  if (!hasRole(["scholar", "admin", "superadmin"])) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
