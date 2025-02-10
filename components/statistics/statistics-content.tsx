"use client";

import { SalesItems } from "../dashboard/sales-items";
import { OrderSummary } from "./order-summary";
import { RevenueStats } from "./revenue-stats";
import { SalesPerformance } from "./sales-performance";

export function StatisticsContent() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <RevenueStats />
      <OrderSummary />
      <SalesPerformance />
      <SalesItems />
    </div>
  );
}
