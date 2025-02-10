import { BaseItem, BasePricing } from "./common";

export interface OrderStackItem extends BaseItem {
  unit: number;
}

export interface OrderStack extends BasePricing {
  id: string;
  date: string;
  orderNo: string;
  type: "dine-in" | "takeaway" | "home-delivery";
  items: OrderStackItem[];
  tableNo?: number;
  orderTime: string;
  status: string;
  customerName?: string;
  contactInfo?: string;
  specialRequest?: string;
  deliveryInfo?: {
    name: string;
    phone: string;
    address: string;
  };
}
