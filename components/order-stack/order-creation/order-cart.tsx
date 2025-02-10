"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderCartProps {
  items: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onOpenOrder: () => void;
}

export function OrderCart({
  items,
  onQuantityChange,
  onOpenOrder,
}: OrderCartProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <div className="flex flex-col min-h-0 h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {index + 1}.
                  </span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ৳ {item.price}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                >
                  {item.quantity === 1 ? (
                    <Trash2 className="h-4 w-4" />
                  ) : (
                    <Minus className="h-4 w-4" />
                  )}
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4 space-y-4 bg-white">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>৳ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>৳ {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total({items.length} items)</span>
            <span>৳ {total.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={onOpenOrder}
          disabled={items.length === 0}
          variant="primary"
        >
          Open Order
        </Button>
      </div>
    </div>
  );
}
