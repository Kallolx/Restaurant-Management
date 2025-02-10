"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { mockOrders } from "@/lib/constants/kitchen-data";
import { OrderCard } from "./order-card";

export function RunningOrders() {
  return (
    <ScrollArea className="h-[calc(100vh-210px)]">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </ScrollArea>
  );
}
