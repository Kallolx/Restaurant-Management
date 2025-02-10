"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Order } from "@/types/order";
import { useState } from "react";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="rounded-lg border overflow-hidden bg-white">
      <div className="grid grid-cols-[1fr,1.2fr] h-full">
        {/* Left Section */}
        <div className="p-4 flex flex-col justify-between">
          {/* Order Info */}
          <div className="space-y-2">
            <div className="text-lg font-medium">Order no-{order.id}</div>
            <div>
              Order type: <span className="font-medium">{order.type}</span>
            </div>
            <div>
              Order time: <span className="font-medium">{order.time}</span>
            </div>
            <div>
              Total item:{" "}
              <span className="font-medium">{order.totalItems}</span>
            </div>
          </div>

          {/* Ready for Serve */}
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id={`ready-${order.id}`}
              checked={isReady}
              onCheckedChange={(checked) => setIsReady(checked as boolean)}
              className={cn(
                "h-5 w-5 border-2",
                isReady && "bg-success border-success text-success-foreground"
              )}
            />
            <label
              htmlFor={`ready-${order.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ready for serve
            </label>
          </div>
        </div>

        {/* Right Section - Order Items */}
        <div className="p-4">
          <div className="rounded-lg border border-border/50 bg-[#FFF5F5] p-4">
            <div className="font-medium mb-3">Order Items:</div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    {index + 1}. {item.name}
                  </div>
                  <div>X {item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
