"use client";

import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { NetIncome } from "@/components/dashboard/net-income";
import { RevenueStats } from "@/components/dashboard/revenue-stats";
import SalesChart from "@/components/dashboard/sales-chart";
import { SalesItems } from "@/components/dashboard/sales-items";
import { Suspense } from "react";

export default function OwnerDashboardPage() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-end-9 mobile-md:col-end-13 space-y-4">
          <MetricsCards />
          <Suspense fallback={<div>Loading sales chart...</div>}>
            <SalesChart />
          </Suspense>
          <RevenueStats />
        </div>

        <div className="col-start-9 col-end-13  mobile-md:col-start-1 mobile-md:row-start-2 space-y-4">
          <NetIncome />
          <SalesItems />
        </div>
      </div>
    </div>
  );
}
