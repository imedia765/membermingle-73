import { Receipt, Ticket, HeadsetIcon, File, MailIcon, PhoneCall, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AccountSettingsSection } from "@/components/profile/AccountSettingsSection";
import { TicketingSection } from "@/components/profile/TicketingSection";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export default function Profile() {
  const { toast } = useToast();
  const [searchDate, setSearchDate] = useState("");
  const [searchAmount, setSearchAmount] = useState("");

  const paymentHistory = [
    { date: '2024-03-15', amount: '£50.00', status: 'Paid', type: 'Membership Fee' },
    { date: '2024-02-15', amount: '£50.00', status: 'Paid', type: 'Membership Fee' },
  ];

  const filteredPayments = paymentHistory.filter(payment => {
    const matchesDate = searchDate ? payment.date.includes(searchDate) : true;
    const matchesAmount = searchAmount ? payment.amount.includes(searchAmount) : true;
    return matchesDate && matchesAmount;
  });

  const documents = [
    { name: 'ID Document.pdf', uploadDate: '2024-03-01', type: 'Identification' },
    { name: 'Proof of Address.pdf', uploadDate: '2024-02-15', type: 'Address Proof' },
  ];

  const handleFileUpload = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically handle the file upload to your backend
      toast({
        title: "Document Upload",
        description: `${type} document uploaded successfully: ${file.name}`,
      });
    }
  };

  const documentTypes = [
    { type: 'Identification', description: 'Valid ID document (Passport, Driving License)' },
    { type: 'Address Proof', description: 'Recent utility bill or bank statement' },
    { type: 'Medical Certificate', description: 'Recent medical certificate if applicable' },
    { type: 'Marriage Certificate', description: 'Marriage certificate if applicable' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Members Profile
      </h1>

      <div className="space-y-6">
        <AccountSettingsSection />

        {/* Support Tickets Section */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button 
              variant="default"
              className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
            >
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                <span>Support Tickets</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <TicketingSection />
          </CollapsibleContent>
        </Collapsible>

        {/* Payment History Section */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button 
              variant="default"
              className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
            >
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                <span>Payment History</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Search by Date</label>
                  <Input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Search by Amount</label>
                  <Input
                    type="text"
                    placeholder="e.g. £50.00"
                    value={searchAmount}
                    onChange={(e) => setSearchAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Support Section */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button 
              variant="default"
              className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
            >
              <div className="flex items-center gap-2">
                <HeadsetIcon className="h-4 w-4" />
                <span>Support</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team through any of these channels:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />
                  <span>support@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  <span>+44 (0) 123 456 7890</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Documents Section */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button 
              variant="default"
              className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
            >
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>Documents</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="grid gap-4 md:grid-cols-2">
                {documentTypes.map((doc) => (
                  <div key={doc.type} className="p-4 border rounded-lg space-y-2">
                    <h3 className="font-medium">{doc.type}</h3>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        onChange={handleFileUpload(doc.type)}
                        className="text-sm"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <Button size="sm" className="flex items-center gap-1">
                        <Upload className="h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Documents List */}
              <ScrollArea className="h-[300px] mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.uploadDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
