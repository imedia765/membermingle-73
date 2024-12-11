import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronDown, 
  MessageSquare, 
  TrashIcon,
  Eye,
  Users,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface MemberCardProps {
  member: {
    id: number;
    name: string;
    membershipNo: string;
    status: string;
    joinDate: string;
    email: string;
    phone: string;
    address: string;
    paymentHistory: Array<{
      date: string;
      amount: number;
      status: string;
    }>;
    adminNotes: string;
    coveredMembers?: {
      spouses?: Array<{ name: string; dateOfBirth: string }>;
      dependants?: Array<{ name: string; dateOfBirth: string; relationship: string }>;
    };
  };
  expandedMember: number | null;
  editingNotes: number | null;
  toggleMember: (id: number) => void;
  setEditingNotes: (id: number | null) => void;
}

export const MemberCard = ({ 
  member, 
  expandedMember, 
  editingNotes, 
  toggleMember, 
  setEditingNotes 
}: MemberCardProps) => {
  return (
    <Card key={member.id} className="overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleMember(member.id)}
              className="mt-1"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {member.membershipNo} - {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Status: {member.status} | Joined: {member.joinDate}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Family Members</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Covered Members</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {member.coveredMembers?.spouses?.length > 0 && (
                  <>
                    <div className="px-2 py-1.5 text-sm font-semibold">Spouse</div>
                    {member.coveredMembers.spouses.map((spouse, index) => (
                      <div key={index} className="px-2 py-1.5 text-sm">
                        {spouse.name}
                        <div className="text-xs text-muted-foreground">
                          Born: {spouse.dateOfBirth}
                        </div>
                      </div>
                    ))}
                    <DropdownMenuSeparator />
                  </>
                )}
                {member.coveredMembers?.dependants?.length > 0 && (
                  <>
                    <div className="px-2 py-1.5 text-sm font-semibold">Dependants</div>
                    {member.coveredMembers.dependants.map((dependant, index) => (
                      <div key={index} className="px-2 py-1.5 text-sm">
                        {dependant.name}
                        <div className="text-xs text-muted-foreground">
                          {dependant.relationship} | Born: {dependant.dateOfBirth}
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {(!member.coveredMembers?.spouses?.length && !member.coveredMembers?.dependants?.length) && (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No family members registered
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Eye className="h-4 w-4 mr-2" />
              <span>View</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto text-destructive">
              <TrashIcon className="h-4 w-4 mr-2" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>

      {expandedMember === member.id && (
        <CardContent className="border-t">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <p className="text-sm">Email: {member.email}</p>
              <p className="text-sm">Phone: {member.phone}</p>
              <p className="text-sm">Address: {member.address}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Payment History</h4>
              <div className="space-y-2">
                {member.paymentHistory.map((payment, index) => (
                  <div key={index} className="text-sm flex justify-between">
                    <span>{payment.date}</span>
                    <span>£{payment.amount}</span>
                    <span className="text-green-500">{payment.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Admin Notes</h4>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setEditingNotes(editingNotes === member.id ? null : member.id)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {editingNotes === member.id ? "Save Notes" : "Edit Notes"}
              </Button>
            </div>
            {editingNotes === member.id ? (
              <Textarea 
                defaultValue={member.adminNotes}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{member.adminNotes}</p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};