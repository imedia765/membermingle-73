import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

const SAMPLE_NOTICES = [
  {
    id: "1",
    message: "Monthly meeting scheduled for next week",
    sentAt: "2024-03-20T10:00:00",
    recipients: ["1", "2", "3", "4"],
    readBy: ["1", "3"]
  },
  {
    id: "2",
    message: "New guidelines update",
    sentAt: "2024-03-19T15:30:00",
    recipients: ["1", "2"],
    readBy: ["1"]
  }
];

export function NoticeHistory() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Notice History</h3>
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Read Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SAMPLE_NOTICES.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>
                  {format(new Date(notice.sentAt), "MMM d, yyyy HH:mm")}
                </TableCell>
                <TableCell>{notice.message}</TableCell>
                <TableCell>{notice.recipients.length} members</TableCell>
                <TableCell>
                  <Badge variant={notice.readBy.length === notice.recipients.length ? "default" : "secondary"}>
                    {notice.readBy.length}/{notice.recipients.length} read
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}