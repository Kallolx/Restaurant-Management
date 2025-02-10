"use client";

import { sampleSales } from "@/components/sales-page/data";
import { FilterComponent } from "@/components/sales-page/filter-component";
import { SalesTable } from "@/components/sales-page/sales-table";
import { FilterState } from "@/components/sales-page/types";
import { Button } from "@/components/ui/button";
import { format, isSameDay, isSameMonth, parse } from "date-fns";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function SalesPage() {
  const navigation = useRouter();
  const [filter, setFilter] = useState<FilterState>({
    selectedMonths: [],
    customDate: undefined,
  });

  const handleFilterChange = (newFilter: FilterState) => {
    setFilter(newFilter);
  };

  const filteredSales = useMemo(() => {
    return sampleSales.filter((sale) => {
      const saleDate = parse(sale.date, "dd MMM, yyyy", new Date());
      if (filter.customDate) {
        return isSameDay(saleDate, filter.customDate);
      } else if (filter.selectedMonths.length > 0) {
        return filter.selectedMonths.some((month) =>
          isSameMonth(saleDate, new Date(saleDate.getFullYear(), month))
        );
      }
      return true;
    });
  }, [filter]);

  const getCurrentFilterDisplay = () => {
    if (filter.customDate) {
      return format(filter.customDate, "dd MMM, yyyy");
    }
    if (filter.selectedMonths.length > 0) {
      return filter.selectedMonths
        .map((month) =>
          format(new Date(new Date().getFullYear(), month), "MMMM")
        )
        .join(", ");
    }
    return "All time";
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          navigation.back();
        }}
        variant="ghost"
        size="default"
        className="ml-0 pl-0"
      >
        <ArrowLeft className="h-4 w-4" />
        <h1 className="text-xl font-medium">Sales</h1>
      </Button>

      <div className="bg-background px-5 py-6 space-y-4 rounded-xl">
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Restaurant Sales Data</h2>
            <FilterComponent
              trigger={
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              }
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing data for:{" "}
            <span className="text-foreground font-medium">
              {getCurrentFilterDisplay()}
            </span>
          </div>
        </div>

        <SalesTable
          sales={filteredSales}
          currentMonth={getCurrentFilterDisplay()}
        />
      </div>
    </div>
  );
}
