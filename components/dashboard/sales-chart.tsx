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
import { apiClient } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { lazy, useEffect, useMemo, useState } from "react";
import { Area, ResponsiveContainer, XAxis, YAxis } from "recharts";
// Lazy-load heavy libraries or components
const LazyAreaChart = lazy(() =>
  import("recharts").then((module) => ({ default: module.AreaChart }))
);

// Month name mapping
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Type for the API response
interface YearlySalesResponse {
  year: number;
  monthly_sales: Array<{
    month: number;
    amount: number;
  }>;
}

// Function to fetch yearly sales data
const fetchYearlySales = async (year: string): Promise<YearlySalesResponse> => {
  const { data } = await apiClient.get<YearlySalesResponse>(`/api/yearly-sales/?year=${year}`);
  return data;
};

export default function SalesChart() {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  
  // Use react-query to fetch data
  const { data, isLoading, error } = useQuery<YearlySalesResponse>({
    queryKey: ["yearly-sales", selectedYear],
    queryFn: () => fetchYearlySales(selectedYear),
    // Disable the query if we're in development mode with no API
    enabled: process.env.NODE_ENV !== "development" || true, // Set to true for testing
  });

  // Transform the data for the chart
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.monthly_sales.map(item => ({
      month: MONTH_NAMES[item.month - 1],
      sales: item.amount
    }));
  }, [data]);

  // Fallback to mock data if we're in development or if there's an error
  const mockData = useMemo(() => {
    const year = parseInt(selectedYear);
    const baseAmount = year === 2025 ? 880 : year === 2024 ? 3000 : 2000;
    
    return Array.from({ length: 12 }, (_, i) => ({
      month: MONTH_NAMES[i],
      sales: year === 2025 && i === 0 ? 880 : year === 2025 && i > 0 ? 0 : baseAmount + (i * 1000 * (year - 2022))
    }));
  }, [selectedYear]);

  // Use real data if available, otherwise use mock data
  const displayData = useMemo(() => {
    if (isLoading || error || !data || process.env.NODE_ENV === "development") {
      return mockData;
    }
    return chartData;
  }, [chartData, mockData, isLoading, error, data]);

  return (
    <Card className="w-full px-4 py-4">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-4 mobile-md:flex-col mobile-md:items-start mobile-md:gap-3">
        <CardTitle className="text-xl text-foreground font-medium mobile-md:text-lg">
          Monthly Sales Stats-{selectedYear}
        </CardTitle>
        <Select
          value={selectedYear}
          onValueChange={(value: string) => setSelectedYear(value)}
        >
          <SelectTrigger className="w-[180px] mobile-md:w-full">
            <SelectValue placeholder={`Year ${selectedYear}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">Year 2023</SelectItem>
            <SelectItem value="2024">Year 2024</SelectItem>
            <SelectItem value="2025">Year 2025</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <ChartContainer
        config={{
          sales: {
            label: "Sales",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[250px] w-full mobile-md:h-[200px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LazyAreaChart
            data={displayData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
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
              fontSize={10}
              stroke="hsl(var(--muted-foreground))"
              interval="preserveStartEnd"
              minTickGap={10}
              angle={-45}
              textAnchor="end"
              height={50}
              className="mobile-md:text-[8px]"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              fontSize={10}
              tickFormatter={(value) =>
                value / 1000 ? `${(value / 1000).toFixed(0)}k` : `${0}`
              }
              stroke="hsl(var(--muted-foreground))"
              className="mobile-md:text-[8px]"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </LazyAreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
