import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Terms and Conditions
            </CardTitle>
            <p className="text-muted-foreground">Version 3 - April 2024</p>
            <p className="text-lg font-semibold">Pakistan Welfare Association</p>
            <p className="text-muted-foreground">Burton Upon Trent</p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-250px)] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Members Eligibility</h2>
                <p>Only Muslims can be members of Pakistan Welfare Association (PWA).</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">2. Membership Fee</h2>
                <p>Any new members must pay a membership fee plus the collection amount for that calendar year. Currently the membership fee is £150 as of January 2024. This may change with inflation and is reviewed periodically to reflect the costs incurred.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">3. Dependents Registration</h2>
                <p>All members will be given a membership number and will need to register their dependents so that the PWA Committee can gain an accurate picture of the actual number of people covered. Dependents include stepchildren and adopted children.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">4. Health Declaration</h2>
                <p>New members must be in good health, with no known terminal illnesses. Any long-term illnesses must be disclosed to the Committee for consideration during the membership process.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">5. Confidentiality</h2>
                <p>All data is confidentially stored under GDPR rules and will not be shared except for necessary processes when death occurs or for use within PWA.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">6-7. Payment Terms</h2>
                <p>Payments will need to be made within 28 days from collection date. After 21 days from collection a final reminder will be sent, thus allowing 7 days until the full 28 days required for collection.</p>
                <p className="mt-2">Any non-payment after this deadline is subject to a late payment fee of £30. Any further nonpayment will result in cancellation of membership and have to rejoin and must pay a new membership fee of £150. All costs are reviewed periodically to reflect inflation, changes will be communicated to members via their Collector Members or directly through a communication mechanism.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">8-11. Registration Requirements</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Every married man will need to ensure they are registered separately from their parents or guardian.</li>
                  <li>Every young male over the age of 18 must have membership in the association regardless of employment status, except for being in full time education until their 22nd birthday.</li>
                  <li>No membership charges will apply to migrating members up until their 23rd birthday, where a new membership charge is applicable.</li>
                  <li>As and when a member's child leaves full time education, they must also register as an individual member.</li>
                  <li>Any young person who is 22 years of age or over and attends university must still ensure they are registered as members.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">12-16. Special Cases</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unmarried females are not obliged to become members and will be covered under their parents' membership until marriage.</li>
                  <li>If a marriage separation occurs, both males and females must have separate memberships.</li>
                  <li>Separated or divorced individuals must apply as separate members.</li>
                  <li>Widowed ladies will be considered as the head of the family and must pay fees regularly.</li>
                  <li>Males with multiple wives must explicitly register all dependents.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">17-18. Assistance Offered</h2>
                <p>If a head member of family passes away, a £500 payment is offered to the widow or orphans under 18. If death occurs in Pakistan, £1,000 is offered. PWA will cover costs for both viable and non-viable foetus.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">19-21. Residency Requirements</h2>
                <p>Members living outside East Staffordshire Borough Council (ESBC) for work will still receive full benefits. Proof of ESBC residency is advisable. Legacy members (pre-2024) have different coverage terms compared to members who joined after 2024.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">22. Visitor Membership</h2>
                <p>Visitors can apply for temporary membership at a fixed rate of £50 plus last collection, which is non-refundable. Visitors must pay contributions and may need to become full members depending on their status.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">23-24. Repatriation Costs</h2>
                <p>Repatriation costs are limited to the average of the last 4 UK burials. The association is responsible for collection from any airport in England, with other costs being the family's responsibility.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">25. Financial Buffer</h2>
                <p>A buffer amount of £16,000 should be maintained in the bank account to cover immediate costs in case of unforeseen tragedies.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">26. Funeral Arrangements</h2>
                <p>PWA will only pay the sum of usual costs from their preferred funeral provider. Any extra arrangements are the family's responsibility.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">27. Committee Changes</h2>
                <p>Any changes to payments or rules must be voted in by the Committee and communicated to collector members and wider membership.</p>
              </section>

              <div className="mt-8 pt-4 border-t">
                <p className="text-center">By becoming a member of the Pakistan Welfare Association, you agree to abide by these terms and conditions outlined above.</p>
                <p className="text-center text-sm text-muted-foreground mt-4">© 2024 Pakistan Welfare Association. All rights reserved.</p>
              </div>
            </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
