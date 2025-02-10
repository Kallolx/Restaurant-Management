export interface MenuItem {
  uuid: string;
  name: string;
  price: number;
  description: string;
  image: string;
  is_available: boolean;
  type: MenuFoodType;
  food_category_details: Category;
  current_offer?: CurrentOffer | null;
  restaurant_settings?: RestaurantSettings;
}

export type MenuFoodType = "food" | "beverage";
export interface Category {
  uuid: string;
  name: string;
  bangla_name?: string;
}

export interface MenuFilters {
  priceSort: "high-to-low" | "low-to-high" | null;
  categories: string[];
  types: MenuFoodType[];
}

export interface CurrentOffer {
  uuid?: string;
  offer_price: number;
  offer_percentage: number;
  expiry_time?: string;
  expiry_date?: string;
}
export interface RestaurantSettings {
  wallpaper: Wallpaper;
}
export interface Wallpaper {
  uuid: string;
  name: string;
  image_url: string;
  is_default: boolean;
}

export interface CreateOfferData {
  menu: string;
  offer_price: string;
  offer_percentage: string;
  expiry_time: string;
  expiry_date: string;
}

export interface CreateMenuItemData {
  name: string;
  description: string;
  price: number;
  food_category: string;
  is_available: boolean;
  type: MenuFoodType;
}

export interface UpdateMenuItemData extends Partial<CreateMenuItemData> {
  uuid: string;
}

export interface CreateCategoryData {
  name: string;
  bangla_name: string;
}

export interface UpdateCategoryData extends CreateCategoryData {
  uuid?: string;
}
