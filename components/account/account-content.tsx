"use client";

import { NetIncome } from "../dashboard/net-income";
import { TotalExpense } from "./total-expense";
import { TotalRevenue } from "./total-revenue";
import { TotalSales } from "./total-sales";

export function AccountContent() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <TotalSales />
      <TotalExpense />
      <TotalRevenue />
      <NetIncome />
    </div>
  );
}
