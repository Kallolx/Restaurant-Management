import { BaseItem, BasePricing } from "./common";

export interface SaleItem extends BaseItem {}

export interface Sale extends BasePricing {
  date: string;
  time: string;
  orderNo: string;
  items: SaleItem[];
}

export interface DailySale {
  date: string;
  salesItems: string;
  totalSales: number;
  orders: Sale[];
}
