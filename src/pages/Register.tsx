import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfoSection } from "@/components/registration/PersonalInfoSection";
import { NextOfKinSection } from "@/components/registration/NextOfKinSection";
import { SpousesSection } from "@/components/registration/SpousesSection";
import { DependantsSection } from "@/components/registration/DependantsSection";
import { MembershipSection } from "@/components/registration/MembershipSection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function generateTempPassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const fullName = formData.get("fullName") as string;

    try {
      // Generate a temporary password
      const tempPassword = generateTempPassword();
      console.log('Attempting to create user and send welcome email');

      // Call the edge function to create user and send welcome email
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          email,
          tempPassword,
          fullName,
        },
      });

      if (error) {
        console.error('Error during registration:', error);
        throw error;
      }

      console.log('Registration successful:', data);

      toast({
        title: "Registration successful",
        description: "Please check your email for your temporary password to login.",
      });
      
      navigate("/login");
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-2xl text-center text-primary">
            PWA Burton On Trent Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-sm text-blue-700">
              Your personal information will be processed in accordance with our Privacy Policy and the GDPR.
              We collect this information to manage your membership and provide our services. Your data will be
              stored securely and will not be shared with third parties without your consent.
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-8 divide-y divide-gray-200">
              <PersonalInfoSection register={undefined} />
              <NextOfKinSection />
              <SpousesSection />
              <DependantsSection />
              <MembershipSection />
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Submit Registration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}