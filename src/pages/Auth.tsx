import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, School, Loader2 } from "lucide-react";

type UserRole = "student" | "teacher";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name is too long"),
  nickname: z.string().min(2, "Nickname must be at least 2 characters").max(30, "Nickname is too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Auth() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [signupNickname, setSignupNickname] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = signInSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Please select if you are a Student or Teacher");
      return;
    }

    const validation = signUpSchema.safeParse({
      email: signupEmail,
      fullName: signupFullName,
      nickname: signupNickname,
      password: signupPassword,
    });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, signupFullName, signupNickname, selectedRole);
    setIsLoading(false);

    if (error) {
      if (error.message.includes("already registered")) {
        toast.error("An account with this email already exists");
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Account created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-slide-up">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <Card className="game-card border-2">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-fredoka text-foreground">
              {authMode === "login" ? "Welcome Back!" : "Join EduCross"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {authMode === "login" 
                ? "Sign in to continue your learning journey" 
                : "Create an account to start learning"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as "login" | "signup")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted">
                <TabsTrigger value="login" className="font-fredoka data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Log In
                </TabsTrigger>
                <TabsTrigger value="signup" className="font-fredoka data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-foreground">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-foreground">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 font-fredoka text-lg h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label className="text-foreground">I am a...</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={selectedRole === "student" ? "default" : "outline"}
                        className={`h-20 flex flex-col gap-2 ${
                          selectedRole === "student" 
                            ? "bg-gradient-secondary border-secondary" 
                            : "border-border hover:border-secondary"
                        }`}
                        onClick={() => setSelectedRole("student")}
                      >
                        <GraduationCap className="w-8 h-8" />
                        <span className="font-fredoka">Student</span>
                      </Button>
                      <Button
                        type="button"
                        variant={selectedRole === "teacher" ? "default" : "outline"}
                        className={`h-20 flex flex-col gap-2 ${
                          selectedRole === "teacher" 
                            ? "bg-gradient-primary border-primary" 
                            : "border-border hover:border-primary"
                        }`}
                        onClick={() => setSelectedRole("teacher")}
                      >
                        <School className="w-8 h-8" />
                        <span className="font-fredoka">Teacher</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-fullname" className="text-foreground">Full Name</Label>
                    <Input
                      id="signup-fullname"
                      type="text"
                      placeholder="John Doe"
                      value={signupFullName}
                      onChange={(e) => setSignupFullName(e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-nickname" className="text-foreground">Nickname</Label>
                    <Input
                      id="signup-nickname"
                      type="text"
                      placeholder="johnd"
                      value={signupNickname}
                      onChange={(e) => setSignupNickname(e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 font-fredoka text-lg h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}