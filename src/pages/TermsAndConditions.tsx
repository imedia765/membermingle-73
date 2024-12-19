import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="container py-8 space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <h1>Terms and Conditions</h1>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Membership Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3>1. Eligibility</h3>
            <p>
              Membership is open to all individuals who meet the following criteria:
            </p>
            <ul className="list-disc list-inside">
              <li>Must be a resident of Burton upon Trent or surrounding areas</li>
              <li>Must be of Pakistani origin or heritage</li>
              <li>Must be willing to comply with all association rules and regulations</li>
            </ul>
          </div>

          <div>
            <h3>2. Membership Fees</h3>
            <p>
              Members are required to pay their fees promptly and maintain their accounts
              in good standing. Failure to do so may result in suspension of benefits.
            </p>
          </div>

          <div>
            <h3>3. Member Responsibilities</h3>
            <p>
              All members are expected to:
            </p>
            <ul className="list-disc list-inside">
              <li>Keep their contact information up to date</li>
              <li>Promptly notify the association of any changes in circumstances</li>
              <li>Participate in community activities when possible</li>
              <li>Maintain respectful communication with other members</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsAndConditions;