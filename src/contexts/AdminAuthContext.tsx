import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// DEMO ADMIN CREDENTIALS - For production, use Lovable Cloud
const ADMIN_CREDENTIALS = [
  { email: "superadmin@jambushrusti.com", password: "super123", role: "superadmin", name: "Super Admin" },
  { email: "admin@jambushrusti.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "scholar@jambushrusti.com", password: "scholar123", role: "scholar", name: "Scholar User" },
  { email: "librarian@jambushrusti.com", password: "lib123", role: "librarian", name: "Librarian User" },
  { email: "user@jambushrusti.com", password: "user123", role: "user", name: "Registered User" },
  { email: "public@jambushrusti.com", password: "public123", role: "public", name: "Public Visitor" },
];

export type UserRole = "public" | "user" | "scholar" | "librarian" | "admin" | "superadmin";

export const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  scholar: "Scholar",
  librarian: "Librarian",
  user: "Registered User",
  public: "Public Visitor",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  superadmin: "Full system access, manage admins & settings",
  admin: "CMS control, content management, approvals",
  scholar: "Research portal, submissions, access requests",
  librarian: "Library management system access",
  user: "Public site + bookmarks & profile",
  public: "Public website access only",
};

interface AdminUser {
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string, selectedRole?: UserRole) => Promise<{ success: boolean; redirectTo?: string; error?: string }>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  availableRoles: UserRole[];
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AVAILABLE_ROLES: UserRole[] = ["superadmin", "admin", "scholar", "librarian", "user", "public"];

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

  const login = async (email: string, password: string, selectedRole?: UserRole): Promise<{ success: boolean; redirectTo?: string; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // For demo mode with role selection
    if (selectedRole) {
      const credential = ADMIN_CREDENTIALS.find(c => c.role === selectedRole);
      if (credential) {
        const userData: AdminUser = {
          email: credential.email,
          name: credential.name,
          role: credential.role as UserRole,
        };

        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem("admin_auth", JSON.stringify(userData));

        return { success: true, redirectTo: getRedirectPath(credential.role as UserRole) };
      }
    }

    // Standard email/password login
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

    return { success: true, redirectTo: getRedirectPath(credential.role as UserRole) };
  };

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
      case "public":
        return "/";
      default:
        return "/";
    }
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
    
    // Admin has access to admin, librarian, scholar, user, public
    if (user.role === "admin" && roleArray.some(r => ["admin", "librarian", "scholar", "user", "public"].includes(r))) {
      return true;
    }
    
    return roleArray.includes(user.role);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, logout, hasRole, availableRoles: AVAILABLE_ROLES }}>
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
