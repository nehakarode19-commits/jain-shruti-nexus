import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ScholarLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const { login, signup, isAuthenticated, hasRole, user } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Wait for user data to be fully loaded before redirecting
    if (isAuthenticated && user && hasRole(["scholar", "admin", "superadmin"])) {
      navigate("/scholar/dashboard", { replace: true });
    }
  }, [isAuthenticated, hasRole, user, navigate]);

  const assignScholarRole = async (userId: string) => {
    // Check if user already has a role
    const { data: existingRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingRole) {
      // Update to scholar if not already admin/superadmin
      if (!["admin", "superadmin"].includes(existingRole.role)) {
        await supabase
          .from("user_roles")
          .update({ role: "scholar" })
          .eq("user_id", userId);
      }
    } else {
      // Insert scholar role
      await supabase.from("user_roles").insert({
        user_id: userId,
        role: "scholar",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const result = await signup(email, password, fullName);
        if (result.success) {
          toast({
            title: "Account created!",
            description: "Your scholar account has been created. You can now sign in.",
          });
          setIsSignUp(false);
        } else {
          toast({
            title: "Signup failed",
            description: result.error || "Please try again",
            variant: "destructive",
          });
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          toast({
            title: "Welcome to Scholar Portal!",
            description: "Successfully logged in",
          });
          // Redirect will happen via useEffect when user data is loaded
        } else {
          toast({
            title: "Login failed",
            description: result.error || "Invalid credentials",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    const demoEmail = "scholar@demo.com";
    const demoPassword = "scholar123";
    
    try {
      // Try to login first
      const loginResult = await login(demoEmail, demoPassword);
      
      if (loginResult.success) {
        // Get current user and ensure scholar role
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          await assignScholarRole(currentUser.id);
        }
        toast({ title: "Welcome!", description: "Logged in as Demo Scholar" });
        navigate("/scholar/dashboard", { replace: true });
      } else {
        // Account doesn't exist, create it
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email: demoEmail,
          password: demoPassword,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: "Demo Scholar" },
          },
        });
        
        if (signupError) {
          toast({
            title: "Error",
            description: signupError.message,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (signupData.user) {
          // Assign scholar role
          await assignScholarRole(signupData.user.id);
          
          // Create profile
          await supabase.from("profiles").upsert({
            user_id: signupData.user.id,
            email: demoEmail,
            full_name: "Demo Scholar",
          });
          
          // Try login again
          const retryLogin = await login(demoEmail, demoPassword);
          if (retryLogin.success) {
            toast({ title: "Demo account created!", description: "Welcome to Scholar Portal" });
            navigate("/scholar/dashboard", { replace: true });
          }
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login with demo account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="shadow-2xl border-border">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-orange" />
            </div>
            <CardTitle className="text-2xl font-heading text-primary">Scholar Portal</CardTitle>
            <CardDescription>
              {isSignUp 
                ? "Create your scholar account" 
                : "Sign in to access your research portal"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Dr. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="scholar@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </span>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp 
                  ? "Already have an account? Sign in" 
                  : "New scholar? Create an account"
                }
              </Button>
            </div>

            {/* Demo Login Section */}
            <div className="mt-4 p-4 bg-orange/5 border border-orange/20 rounded-xl">
              <p className="text-sm font-medium text-orange mb-2 text-center">Demo Scholar Login</p>
              <div className="space-y-1 text-xs text-muted-foreground mb-3">
                <p><span className="font-medium">Email:</span> scholar@demo.com</p>
                <p><span className="font-medium">Password:</span> scholar123</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full text-sm border-orange/30 text-orange hover:bg-orange/10"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Use Demo Login"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
