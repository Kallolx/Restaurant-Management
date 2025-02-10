"use client";

import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TimeRange, TimeRangeSelect } from "./time-range-select";

const data = [
  { day: "Sat", food: 18000, beverage: 15000, dessert: 8000 },
  { day: "Sun", food: 20000, beverage: 18000, dessert: 10000 },
  { day: "Mon", food: 15000, beverage: 12000, dessert: 6000 },
  { day: "Tue", food: 22000, beverage: 16000, dessert: 9000 },
  { day: "Wed", food: 19000, beverage: 14000, dessert: 7000 },
  { day: "Thu", food: 21000, beverage: 17000, dessert: 8000 },
  { day: "Fri", food: 23000, beverage: 19000, dessert: 11000 },
];

export function SalesPerformance() {
  const handleTimeRangeChange = (range: TimeRange) => {};
  return (
    <Card>
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="text-lg font-medium">Sales Performance</h2>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-sm text-muted-foreground">Food sales</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span className="text-sm text-muted-foreground">
                Beverage sales
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">
                Dessert sales
              </span>
            </div>
          </div>
        </div>
        <TimeRangeSelect onChange={handleTimeRangeChange} />
      </div>

      <div className="h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="food"
              name="Food Sales"
              stackId="1"
              stroke="#F97316"
              fill="#FED7AA"
            />
            <Area
              type="monotone"
              dataKey="beverage"
              name="Beverage Sales"
              stackId="1"
              stroke="#9333EA"
              fill="#E9D5FF"
            />
            <Area
              type="monotone"
              dataKey="dessert"
              name="Dessert Sales"
              stackId="1"
              stroke="#22C55E"
              fill="#BBF7D0"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
