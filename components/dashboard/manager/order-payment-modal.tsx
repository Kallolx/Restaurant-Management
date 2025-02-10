import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface OrderPaymentModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
  onConfirm: () => void;
}

export function OrderPaymentModal({
  open,
  onClose,
  total,
  onConfirm,
}: OrderPaymentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order payment</DialogTitle>
        </DialogHeader>
        <Input type="number" value={total} className="bg-muted" readOnly />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} className="text-red-500">
            No
          </Button>
          <Button variant="ghost" onClick={onConfirm} className="text-blue-500">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
