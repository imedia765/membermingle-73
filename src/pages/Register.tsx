import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfoSection } from "@/components/registration/PersonalInfoSection";
import { NextOfKinSection } from "@/components/registration/NextOfKinSection";
import { SpousesSection } from "@/components/registration/SpousesSection";
import { DependantsSection } from "@/components/registration/DependantsSection";
import { MembershipSection } from "@/components/registration/MembershipSection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Registration submitted",
      description: "Your registration has been submitted successfully.",
    });
    navigate("/login");
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