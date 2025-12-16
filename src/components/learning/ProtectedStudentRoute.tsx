import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedStudentRouteProps {
  children: ReactNode;
}

// Check if demo mode is active
export const isDemoMode = () => {
  return sessionStorage.getItem("learning_demo_mode") === "true";
};

// Set demo mode
export const setDemoMode = (value: boolean) => {
  if (value) {
    sessionStorage.setItem("learning_demo_mode", "true");
  } else {
    sessionStorage.removeItem("learning_demo_mode");
  }
};

export function ProtectedStudentRoute({ children }: ProtectedStudentRouteProps) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();
  const [demoActive, setDemoActive] = useState(isDemoMode());

  useEffect(() => {
    setDemoActive(isDemoMode());
  }, [location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Allow access if authenticated OR in demo mode
  if (!isAuthenticated && !demoActive) {
    return <Navigate to="/learning/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
