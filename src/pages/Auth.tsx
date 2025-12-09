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
import { useAdminAuth, UserRole, ROLE_LABELS, ROLE_DESCRIPTIONS } from "@/contexts/AdminAuthContext";
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
  Loader2,
  Crown,
  Shield,
  GraduationCap,
  BookOpen,
  UserCheck,
  Globe
} from "lucide-react";

// Extended roles for display (includes Public Visitor which isn't a DB role)
type DisplayRole = UserRole | "visitor";

const DISPLAY_ROLES: { value: DisplayRole; label: string; description: string; icon: React.ReactNode }[] = [
  { value: "superadmin", label: "Super Admin", description: "Full system access, manage admins & settings", icon: <Crown className="h-4 w-4 text-amber-500" /> },
  { value: "admin", label: "Admin", description: "CMS control, content management, approvals", icon: <Shield className="h-4 w-4 text-red-500" /> },
  { value: "scholar", label: "Scholar", description: "Research portal, submissions, access requests", icon: <GraduationCap className="h-4 w-4 text-blue-500" /> },
  { value: "librarian", label: "Librarian", description: "Library management system access", icon: <BookOpen className="h-4 w-4 text-gray-600" /> },
  { value: "user", label: "Registered User", description: "Public site + bookmarks & profile", icon: <UserCheck className="h-4 w-4 text-gray-500" /> },
  { value: "visitor", label: "Public Visitor", description: "Public website access only", icon: <Globe className="h-4 w-4 text-green-500" /> },
];

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, isLoading: authLoading, user } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"role" | "login" | "register">("role");
  const [selectedRole, setSelectedRole] = useState<DisplayRole | "">("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // DEMO MODE: Redirect based on selected role (no DB role check)
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      // Use selected role for redirect, default to home
      const redirectPath = getRedirectPath(selectedRole as UserRole);
      navigate(redirectPath);
    }
  }, [isAuthenticated, authLoading, navigate, selectedRole]);

  const getRedirectPath = (role: UserRole | DisplayRole | ""): string => {
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

  const handleRoleSelect = (role: DisplayRole) => {
    setSelectedRole(role);
    if (role === "visitor") {
      // Public visitor - just go to home
      navigate("/");
    } else {
      // Move to login tab for other roles
      setActiveTab("login");
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing credentials",
        description: "Please enter your email and password",
        variant: "destructive",
      });
      return;
    }

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
    
    if (!registerName || !registerEmail || !registerPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (registerPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
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
    
    const result = await signup(registerEmail, registerPassword, registerName);
    
    if (result.success) {
      toast({
        title: "Account Created!",
        description: "You can now log in with your credentials.",
      });
      setActiveTab("login");
      setLoginEmail(registerEmail);
      setRegisterPassword("");
      setConfirmPassword("");
    } else {
      toast({
        title: "Registration Failed",
        description: result.error || "Could not create account. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern min-h-[calc(100vh-200px)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-glow">
                  <Scroll className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-display text-2xl font-bold text-foreground">
                  Jambushrusti
                </span>
              </Link>
            </div>

            <Card variant="elevated" className="">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "role" | "login" | "register")}>
                <CardHeader className="pb-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="role" className="text-xs sm:text-sm">
                      <Globe className="h-4 w-4 mr-1 hidden sm:inline" />
                      Role
                    </TabsTrigger>
                    <TabsTrigger value="login" className="text-xs sm:text-sm">
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
                    <div className="space-y-4">
                      <Label>Select Your Role</Label>
                      <Select value={selectedRole} onValueChange={(value) => handleRoleSelect(value as DisplayRole)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a role to login..." />
                        </SelectTrigger>
                        <SelectContent>
                          {DISPLAY_ROLES.map((role) => (
                            <SelectItem key={role.value} value={role.value} className="py-3">
                              <div className="flex items-start gap-3">
                                {role.icon}
                                <div>
                                  <div className="font-medium">{role.label}</div>
                                  <div className="text-xs text-muted-foreground">{role.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Select your role to proceed to the appropriate login or access the public website.
                      </p>
                    </div>
                  </TabsContent>

                  {/* Credentials Login Tab */}
                  <TabsContent value="login" className="mt-0">
                    <form onSubmit={handleCredentialsLogin} className="space-y-4">
                      {selectedRole && selectedRole !== "visitor" && (
                        <div className="p-3 bg-muted rounded-lg mb-4">
                          <p className="text-sm text-muted-foreground">
                            Logging in as: <span className="font-medium text-foreground">{DISPLAY_ROLES.find(r => r.value === selectedRole)?.label}</span>
                          </p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            required
                            className="pl-10"
                            placeholder="your@email.com"
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
                      </div>
                      <Button 
                        type="submit" 
                        variant="hero" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
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
                            placeholder="Min. 6 characters"
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
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms
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
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            <p className="text-center mt-6 text-muted-foreground text-sm">
              Admin access?{" "}
              <Link to="/admin" className="text-primary hover:underline font-medium">
                Go to Admin Portal
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
