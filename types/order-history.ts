import { OrderItemType } from "./order";

export interface OrderHistory {
  id: string;
  date: Date;
  orderNo: string;
  type: "Dine in" | "Takeaway" | "home-delivery";
  items: OrderItemType[];
  total: number;
  tableNo?: number;
  customerName?: string;
  contactInfo?: string;
  specialRequest?: string;
}
