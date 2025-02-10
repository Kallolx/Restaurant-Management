"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CurrencyAmount from "@/components/ui/currency-amount";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useExpenseStats } from "@/services/hooks/use-account";
import { subDays } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { TimeRangeSelect } from "../statistics/time-range-select";

interface DateRange {
  from: Date;
  to: Date;
}

interface Expense {
  category_uuid: string;
  category_name: string;
  total_amount: number;
}

export function TotalExpense() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const { data, isLoading, isError } = useExpenseStats(
    dateRange.from,
    dateRange.to
  );

  const handleDateRangeChange = (range: DateRange) => {
    if (range.from !== dateRange.from || range.to !== dateRange.to) {
      setDateRange(range);
    }
  };

  if (isError) {
    return <div>Error loading data</div>;
  }

  const totalExpenses =
    data?.top_expenses.reduce(
      (sum: number, expense: Expense) => sum + expense.total_amount,
      0
    ) || 0;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Total Expense</h2>
        <TimeRangeSelect onChange={handleDateRangeChange} />
      </div>

      <SkeletonWrapper isLoading={isLoading}>
        <div className="mt-4 space-y-4">
          {data?.top_expenses.map((expense: Expense) => (
            <div
              key={expense.category_uuid}
              className="flex items-center justify-between"
            >
              <span className="text-muted-foreground">
                {expense.category_name}
              </span>
              <span className="font-medium text-lg">
                <CurrencyAmount amount={expense.total_amount} />
              </span>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">Total expenses</span>
              <span className="text-lg font-medium">
                <CurrencyAmount amount={totalExpenses} />
              </span>
            </div>
          </div>
        </div>
      </SkeletonWrapper>

      <div className="mt-5 flex justify-end items-end">
        <Button variant="link" className="gap-2 border border-primary">
          View All Expenses
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
