export interface DailyStats {
  total_sales: string;
  total_orders: number;
  total_expense: string;
  date: string;
}

export interface StatsUpdate {
  type: "daily_stats_update";
  stats: DailyStats;
}
