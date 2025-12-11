import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedScholarRouteProps {
  children: ReactNode;
}

export function ProtectedScholarRoute({ children }: ProtectedScholarRouteProps) {
  const { isAuthenticated, isLoading, user } = useAdminAuth();
  const [isAssigningRole, setIsAssigningRole] = useState(false);

  // Auto-assign scholar role if user is authenticated but doesn't have scholar/admin role
  useEffect(() => {
    const assignScholarRole = async () => {
      if (isAuthenticated && user && user.role === "user") {
        setIsAssigningRole(true);
        try {
          // Update the user's role to scholar
          await supabase
            .from("user_roles")
            .update({ role: "scholar" })
            .eq("user_id", user.id);
          
          // Refresh the page to get updated role
          window.location.reload();
        } catch (error) {
          console.error("Failed to assign scholar role:", error);
        }
        setIsAssigningRole(false);
      }
    };

    assignScholarRole();
  }, [isAuthenticated, user]);

  if (isLoading || isAssigningRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Scholar Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/scholar/login" replace />;
  }

  // Allow all authenticated users - they get auto-upgraded to scholar role
  return <>{children}</>;
}
