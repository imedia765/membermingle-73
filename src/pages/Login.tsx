import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { LoginTabs } from "@/components/auth/LoginTabs";
import { useAuthStateHandler } from "@/components/auth/AuthStateHandler";
import { useLoginHandlers } from "@/components/auth/LoginHandlers";
import { getMemberByMemberId, verifyMemberPassword } from "@/utils/memberAuth";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Set up auth state handling
  useAuthStateHandler(setIsLoggedIn);

  // Get login handlers
  const { handleEmailSubmit, handleGoogleLogin } = useLoginHandlers(setIsLoggedIn);

  const handleMemberIdSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Member ID login attempt started");

    try {
      const formData = new FormData(e.currentTarget);
      const memberId = (formData.get("memberId") as string).trim().toUpperCase();
      const password = formData.get("memberPassword") as string;

      console.log("Looking up member with ID:", memberId);
      const member = await getMemberByMemberId(memberId);
      console.log("Member lookup result:", { member });

      if (!member || !member.email) {
        throw new Error("Member ID not found");
      }

      const isPasswordValid = await verifyMemberPassword(password, member.default_password_hash);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      console.log("Attempting login with member's email");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: member.email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error("Member ID login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid member ID or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoggedIn ? (
            <Button onClick={() => supabase.auth.signOut()} className="w-full">
              Logout
            </Button>
          ) : (
            <>
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

              <LoginTabs 
                onEmailSubmit={handleEmailSubmit}
                onMemberIdSubmit={handleMemberIdSubmit}
              />

              <div className="text-center text-sm mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}