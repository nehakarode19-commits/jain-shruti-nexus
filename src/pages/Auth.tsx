import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useAdminAuth, UserRole, ROLE_LABELS, ROLE_DESCRIPTIONS, AVAILABLE_ROLES } from "@/contexts/AdminAuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Scroll, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Eye,
  EyeOff,
  UserCircle,
  Loader2
} from "lucide-react";

const ROLE_ICONS: Record<UserRole, string> = {
  superadmin: "👑",
  admin: "🛡️",
  scholar: "📚",
  librarian: "📖",
  user: "👤",
  public: "🌐",
};

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<"role" | "credentials" | "register">("role");

  // Role selection state
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getRedirectPath(user.role);
      navigate(redirectPath);
    }
  }, [isAuthenticated, user, navigate]);

  const getRedirectPath = (role: UserRole): string => {
    switch (role) {
      case "superadmin":
      case "admin":
        return "/admin/dashboard";
      case "librarian":
        return "/lms/dashboard";
      case "scholar":
        return "/research";
      default:
        return "/";
    }
  };

  const handleRoleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: "Select a role",
        description: "Please select a role to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await login("", "", selectedRole);
      
      if (result.success) {
        toast({
          title: "Welcome!",
          description: `Logged in as ${ROLE_LABELS[selectedRole]}`,
        });
        navigate(result.redirectTo || "/", { replace: true });
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(loginEmail, loginPassword);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
      navigate(result.redirectTo || "/", { replace: true });
    } else {
      toast({
        title: "Invalid Credentials",
        description: result.error || "Please check your email and password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Demo registration - auto login with provided credentials
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store demo user
    const userData = { email: registerEmail, role: "user", name: registerName };
    localStorage.setItem("admin_auth", JSON.stringify(userData));
    
    toast({
      title: "Account Created!",
      description: `Welcome ${registerName}! You are now logged in.`,
    });
    
    // Force page reload to update auth state
    window.location.href = "/";
  };

  return (
    <Layout>
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern min-h-[calc(100vh-200px)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8 animate-fade-up">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-glow">
                  <Scroll className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">
                  Jambu-Shruti
                </span>
              </Link>
            </div>

            <Card variant="elevated" className="animate-fade-up delay-100">
              <Tabs value={loginMode} onValueChange={(v) => setLoginMode(v as "role" | "credentials" | "register")}>
                <CardHeader className="pb-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="role" className="text-xs sm:text-sm">
                      <UserCircle className="h-4 w-4 mr-1 hidden sm:inline" />
                      Role
                    </TabsTrigger>
                    <TabsTrigger value="credentials" className="text-xs sm:text-sm">
                      <Lock className="h-4 w-4 mr-1 hidden sm:inline" />
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="register" className="text-xs sm:text-sm">
                      <User className="h-4 w-4 mr-1 hidden sm:inline" />
                      Register
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent>
                  {/* Role Selection Tab */}
                  <TabsContent value="role" className="mt-0">
                    <form onSubmit={handleRoleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Select Your Role
                        </Label>
                        <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
                          <SelectTrigger className="h-12 rounded-xl border-border focus:border-primary bg-background">
                            <SelectValue placeholder="Choose a role to login..." />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50">
                            {AVAILABLE_ROLES.map((role) => (
                              <SelectItem key={role} value={role} className="py-3 cursor-pointer focus:bg-muted">
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">{ROLE_ICONS[role]}</span>
                                  <div className="text-left">
                                    <div className="font-medium text-foreground">{ROLE_LABELS[role]}</div>
                                    <div className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[role]}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedRole && (
                        <div className="p-4 bg-muted/50 rounded-xl border border-border/50 animate-in fade-in-50 duration-200">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{ROLE_ICONS[selectedRole]}</span>
                            <div>
                              <h4 className="font-semibold text-foreground">{ROLE_LABELS[selectedRole]}</h4>
                              <p className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[selectedRole]}</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <p className="text-xs text-muted-foreground">
                              <strong>Access includes:</strong>{" "}
                              {selectedRole === "superadmin" && "All admin modules, user management, system settings"}
                              {selectedRole === "admin" && "CMS, content management, approvals, user management"}
                              {selectedRole === "scholar" && "Research portal, manuscript access requests, submissions"}
                              {selectedRole === "librarian" && "LMS dashboard, book management, member management"}
                              {selectedRole === "user" && "Public site, personal bookmarks, profile settings"}
                              {selectedRole === "public" && "Public website, research tools (read-only)"}
                            </p>
                          </div>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        variant="hero" 
                        className="w-full"
                        disabled={isLoading || !selectedRole}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          <>Continue as {selectedRole ? ROLE_LABELS[selectedRole] : "..."}</>
                        )}
                        {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Credentials Login Tab */}
                  <TabsContent value="credentials" className="mt-0">
                    <form onSubmit={handleCredentialsLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            required
                            className="pl-10"
                            placeholder="admin@jambushruti.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="pl-10 pr-10"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" />
                          <label
                            htmlFor="remember"
                            className="text-sm text-muted-foreground cursor-pointer"
                          >
                            Remember me
                          </label>
                        </div>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Button 
                        type="submit" 
                        variant="hero" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">Demo Credentials:</p>
                      <div className="grid gap-1 text-[10px]">
                        <div className="flex justify-between"><span>👑 Super Admin:</span><code>superadmin@jambushruti.com / super123</code></div>
                        <div className="flex justify-between"><span>🛡️ Admin:</span><code>admin@jambushruti.com / admin123</code></div>
                        <div className="flex justify-between"><span>📚 Scholar:</span><code>scholar@jambushruti.com / scholar123</code></div>
                        <div className="flex justify-between"><span>📖 Librarian:</span><code>librarian@jambushruti.com / lib123</code></div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Register Tab */}
                  <TabsContent value="register" className="mt-0">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-name"
                            required
                            className="pl-10"
                            placeholder="Your full name"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-email"
                            type="email"
                            required
                            className="pl-10"
                            placeholder="your@email.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="pl-10 pr-10"
                            placeholder="••••••••"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirm-password"
                            type="password"
                            required
                            className="pl-10"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-muted-foreground cursor-pointer leading-tight"
                        >
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      <Button 
                        type="submit" 
                        variant="hero" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-up delay-200">
              By continuing, you acknowledge our commitment to preserving 
              and sharing Jain knowledge responsibly.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
