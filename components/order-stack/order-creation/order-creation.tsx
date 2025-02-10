"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateOrderModal from "./create-order-modal";

export default function OrderCreation() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Orders</h1>
        <Button
          onClick={() => setShowCreateOrder(true)}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Add Order
        </Button>
      </div>

      <CreateOrderModal
        open={showCreateOrder}
        onOpenChange={setShowCreateOrder}
      />
    </div>
  );
}
