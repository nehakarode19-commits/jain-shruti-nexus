import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth, UserRole } from "@/contexts/AdminAuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedLMSRouteProps {
  children: ReactNode;
}

const LMS_ALLOWED_ROLES: UserRole[] = ["superadmin", "admin", "librarian"];

export function ProtectedLMSRoute({ children }: ProtectedLMSRouteProps) {
  // DEMO MODE: Allow direct access without authentication
  return <>{children}</>;
}
