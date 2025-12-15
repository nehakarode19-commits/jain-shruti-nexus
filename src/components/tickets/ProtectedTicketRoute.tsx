import { ReactNode } from "react";

interface ProtectedTicketRouteProps {
  children: ReactNode;
}

// DEMO MODE: Allow direct access without authentication
export function ProtectedTicketRoute({ children }: ProtectedTicketRouteProps) {
  return <>{children}</>;
}
