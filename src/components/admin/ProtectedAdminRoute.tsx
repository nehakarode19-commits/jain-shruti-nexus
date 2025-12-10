import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth, UserRole } from "@/contexts/AdminAuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedAdminRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const ADMIN_ALLOWED_ROLES: UserRole[] = ["superadmin", "admin"];

export function ProtectedAdminRoute({ children, allowedRoles = ADMIN_ALLOWED_ROLES }: ProtectedAdminRouteProps) {
  const { isAuthenticated, isLoading, user, hasRole } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (!hasRole(allowedRoles)) {
    // Redirect to appropriate dashboard based on actual role
    if (user?.role === "librarian") {
      return <Navigate to="/lms/dashboard" replace />;
    } else if (user?.role === "scholar") {
      return <Navigate to="/research" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
