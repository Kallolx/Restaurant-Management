import { Category, MenuItem } from "@/types/menu";

export function generateMockCategories(): Category[] {
  return [
    { uuid: "1", name: "Appetizer" },
    { uuid: "2", name: "Main Course" },
    { uuid: "3", name: "Dessert" },
    { uuid: "4", name: "Beverages" },
  ];
}

export function generateMockMenuItems(): MenuItem[] {
  return Array.from({ length: 8 }, (_, i) => ({
    uuid: `${i + 1}`,
    image: `https://picsum.photos/seed/${i + 1}/200/200`,
    name: "Grilled Chicken",
    description: "Grilled chicken with herbs and special sauce...",
    food_category_details: { uuid: "1", name: "Appetizer" },
    type: i % 2 === 0 ? "food" : "beverage",
    price: 500,
    is_available: true,
    ...(i === 3 || i === 5
      ? {
          current_offer: {
            offer_percentage: 15,
            offer_price: 250.74,
          },
        }
      : {}),
  }));
}
