"use client";

import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TimeRange, TimeRangeSelect } from "./time-range-select";

const data = [
  { day: "Sat", orderSales: 22000, reservations: 18000 },
  { day: "Sun", orderSales: 25000, reservations: 16000 },
  { day: "Mon", orderSales: 18000, reservations: 8000 },
  { day: "Tue", orderSales: 25000, reservations: 19000 },
  { day: "Wed", orderSales: 18000, reservations: 14000 },
  { day: "Thu", orderSales: 20000, reservations: 16000 },
  { day: "Fri", orderSales: 23000, reservations: 22000 },
];

export function RevenueStats() {
  const totalOrderSales = data.reduce((sum, item) => sum + item.orderSales, 0);
  const totalReservations = data.reduce(
    (sum, item) => sum + item.reservations,
    0
  );
  const grossRevenue = totalOrderSales + totalReservations;

  const handleTimeRangeChange = (range: TimeRange) => {};
  return (
    <Card>
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="text-lg font-medium">Revenue Stats</h2>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm text-muted-foreground">Order sales</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-sm text-muted-foreground">
                Reservations
              </span>
            </div>
          </div>
        </div>
        <TimeRangeSelect onChange={handleTimeRangeChange} />
      </div>

      <div className="h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orderSales" name="Order Sales" fill="#3B82F6" />
            <Bar dataKey="reservations" name="Reservations" fill="#F97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="">
        <div className="grid gap-4 md:gap-16 md:grid-cols-2 border-t border-border px-4 py-2">
          <div className="flex flex-row items-center gap-1 justify-between">
            <div className="text-sm text-muted-foreground">
              Total order sales
            </div>
            <div className="text-lg font-semibold">
              ৳{totalOrderSales.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 justify-between">
            <div className="text-sm text-muted-foreground">
              Total reservation sales
            </div>
            <div className="text-lg font-semibold">
              ৳{totalReservations.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1 justify-between border-t border-border px-4 py-2">
          <div className="text-lg font-medium">Gross revenue</div>
          <div className="text-lg font-semibold">
            ৳{grossRevenue.toLocaleString()}
          </div>
        </div>
      </div>
    </Card>
  );
}
