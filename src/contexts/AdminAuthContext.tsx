import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// DEMO ADMIN CREDENTIALS - For production, use Lovable Cloud
const ADMIN_CREDENTIALS = [
  { email: "admin@jambushruti.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "superadmin@jambushruti.com", password: "super123", role: "superadmin", name: "Super Admin" },
  { email: "librarian@jambushruti.com", password: "lib123", role: "librarian", name: "Librarian User" },
  { email: "scholar@jambushruti.com", password: "scholar123", role: "scholar", name: "Scholar User" },
];

export type UserRole = "user" | "scholar" | "librarian" | "admin" | "superadmin";

interface AdminUser {
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; redirectTo?: string; error?: string }>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("admin_auth");
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUser(parsed);
      } catch {
        localStorage.removeItem("admin_auth");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; redirectTo?: string; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const credential = ADMIN_CREDENTIALS.find(
      c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );

    if (!credential) {
      return { success: false, error: "Invalid email or password" };
    }

    const userData: AdminUser = {
      email: credential.email,
      name: credential.name,
      role: credential.role as UserRole,
    };

    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("admin_auth", JSON.stringify(userData));

    // Role-based redirection
    let redirectTo = "/admin/dashboard";
    switch (credential.role) {
      case "librarian":
        redirectTo = "/admin/lms";
        break;
      case "scholar":
        redirectTo = "/scholar/dashboard";
        break;
      case "user":
        redirectTo = "/profile";
        break;
    }

    return { success: true, redirectTo };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("admin_auth");
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    
    // Superadmin has all permissions
    if (user.role === "superadmin") return true;
    
    return roleArray.includes(user.role);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, logout, hasRole }}>
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
