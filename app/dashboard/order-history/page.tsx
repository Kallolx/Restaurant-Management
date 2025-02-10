"use client";

import { OrderHistoryTable } from "@/components/order-history/order-history-table";

export default function OrderHistoryPage() {
  return (
    <div className="grid h-[calc(100vh-88px)] grid-rows-[auto_1fr]">
      {/* Header */}
      <div className="">
        <h1 className="text-2xl font-medium">Order History</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden pt-3">
        <div className="h-full">
          <OrderHistoryTable />
        </div>
      </div>
    </div>
  );
}
