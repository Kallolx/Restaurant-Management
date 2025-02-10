"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SubscriptionHistoryProps } from "@/types/settings";
import { format } from "date-fns";
import { Download } from "lucide-react";

export function SubscriptionHistoryModal({
  open,
  onOpenChange,
  history,
}: SubscriptionHistoryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Subscription History</DialogTitle>
          <DialogDescription>
            View your past subscription details, payment history, and receipts.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[50vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment date</TableHead>
                <TableHead>Package name</TableHead>
                <TableHead className="text-right">Payment amount</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    {format(entry.paymentDate, "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell>{entry.packageName}</TableCell>
                  <TableCell className="text-right">
                    ₹{entry.paymentAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(entry.receiptUrl, "_blank")}
                      aria-label={`Download receipt for payment on ${format(
                        entry.paymentDate,
                        "dd MMM, yyyy"
                      )}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
