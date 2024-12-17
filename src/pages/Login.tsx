import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginTabs } from "@/components/auth/LoginTabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getMemberByMemberId } from "@/utils/memberAuth";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Email login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMemberIdSubmit = async (data: { memberId: string; password: string }) => {
    console.log("Member ID login attempt started");
    setIsLoading(true);
    
    try {
      console.log("Looking up member with ID:", data.memberId);
      const member = await getMemberByMemberId(data.memberId);

      if (!member || !member.email) {
        console.log("Member lookup result:", member);
        throw new Error("Member ID not found or no email associated");
      }

      // For development, we'll use the member number as the password
      const { error } = await supabase.auth.signInWithPassword({
        email: member.email,
        password: data.password,
      });

      if (error) throw error;

      navigate("/admin/dashboard");
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
    <div className="container max-w-lg mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginTabs 
            onEmailSubmit={handleEmailSubmit}
            onMemberIdSubmit={handleMemberIdSubmit}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}