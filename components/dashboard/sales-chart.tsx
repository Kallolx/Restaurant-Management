"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lazy, useMemo, useState } from "react";
import { Area, ResponsiveContainer, XAxis, YAxis } from "recharts";
// Lazy-load heavy libraries or components
const LazyAreaChart = lazy(() =>
  import("recharts").then((module) => ({ default: module.AreaChart }))
);

const monthlyData = {
  2023: [
    { month: "Jan", sales: 2000 },
    { month: "Feb", sales: 12000 },
    { month: "Mar", sales: 10000 },
    { month: "Apr", sales: 9000 },
    { month: "May", sales: 15000 },
    { month: "Jun", sales: 20000 },
    { month: "Jul", sales: 15000 },
    { month: "Aug", sales: 14000 },
    { month: "Sep", sales: 18000 },
    { month: "Oct", sales: 20000 },
    { month: "Nov", sales: 22000 },
    { month: "Dec", sales: 15000 },
  ],
  2024: [
    { month: "Jan", sales: 3000 },
    { month: "Feb", sales: 13000 },
    { month: "Mar", sales: 11000 },
    { month: "Apr", sales: 10000 },
    { month: "May", sales: 16000 },
    { month: "Jun", sales: 21000 },
    { month: "Jul", sales: 16000 },
    { month: "Aug", sales: 15000 },
    { month: "Sep", sales: 19000 },
    { month: "Oct", sales: 21000 },
    { month: "Nov", sales: 23000 },
    { month: "Dec", sales: 16000 },
  ],
};

export default function SalesChart() {
  const [selectedYear, setSelectedYear] = useState<"2023" | "2024">("2024");

  const chartData = useMemo(() => monthlyData[selectedYear], [selectedYear]);

  return (
    <Card className="w-full px-4 py-4">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
        <CardTitle className="text-xl text-foreground font-medium">
          Monthly Sales Stats-{selectedYear}
        </CardTitle>
        <Select
          value={selectedYear}
          onValueChange={(value: "2023" | "2024") => setSelectedYear(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year 2024" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">Year 2023</SelectItem>
            <SelectItem value="2024">Year 2024</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LazyAreaChart
              data={chartData}
              // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                fontSize={12}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(value) =>
                  value / 1000 ? `${(value / 1000).toFixed(0)}k` : `${0}`
                }
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#colorSales)"
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "hsl(var(--background))",
                  stroke: "hsl(var(--chart-1))",
                }}
              />
            </LazyAreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
