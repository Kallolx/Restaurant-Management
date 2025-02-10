import { apiClient } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

// Type definitions
export interface DateRange {
  from: string;
  to: string;
}

export interface SalesSummaryResponse {
  date_range: DateRange;
  total_sales: number;
  top_selling_items: Array<{
    uuid: string;
    name: string;
    total_sales: number;
  }>;
  low_selling_items: Array<{
    uuid: string;
    name: string;
    total_sales: number;
  }>;
}

export interface RevenueBreakdownResponse {
  date_range: DateRange;
  total_sales: number;
  food_sales: number;
  beverage_sales: number;
  highest_food_sales: {
    uuid: string;
    name: string;
    total_quantity: number;
    total_price: number;
  };
  highest_beverage_sales: {
    uuid: string;
    name: string;
    total_quantity: number;
    total_price: number;
  };
}

export interface ExpenseStatsResponse {
  date_range: DateRange;
  top_expenses: Array<{
    category_uuid: string;
    category_name: string;
    total_amount: number;
  }>;
  other_expenses: number;
}

export interface FinancialOverviewResponse {
  date_range: DateRange;
  total_paid_amount: number;
  total_expenses: number;
  total_dues: number;
}

const ACCOUNT_KEYS = {
  salesSummary: (from: string, to: string) =>
    ["sales-summary", from, to] as const,
  revenueBreakdown: (from: string, to: string) =>
    ["revenue-breakdown", from, to] as const,
  expenseStats: (from: string, to: string) =>
    ["expense-stats", from, to] as const,
  financialOverview: (from: string, to: string) =>
    ["financial-overview", from, to] as const,
};

export function useSalesSummary(from: Date, to: Date) {
  const fromDate = format(from, "yyyy-MM-dd");
  const toDate = format(to, "yyyy-MM-dd");

  return useQuery<SalesSummaryResponse>({
    queryKey: ACCOUNT_KEYS.salesSummary(fromDate, toDate),
    queryFn: async () => {
      const { data } = await apiClient.get<SalesSummaryResponse>(
        `/sales-overview/?from=${fromDate}&to=${toDate}`
      );
      return data;
    },
  });
}

export function useRevenueBreakdown(from: Date, to: Date) {
  const fromDate = format(from, "yyyy-MM-dd");
  const toDate = format(to, "yyyy-MM-dd");

  return useQuery<RevenueBreakdownResponse>({
    queryKey: ACCOUNT_KEYS.revenueBreakdown(fromDate, toDate),
    queryFn: async () => {
      const { data } = await apiClient.get<RevenueBreakdownResponse>(
        `/sales-type-breakdown/?from=${fromDate}&to=${toDate}`
      );
      return data;
    },
  });
}

export function useExpenseStats(from: Date, to: Date) {
  const fromDate = format(from, "yyyy-MM-dd");
  const toDate = format(to, "yyyy-MM-dd");

  return useQuery<ExpenseStatsResponse>({
    queryKey: ACCOUNT_KEYS.expenseStats(fromDate, toDate),
    queryFn: async () => {
      const { data } = await apiClient.get<ExpenseStatsResponse>(
        `/expense-stats/?from=${fromDate}&to=${toDate}`
      );
      return data;
    },
  });
}

export function useFinancialOverview(from: Date, to: Date) {
  const fromDate = format(from, "yyyy-MM-dd");
  const toDate = format(to, "yyyy-MM-dd");

  return useQuery<FinancialOverviewResponse>({
    queryKey: ACCOUNT_KEYS.financialOverview(fromDate, toDate),
    queryFn: async () => {
      const { data } = await apiClient.get<FinancialOverviewResponse>(
        `/financial-overview/?from=${fromDate}&to=${toDate}`
      );
      return data;
    },
  });
}
