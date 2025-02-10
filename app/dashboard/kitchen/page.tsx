"use client";

import { KitchenHeader } from "@/components/kitchen/kitchen-header";
import { RunningOrders } from "@/components/kitchen/running-orders";

export default function KitchenPage() {
  return (
    <div className="h-full space-y-3">
      <h1 className="text-2xl font-medium">Kitchen View</h1>
      <div className="space-y-3 bg-background rounded-lg">
        <KitchenHeader />
        <RunningOrders />
      </div>
    </div>
  );
}
