"use client";

import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { NetIncome } from "@/components/dashboard/net-income";
import { RevenueStats } from "@/components/dashboard/revenue-stats";
import SalesChart from "@/components/dashboard/sales-chart";
import { SalesItems } from "@/components/dashboard/sales-items";
import { Suspense } from "react";

export default function OwnerDashboardPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 space-y-4">
          <MetricsCards />
          <Suspense fallback={<div>Loading sales chart...</div>}>
            <SalesChart />
          </Suspense>
          <RevenueStats />
        </div>

        <div className="md:col-span-4 space-y-4">
          <NetIncome />
          <SalesItems />
        </div>
      </div>
    </div>
  );
}
