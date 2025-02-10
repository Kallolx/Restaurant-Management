import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: {
    date: string;
    tableNo: number;
    foodItems: string[];
    totalItems: number;
    price: number;
    vat: number;
    totalPrice: number;
  };
  handlePrintReceipt: () => void;
}

export default function OrderReceiptModal({
  open,
  onOpenChange,
  orderData = {
    date: "10/10/24",
    tableNo: 12,
    foodItems: ["Grilled Chicken", "Beef Burger"],
    totalItems: 4,
    price: 2460.0,
    vat: 140.0,
    totalPrice: 2600.0,
  },
  handlePrintReceipt,
}: OrderReceiptModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Order Receipt
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Check order overview before printing a receipt
              </p>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Order overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{orderData.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Table no:</span>
                  <span>{orderData.tableNo}</span>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <span className="text-muted-foreground text-nowrap whitespace-nowrap">
                    Food items:
                  </span>
                  <span className="text-right truncate">
                    {orderData.foodItems.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total items:</span>
                  <span>{orderData.totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price:</span>
                  <span>{orderData.price.toFixed(2)}Tk</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">VAT:</span>
                  <span>{orderData.vat.toFixed(2)}Tk</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span className="text-muted-foreground">Total price:</span>
                  <span>{orderData.totalPrice.toFixed(2)}Tk</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex items-center justify-end gap-2 p-6 pt-4">
          <Button
            className="text-destructive border-destructive/50 hover:bg-destructive/20 hover:text-destructive"
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button variant={"primary"} onClick={handlePrintReceipt} className="">
            Print Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
