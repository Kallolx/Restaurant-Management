"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { Printer } from "lucide-react";

interface DueCalculateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearDue: () => void;
  onPrintReceipt: () => void;
  dueAmount: number;
  dueDate: Date;
}

export function DueCalculateModal({
  isOpen,
  onClose,
  onClearDue,
  onPrintReceipt,
  dueAmount,
  dueDate,
}: DueCalculateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Due Calculate</DialogTitle>
          <DialogDescription>
            Check due amount and clear or print receipt
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <h3 className="font-medium">Due Amount</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm text-muted-foreground">Date:</div>
            <div className="text-right">{format(dueDate, "dd/MM/yy")}</div>
            <div className="text-sm text-muted-foreground">Total due:</div>
            <div className="text-right">{formatPrice(dueAmount)}</div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            onClick={onPrintReceipt}
            className="h-9 w-9 rounded-full"
          >
            <Printer className="h-5 w-5 text-primary" />
          </Button>
          <div className="flex gap-3">
            <Button variant="destructive" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={"primary"} onClick={onClearDue}>
              Clear Due
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
