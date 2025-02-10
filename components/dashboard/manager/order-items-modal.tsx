import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type OrderItem } from "@/types/manager-dashboard";

interface OrderItemsModalProps {
  open: boolean;
  onClose: () => void;
  orderNo: string;
  items: OrderItem[];
}

export function OrderItemsModal({
  open,
  onClose,
  orderNo,
  items,
}: OrderItemsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order no-{orderNo}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <h3 className="font-medium">Order Items:</h3>
          <div className="space-y-1">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>
                  {index + 1}. {item.name}
                </span>
                <span>X {item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
