"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelOrderModal({
  isOpen = false,
  onClose,
  onConfirm,
}: CancelOrderModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-lg p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-semibold">
            Cancel Order
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2">
          <p className="text-sm text-muted-foreground">
            Are you sure to cancel this order from “Order Stack”
          </p>
          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="destructive"
              onClick={onClose}
              className="px-6 text-destructive bg-transparent hover:bg-destructive/30"
            >
              Discard
            </Button>
            <Button variant="primary" onClick={onConfirm} className="px-6">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
