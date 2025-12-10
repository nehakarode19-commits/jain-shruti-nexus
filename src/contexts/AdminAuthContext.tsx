import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export type UserRole = "superadmin" | "admin" | "librarian" | "scholar" | "user";

export const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  scholar: "Scholar",
  librarian: "Librarian",
  user: "Registered User",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  superadmin: "Full system access, manage admins & settings",
  admin: "CMS control, content management, approvals",
  scholar: "Research portal, submissions, access requests",
  librarian: "Library management system access",
  user: "Public site + bookmarks & profile",
};

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ success: boolean; redirectTo?: string; error?: string }>;
  signup: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  availableRoles: UserRole[];
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AVAILABLE_ROLES: UserRole[] = ["superadmin", "admin", "scholar", "librarian", "user"];

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const fetchUserRole = async (userId: string): Promise<UserRole> => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();
    
    if (error || !data) {
      return "user";
    }
    return data.role as UserRole;
  };

  const fetchUserProfile = async (userId: string, email: string): Promise<AdminUser> => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    
    const role = await fetchUserRole(userId);
    
    return {
      id: userId,
      email: email,
      name: profile?.full_name || email.split("@")[0],
      role,
      avatar: profile?.avatar_url,
    };
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          setIsAuthenticated(true);
          // Defer fetching profile to avoid deadlock
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id, currentSession.user.email || "").then(setUser);
          }, 0);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      if (existingSession?.user) {
        setIsAuthenticated(true);
        fetchUserProfile(existingSession.user.id, existingSession.user.email || "").then(setUser);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getRedirectPath = (role: UserRole): string => {
    switch (role) {
      case "superadmin":
      case "admin":
        return "/admin/dashboard";
      case "librarian":
        return "/lms/dashboard";
      case "scholar":
        return "/research";
      case "user":
        return "/";
      default:
        return "/";
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; redirectTo?: string; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const userProfile = await fetchUserProfile(data.user.id, data.user.email || "");
        console.log("Login - User profile fetched:", userProfile);
        console.log("Login - User role:", userProfile.role);
        const redirectPath = getRedirectPath(userProfile.role);
        console.log("Login - Redirect path:", redirectPath);
        setUser(userProfile);
        setIsAuthenticated(true);
        return { success: true, redirectTo: redirectPath };
      }

      return { success: false, error: "Login failed" };
    } catch (error: any) {
      return { success: false, error: error.message || "An error occurred" };
    }
  };

  const signup = async (email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Assign default user role
        await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: "user",
        });
        
        return { success: true };
      }

      return { success: false, error: "Signup failed" };
    } catch (error: any) {
      return { success: false, error: error.message || "An error occurred" };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  return (
    <AdminAuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading,
      user, 
      session,
      login, 
      signup,
      logout, 
      hasRole, 
      availableRoles: AVAILABLE_ROLES 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
