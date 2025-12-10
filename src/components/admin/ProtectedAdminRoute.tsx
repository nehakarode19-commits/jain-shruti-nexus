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
  // DEMO MODE: Allow direct access without authentication
  return <>{children}</>;
}
