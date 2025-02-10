export interface UserProfile {
  name: string;
  email: string;
  role: string;
  phone: string;
  password: string;
  avatar: string;
}

export interface RestaurantSettings {
  tableCapacity: number;
  showName: boolean;
  showLogo: boolean;
  restaurantName: string;
  logo?: string;
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  startDate: Date;
  nextBillingDate: Date;
  tax: number;
  vat: number;
}

export interface BackgroundTheme {
  id: string;
  url: string;
  alt: string;
}

export interface BackgroundSettings {
  textColor: "white" | "black" | string;
  opacity: number;
  selectedTheme: string;
}

export interface ColorOption {
  id: string;
  value: string;
  label: string;
}

export interface SubscriptionHistoryEntry {
  id: string;
  paymentDate: Date;
  packageName: string;
  paymentAmount: number;
  receiptUrl: string;
}

export interface SubscriptionHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: SubscriptionHistoryEntry[];
}

export type ProfileFormValues = UserProfile;
export type RestaurantSettingsValues = RestaurantSettings;
