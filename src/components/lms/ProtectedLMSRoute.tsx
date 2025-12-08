import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useDemoAuth } from "@/contexts/DemoAuthContext";

interface ProtectedLMSRouteProps {
  children: ReactNode;
}

export function ProtectedLMSRoute({ children }: ProtectedLMSRouteProps) {
  const { isAuthenticated } = useDemoAuth();

  if (!isAuthenticated) {
    return <Navigate to="/lms" replace />;
  }

  return <>{children}</>;
}
