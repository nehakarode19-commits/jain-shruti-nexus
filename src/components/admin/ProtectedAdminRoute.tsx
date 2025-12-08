import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth, UserRole } from "@/contexts/AdminAuthContext";

interface ProtectedAdminRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedAdminRoute({ children, allowedRoles }: ProtectedAdminRouteProps) {
  const { isAuthenticated, hasRole } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}
