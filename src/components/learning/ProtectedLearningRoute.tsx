import { ReactNode } from "react";

interface ProtectedLearningRouteProps {
  children: ReactNode;
}

// DEMO MODE: Allow direct access without authentication
// This matches the behavior of other role-based dashboards
export function ProtectedLearningRoute({ children }: ProtectedLearningRouteProps) {
  return <>{children}</>;
}
