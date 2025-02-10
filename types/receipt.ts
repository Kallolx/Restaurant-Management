export interface ReceiptItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Receipt {
  shopName?: string;
  tokenNumber?: string;
  tableNo: number;
  date: string;
  tel?: string;
  items: ReceiptItem[];
  subtotal: number;
  vat: number;
  total: number;
}

export interface OrderReceiptData {
  date: string;
  tableNo: number;
  foodItems: string[];
  totalItems: number;
  price: number;
  vat: number;
  totalPrice: number;
  shopName?: string;
  tokenNumber?: string;
  tel?: string;
  items?: ReceiptItem[];
  subtotal?: number;
}
