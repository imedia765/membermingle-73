import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const MedicalExaminerProcess = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Medical Examiner Process</h1>
          <p className="text-muted-foreground mb-6">
            This page provides detailed information about our Medical Examiner Death Certification process,
            including the flow chart, supporting documentation, and cemetery fees.
          </p>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Cemetery Fees and Charges</h2>
          <p className="text-muted-foreground mb-4">
            Fees, payments and sums are fixed under section 15 (1) of the Local Authorities
            Cemeteries Orders 1977 – to take effect from the 1st April 2024
          </p>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3">Graves for which NO Exclusive Right of Burial has been granted</h3>
              <div className="space-y-2">
                <p>For the burial of the body of:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A child in the Forget Me Not Garden <span className="font-semibold">No charge</span></li>
                  <li>A stillborn child or child whose age at the time of death did not exceed 16 years (in an unpurchased grave) <span className="font-semibold">No charge</span></li>
                  <li>Child from outside of East Staffordshire <span className="font-semibold">£48.00</span></li>
                  <li>A person whose age at the time of death exceeded 16 years <span className="font-semibold">£792.00</span></li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Graves for which an EXCLUSIVE RIGHT OF BURIAL has been granted</h3>
              <div className="space-y-2">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Purchase of Exclusive Right of Burial <span className="font-semibold">£1,245.00</span></li>
                  <li>Purchase of Exclusive Right of Burial for cremated remains <span className="font-semibold">£433.00</span></li>
                </ul>
                
                <p className="mt-4">Plus for the burial of:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A stillborn child or a child whose age at the time of death did not exceed 16 years <span className="font-semibold">No charge</span></li>
                  <li>Child from outside of East Staffordshire <span className="font-semibold">£48.00</span></li>
                  <li>A person whose age at the time of death exceeded 16 years <span className="font-semibold">£792.00</span></li>
                  <li>Additional cost for bricked grave <span className="font-semibold">£219.00</span></li>
                  <li>Burial of cremated remains <span className="font-semibold">£219.00</span></li>
                  <li>Admin charge for multiple interments <span className="font-semibold">£54.00</span></li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Miscellaneous</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Transfer of ownership of Exclusive Right of Burial <span className="font-semibold">£57.00</span></li>
                <li>Slabbing or sealing a grave <span className="font-semibold">£168.00</span></li>
                <li>Preparation for the exhumation of a body (administration costs) <span className="font-semibold">£1,265.00</span></li>
                <li>Fees for searches of Registers including copy of entry <span className="font-semibold">£26.00</span></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Monuments, Gravestones, Tablets & Monumental Inscriptions</h3>
              <p className="font-semibold mb-2">PERMIT CHARGES</p>
              <p className="mb-2">For the right to place on a grave for which the Exclusive Right of Burial has been granted:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A gravestone, cross, book or scroll not to exceed: 1,350mm in height, 914mm in width, 460mm front to back <span className="font-semibold">£378.00</span></li>
                <li>The sizes for the cremated remains section not to exceed: 610mm in height, 610mm in width, 460mm front to back <span className="font-semibold">£378.00</span></li>
                <li>A vase (unless incorporated in a memorial) <span className="font-semibold">£94.00</span></li>
                <li>For each inscription after the first <span className="font-semibold">£122.00</span></li>
                <li>The Forget-Me-Not Memorial <span className="font-semibold">£60.00</span></li>
                <li>The Forget-Me-Not Vase <span className="font-semibold">£48.00</span></li>
                <li>The Forget Me Not Plaque: double (incl. VAT) <span className="font-semibold">£227.00</span></li>
                <li>Kerb memorial <span className="font-semibold">£889.00</span></li>
                <li>Full kerbset (kerbs & headstone) <span className="font-semibold">£1,267.00</span></li>
                <li>Memorial replacement fee <span className="font-semibold">£120.00</span></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Out of Hours Burial</h3>
              <p className="mb-4">Out of hours burial (Monday to Friday only 4-7pm) may take place by special arrangement subject to availability of staff and safe lighting conditions.</p>
              <p className="font-semibold mb-4">£180.00 per hour (50% reduction if less than 30 minutes)</p>
              <p className="text-muted-foreground">Fees are in addition to Exclusive Right of Burial, Interment and Chapel fees</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Burial Times</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Month</th>
                      <th className="text-left py-2 px-4">Latest burial start time</th>
                      <th className="text-left py-2 px-4">Burial conclusion time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["January", "2.30pm", "3.30pm"],
                      ["February", "3.30pm", "4.30pm"],
                      ["March", "4.00pm", "5.00pm"],
                      ["April-August", "5.45pm", "6.45pm"],
                      ["September", "5.30pm", "6.30pm"],
                      ["October", "4.00pm", "5.00pm"],
                      ["November", "2.45pm", "3.45pm"],
                      ["December", "2.30pm", "3.30pm"]
                    ].map(([month, start, end]) => (
                      <tr key={month} className="border-b">
                        <td className="py-2 px-4">{month}</td>
                        <td className="py-2 px-4">{start}</td>
                        <td className="py-2 px-4">{end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Standing Regulations</h3>
              <div className="space-y-4">
                <p>
                  The fees set out above apply only to those residing in the Borough of East Staffordshire
                  at the time of death. The normal requirement for residency is that the deceased lived within
                  the Borough for the twelve months prior to death.
                </p>
                <p>
                  For non-residents the interment fee and, where applicable, the Exclusive Right of Burial fee
                  is trebled. Non-residents are only exempt the trebling of these fees if either of the following
                  criteria apply:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>The deceased had previously lived within the Borough within the last 20 years for
                    a period exceeding 5 years</li>
                  <li>The deceased was a former resident within the Borough within the last 20 years
                    for a period exceeding 5 years but moved outside the Borough to a rest/nursing
                    home.</li>
                </ol>
              </div>
            </section>
          </div>
        </Card>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Process Flow Chart</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              View or download our comprehensive Medical Examiner Process Flow Chart:
            </p>
            <object
              data="/Flowchart-ME-Process-NBC-Final-1.pdf"
              type="application/pdf"
              width="100%"
              height="500px"
              className="mb-4"
            >
              <p>
                Unable to display PDF file.{" "}
                <a
                  href="/Flowchart-ME-Process-NBC-Final-1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Download PDF
                </a>
              </p>
            </object>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Supporting Documentation</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <img
                src="/WhatsApp Image 2024-10-02 at 3.50.07 PM.jpeg"
                alt="Medical Examiner Process Documentation 1"
                className="rounded-lg w-full h-auto shadow-lg object-contain"
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              <img
                src="/WhatsApp Image 2024-10-02 at 3.50.07 PM (1).jpeg"
                alt="Medical Examiner Process Documentation 2"
                className="rounded-lg w-full h-auto shadow-lg object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalExaminerProcess;