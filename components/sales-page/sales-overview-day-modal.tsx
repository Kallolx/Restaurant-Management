import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { DailySale } from "./types";

interface SalesOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sale: DailySale;
}

export function SalesOverviewModal({
  open,
  onOpenChange,
  sale,
}: SalesOverviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="mb-4">
          <div>
            <DialogTitle className="text-2xl font-medium">
              Sales Overview
            </DialogTitle>
            <p className="text-sm text-secondary-foreground mt-2">
              Sales details overview for {sale.date}
            </p>
          </div>
        </DialogHeader>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary rounded-t-lg">
              <TableRow>
                <TableHead>Sales time</TableHead>
                <TableHead>Order no</TableHead>
                <TableHead>Sales items</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sale.orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="text-base text-foreground font-medium">
                    {order.time}
                  </TableCell>
                  <TableCell className="text-base text-foreground font-medium">
                    {order.orderNo}
                  </TableCell>
                  <TableCell className="text-sm text-foreground font-normal">
                    <div className="space-y-1">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {item.name} x {item.quantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-base text-foreground font-medium">
                    {formatPrice(order.totalPrice.toFixed(2))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="font-semibold">
            Total Sales: {formatPrice(sale.totalSales.toFixed(2))}
          </div>
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
