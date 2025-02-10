export interface FoodMenuItem {
  uuid: string;
  name: string;
  price: string;
  description: string;
  image: string;
  is_available: boolean;
  type: string;
  food_category_details: FoodCategory;
  current_offer: FoodOffer | null;
  restaurant_settings: {
    wallpaper: {
      uuid: string;
      name: string;
      image_url: string;
      is_default: boolean;
    };
  };
}

export interface FoodCategory {
  uuid: string;
  name: string;
  bangla_name: string;
}

export interface FoodCategoriesResponse {
  general_categories: FoodCategory[];
  restaurant_categories: FoodCategory[];
}

export interface CreateFoodMenuItem {
  food_category: string;
  name: string;
  price: number;
  description: string;
  is_available: boolean;
  type: string;
}

export interface FoodOffer {
  uuid: string;
  menu: string;
  offer_price: string;
  offer_percentage: string;
  expiry_time: string;
  expiry_date: string;
}

export interface CreateFoodOffer {
  menu: string;
  offer_price: string;
  offer_percentage: string;
  expiry_time: string;
  expiry_date: string;
}
