export interface OrderItemType {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  unit?: number;
}

export interface BaseOrderType {
  id?: string;
  date?: Date | string;
  orderNo?: string;
  type?: "Dine in" | "Takeaway" | "home-delivery";
  items: OrderItemType[];
  total?: number;
  totalItems?: number;
  totalPrice?: number;
  status?: string;

  tableNo?: number | string;
  customerName?: string;
  contactInfo?: string;
  specialRequest?: string;

  shopName?: string;
  tokenNumber?: string;
  tel?: string;
  vat?: number;
  subtotal?: number;

  deliveryInfo?: {
    name?: string;
    phone?: string;
    address?: string;
  };

  time?: string;
  isReady?: boolean;
  customerContact?: string;
  deliveryAddress?: string;
}

export type Order = BaseOrderType;

export type OrderStackItem = BaseOrderType;

export interface SaleOrder extends BaseOrderType {
  time?: string;
}

export interface DailySale {
  date?: string;
  salesItems?: string;
  totalSales?: number;
  orders?: SaleOrder[];
}
