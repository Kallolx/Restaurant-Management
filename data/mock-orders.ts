import { Order } from "@/types/order";
import { addHours, subDays } from "date-fns";

// Generate random orders for the last 30 days
export const generateMockOrders = (): Order[] => {
  const orders: Order[] = [];
  const orderTypes = ["Dine in", "Takeaway"] as const;
  const menuItems = [
    "Grilled Chicken",
    "Beef Burger",
    "Fish & Chips",
    "Caesar Salad",
    "Pasta Carbonara",
    "Pizza Margherita",
    "Chicken Wings",
    "Steak",
  ];

  // Use a fixed date for initial render to avoid hydration mismatch
  const baseDate = new Date(2024, 0, 1, 12, 0, 0);

  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = subDays(baseDate, daysAgo);
    const timeOffset = Math.floor(Math.random() * 12);
    const orderDate = addHours(date, timeOffset);

    const items = Array.from(
      { length: Math.floor(Math.random() * 4) + 1 },
      () => ({
        name: menuItems[Math.floor(Math.random() * menuItems.length)],
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Math.floor(Math.random() * 200) + 100,
      })
    );

    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    orders.push({
      id: `order-${i + 1}`,
      date: orderDate,
      orderNo: String(1000 + i).padStart(4, "0"),
      type: orderTypes[Math.floor(Math.random() * orderTypes.length)],
      items,
      total,
    });
  }

  return orders.sort((a, b) => b.date.getTime() - a.date.getTime());
};
