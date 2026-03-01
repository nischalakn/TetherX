import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import { mockUsers } from "@/data/mockUsers";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("sarah.chen@sevasetu.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Find user by email
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // In a real app, verify password hash
      // For demo, accept any password with length > 5
      if (password.length < 6) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Login successful - call login with email and password
      const success = login(email, password);
      
      if (!success) {
        setError("Login failed. Please try again.");
        setIsLoading(false);
        return;
      }
      
      // Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "department_staff":
          navigate("/department-staff");
          break;
        case "patient":
          navigate("/patient");
          break;
        default:
          navigate("/admin");
      }
      
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <Activity className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">SevaSetu</h1>
          <p className="mt-1 text-sm text-muted-foreground">Inter-Department Workflow Automation</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="mb-1 text-lg font-semibold text-foreground">Welcome back</h2>
          <p className="mb-6 text-sm text-muted-foreground">Sign in to your account</p>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  placeholder="you@hospital.com"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        <div className="mt-6 space-y-2 text-center text-xs text-muted-foreground">
          <p className="font-medium">Demo Credentials:</p>
          <div className="space-y-1">
            <p>Admin: sarah.chen@sevasetu.com / admin123</p>
            <p>Dept Staff: james.wilson@sevasetu.com / staff123</p>
            <p>Patient: john.anderson@email.com / patient123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
