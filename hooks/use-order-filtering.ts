"use client";

import { Order } from "@/types/order";
import { isAfter, isSameDay, subDays } from "date-fns";
import { useMemo, useState } from "react";

export function useOrderFiltering(orders: Order[]) {
  const [filterType, setFilterType] = useState("all");
  const [customDate, setCustomDate] = useState<Date>();
  const [quickFilterDays, setQuickFilterDays] = useState<number | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Apply order type filter
      if (filterType !== "all") {
        const orderType = filterType === "dine-in" ? "Dine in" : "Takeaway";
        if (order.type !== orderType) return false;
      }

      // Apply custom date filter
      if (customDate && !isSameDay(order.date, customDate)) {
        return false;
      }

      // Apply quick filter (last X days)
      if (quickFilterDays) {
        const cutoffDate = subDays(new Date(), quickFilterDays);
        return isAfter(order.date, cutoffDate);
      }

      return true;
    });
  }, [orders, filterType, customDate, quickFilterDays]);

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    setQuickFilterDays(null); // Reset quick filter when changing type
  };

  const handleCustomDateChange = (date: Date | undefined) => {
    setCustomDate(date);
    setQuickFilterDays(null); // Reset quick filter when selecting custom date
  };

  const handleQuickFilterChange = (days: number | null) => {
    setQuickFilterDays(days);
    setCustomDate(undefined); // Reset custom date when using quick filter
  };

  return {
    filteredOrders,
    filterType,
    customDate,
    quickFilterDays,
    handleFilterTypeChange,
    handleCustomDateChange,
    handleQuickFilterChange,
  };
}
