import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const MedicalExaminerProcess = () => {
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

      <h1>Medical Examiner Process</h1>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Cemetery Fees and Charges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3>Graves for which NO Exclusive Right of Burial has been granted</h3>
            <p className="font-medium mb-2">For the burial of the body of:</p>
            <ul className="list-disc list-inside">
              <li>A child in the Forget Me Not Garden - No charge</li>
              <li>A stillborn child or child whose age at the time of death did not exceed 16 years (in an unpurchased grave) - No charge</li>
              <li>Child from outside of East Staffordshire - £48.00</li>
              <li>A person whose age at the time of death exceeded 16 years - £792.00</li>
            </ul>
          </div>

          <div>
            <h3>Graves for which an EXCLUSIVE RIGHT OF BURIAL has been granted</h3>
            <ul className="list-disc list-inside">
              <li>Purchase of Exclusive Right of Burial - £1,245.00</li>
              <li>Purchase of Exclusive Right of Burial for cremated remains - £433.00</li>
            </ul>
            
            <p className="font-medium mt-4 mb-2">Plus for the burial of:</p>
            <ul className="list-disc list-inside">
              <li>A stillborn child or a child whose age at the time of death did not exceed 16 years - No charge</li>
              <li>Child from outside of East Staffordshire - £48.00</li>
              <li>A person whose age at the time of death exceeded 16 years - £792.00</li>
              <li>Additional cost for bricked grave - £219.00</li>
              <li>Burial of cremated remains - £219.00</li>
              <li>Admin charge for multiple interments - £54.00</li>
            </ul>
          </div>

          <div>
            <h3>Miscellaneous</h3>
            <ul className="list-disc list-inside">
              <li>Transfer of ownership of Exclusive Right of Burial - £57.00</li>
              <li>Slabbing or sealing a grave - £168.00</li>
              <li>Preparation for the exhumation of a body (administration costs) - £1,265.00</li>
              <li>Fees for searches of Registers including copy of entry - £26.00</li>
            </ul>
          </div>

          <div>
            <h3>Monuments, Gravestones, Tablets & Monumental Inscriptions</h3>
            <p className="font-medium mb-2">PERMIT CHARGES</p>
            <p>For the right to place on a grave for which the Exclusive Right of Burial has been granted:</p>
            <ul className="list-disc list-inside">
              <li>A gravestone, cross, book or scroll not to exceed: 1,350mm in height, 914mm in width, 460mm front to back - £378.00</li>
              <li>The sizes for the cremated remains section not to exceed: 610mm in height, 610mm in width, 460mm front to back - £378.00</li>
              <li>A vase (unless incorporated in a memorial) - £94.00</li>
              <li>For each inscription after the first - £122.00</li>
              <li>The Forget-Me-Not Memorial - £60.00</li>
              <li>The Forget-Me-Not Vase - £48.00</li>
              <li>The Forget Me Not Plaque: double (incl. VAT) - £227.00</li>
              <li>Kerb memorial - £889.00</li>
              <li>Full kerbset (kerbs & headstone) - £1,267.00</li>
              <li>Memorial replacement fee - £120.00</li>
            </ul>
          </div>

          <div>
            <h3>Out of Hours Burial</h3>
            <p>Monday to Friday only 4-7pm may take place by special arrangement subject to availability of staff and safe lighting conditions.</p>
            <p>£180.00 per hour (50% reduction if less than 30 minutes)</p>
            <p className="text-sm">Fees are in addition to Exclusive Right of Burial, Interment and Chapel fees</p>
          </div>

          <div>
            <h3>Burial Times</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Month</th>
                    <th className="text-left p-2">Latest burial start time</th>
                    <th className="text-left p-2">Burial conclusion time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2">January</td><td className="p-2">2.30pm</td><td className="p-2">3.30pm</td></tr>
                  <tr><td className="p-2">February</td><td className="p-2">3.30pm</td><td className="p-2">4.30pm</td></tr>
                  <tr><td className="p-2">March</td><td className="p-2">4.00pm</td><td className="p-2">5.00pm</td></tr>
                  <tr><td className="p-2">April-August</td><td className="p-2">5.45pm</td><td className="p-2">6.45pm</td></tr>
                  <tr><td className="p-2">September</td><td className="p-2">5.30pm</td><td className="p-2">6.30pm</td></tr>
                  <tr><td className="p-2">October</td><td className="p-2">4.00pm</td><td className="p-2">5.00pm</td></tr>
                  <tr><td className="p-2">November</td><td className="p-2">2.45pm</td><td className="p-2">3.45pm</td></tr>
                  <tr><td className="p-2">December</td><td className="p-2">2.30pm</td><td className="p-2">3.30pm</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3>Standing Regulations</h3>
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
            <ol className="list-decimal list-inside">
              <li>The deceased had previously lived within the Borough within the last 20 years for
                a period exceeding 5 years</li>
              <li>The deceased was a former resident within the Borough within the last 20 years
                for a period exceeding 5 years but moved outside the Borough to a rest/nursing
                home.</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalExaminerProcess;