import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// DEMO ONLY - For production, use proper authentication with Lovable Cloud
const DEMO_CREDENTIALS = {
  email: "admin@jambushrusti.com",
  password: "demo123"
};

interface DemoAuthContextType {
  isAuthenticated: boolean;
  user: { email: string; role: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    // Check if user was previously logged in (demo only)
    const savedAuth = localStorage.getItem("demo_auth");
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(parsed);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo validation - NOT FOR PRODUCTION
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const userData = { email, role: "librarian" };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem("demo_auth", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("demo_auth");
  };

  return (
    <DemoAuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error("useDemoAuth must be used within a DemoAuthProvider");
  }
  return context;
}
