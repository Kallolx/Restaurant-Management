"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CurrencyAmount from "@/components/ui/currency-amount";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useRevenueBreakdown } from "@/services/hooks/use-account";
import { subDays } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { TimeRangeSelect } from "../statistics/time-range-select";

export function TotalRevenue() {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const { data, isLoading, isError } = useRevenueBreakdown(
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

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-sm text-muted-foreground">
            (Total food sales + beverage sales)
          </p>
        </div>
        <TimeRangeSelect onChange={handleDateRangeChange} />
      </div>

      <SkeletonWrapper isLoading={isLoading}>
        <div className="mt-4">
          <div className="text-3xl font-bold">
            <CurrencyAmount amount={data?.total_sales || 0} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Total revenue from {data?.date_range.from} to {data?.date_range.to}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="mb-2.5 font-medium">Revenue breakdown</h3>
          <div className="flex justify-between items-center gap-2.5">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-lg">
                <CurrencyAmount amount={data?.food_sales || 0} />
              </span>
              <span className="text-muted-foreground">Food sales</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-lg">
                <CurrencyAmount amount={data?.beverage_sales || 0} />
              </span>
              <span className="text-muted-foreground">Beverage sales</span>
            </div>
          </div>
        </div>
      </SkeletonWrapper>

      <div className="mt-5 flex justify-end items-end">
        <Button variant="link" className="gap-2 border border-primary">
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
