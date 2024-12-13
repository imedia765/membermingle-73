import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/admin");
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/admin");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`,
          skipBrowserRedirect: true, // This prevents automatic redirect
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during Google login",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full mb-6 h-12 text-lg bg-white hover:bg-gray-50 border-2 shadow-sm text-gray-700 font-medium" 
            onClick={handleGoogleLogin}
          >
            <Icons.google className="mr-2 h-5 w-5 [&>path]:fill-[#4285F4]" />
            Continue with Google
          </Button>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="memberId">Member ID</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login with Email
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="memberId">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="memberId"
                    name="memberId"
                    type="text"
                    placeholder="Member ID"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="memberPassword"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login with Member ID
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}