export interface SaleItem {
  name: string;
  quantity: number;
}

export interface SaleOrder {
  time: string;
  orderNo: string;
  items: SaleItem[];
  totalPrice: number;
}

export interface DailySale {
  date: string;
  salesItems: string;
  totalSales: number;
  orders: SaleOrder[];
}

export interface FilterState {
  selectedMonths: number[];
  customDate: Date | undefined;
}
