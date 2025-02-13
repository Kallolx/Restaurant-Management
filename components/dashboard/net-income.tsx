"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import CurrencyAmount from "@/components/ui/currency-amount";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { formatPrice } from "@/lib/utils";
import { useFinancialOverview } from "@/services/hooks/use-account";
import { subDays } from "date-fns";
import { useState } from "react";
import { TimeRangeSelect } from "../statistics/time-range-select";

const chartConfig = {
  income: {
    label: "Income",
  },
  expense: {
    label: "Expense",
    // color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function NetIncome() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const { data, isLoading, isError } = useFinancialOverview(
    dateRange.from,
    dateRange.to
  );

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    if (range.from !== dateRange.from || range.to !== dateRange.to) {
      setDateRange(range);
    }
  };

  if (isError) {
    return <div>Error loading data</div>;
  }

  // Ensure we have non-zero values for the chart
  const totalIncome = data?.total_paid_amount || 0;
  const totalExpense = data?.total_expenses || 0;
  const hasData = totalIncome > 0 || totalExpense > 0;

  // If there's no data, provide default minimum values to show the chart
  const chartData = hasData
    ? [
        { name: "income", value: totalIncome || 1, fill: "#007AFF" },
        { name: "expense", value: totalExpense || 1, fill: "#FF3B30" },
      ]
    : [
        { name: "income", value: 1, fill: "#007AFF" },
        { name: "expense", value: 1, fill: "#FF3B30" },
      ];

  return (
    <Card className="w-full px-4 py-4">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
        <CardTitle className="text-xl font-medium">Net Income</CardTitle>
        <TimeRangeSelect onChange={handleDateRangeChange} />
      </CardHeader>
      <CardContent className="p-0">
        <SkeletonWrapper isLoading={isLoading}>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={100}
                strokeWidth={4.5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-medium"
                          >
                            {formatPrice(totalIncome)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            Income
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </SkeletonWrapper>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 p-0 pt-4">
        <div className="flex flex-col gap-2.5 items-start justify-between">
          <h3 className="font-medium text-xl">
            <CurrencyAmount amount={totalIncome} />
          </h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm text-secondary-foreground font-medium">
              Total revenue
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 items-start justify-between">
          <h3 className="font-medium text-xl">
            <CurrencyAmount amount={totalExpense} />
          </h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-sm text-secondary-foreground font-medium">
              Total expenses
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
