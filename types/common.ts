export interface BaseItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface BasePricing {
  subtotal: number;
  vat: number;
  total: number;
}
