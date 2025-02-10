"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CurrencyAmount from "@/components/ui/currency-amount";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useSalesSummary } from "@/services/hooks/use-account";
import { subDays } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { TimeRangeSelect } from "../statistics/time-range-select";

export function TotalSales() {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const { data, isLoading, isError } = useSalesSummary(
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
        <h2 className="text-lg font-semibold">Total Sales</h2>
        <TimeRangeSelect onChange={handleDateRangeChange} />
      </div>

      <SkeletonWrapper isLoading={isLoading}>
        <div className="mt-4">
          <div className="text-3xl font-bold">
            <CurrencyAmount amount={data?.total_sales || 0} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Total sales from {data?.date_range.from} to {data?.date_range.to}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="font-medium">Top selling items</h3>
          <div className="my-2.5 flex items-center gap-4 justify-between flex-wrap">
            {data?.top_selling_items.map((item) => (
              <div
                key={item.uuid}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-sm">
                    <span className="">Sales:</span>{" "}
                    <span className="text-base font-medium">
                      <CurrencyAmount amount={item.total_sales} />
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Item: {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="font-medium">Low selling items</h3>
          <div className="my-2.5 flex items-center gap-4 justify-between flex-wrap">
            {data?.low_selling_items.map((item) => (
              <div
                key={item.uuid}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-sm">
                    <span className="">Sales:</span>{" "}
                    <span className="text-base font-medium">
                      <CurrencyAmount amount={item.total_sales} />
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Item: {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SkeletonWrapper>

      <div className="mt-5 flex justify-end">
        <Button variant="link" className="gap-2 border border-primary">
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
