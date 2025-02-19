export interface UserProfile {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}

export interface RestaurantSettings {
  table_capacity: number;
  show_name: boolean;
  show_logo: boolean;
  restaurant_name: string;
  restaurant_logo: string | null;
  add_tax: boolean;
  tax_percentage: number;
  add_vat: boolean;
  vat_percentage: number;
  menu_wallpaper: string | null;
  text_color: string;
  background_opacity: number;
}

export interface StaffMember {
  uuid: string;
  user: UserProfile;
  role: "owner" | "manager" | "staff";
  designation: string | null;
  salary: number | null;
  shift_start_time: string | null;
  shift_end_time: string | null;
  home_address: string | null;
  national_id: string | null;
  national_id_document: string | null;
  status: "regular" | "terminated";
  created_at: string;
  updated_at: string;
}

export interface Restaurant {
  uuid: string;
  name: string;
  address: string;
  website: string | null;
  restaurant_code: number;
  logo: string | null;
  staff_members: StaffMember[];
  created_at: string;
  updated_at: string;
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

export type ProfileFormValues = Pick<UserProfile, "name" | "email" | "phone" | "profile_picture">;
export type RestaurantSettingsValues = RestaurantSettings;
