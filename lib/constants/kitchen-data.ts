import { Order } from "@/types/order";

export const mockOrders: Order[] = [
  {
    id: "08",
    type: "Dine in",
    time: "03:25",
    totalItems: 6,
    items: [
      { name: "Grilled Chicken", quantity: 2, price: 2420.99 },
      { name: "Spring Rolls", quantity: 2, price: 1220.99 },
      { name: "Chicken Soup", quantity: 2, price: 820.99 },
      { name: "Fresh Salad", quantity: 2, price: 620.99 },
      { name: "Veggie Burger", quantity: 2, price: 1220.99 },
      { name: "Fresh Lemonade", quantity: 2, price: 320.99 },
    ],
    tableNo: 5,
  },
  {
    id: "09",
    type: "Takeaway",
    time: "03:30",
    totalItems: 4,
    items: [
      { name: "Beef Steak", quantity: 1, price: 1220.99 },
      { name: "Caesar Salad", quantity: 1, price: 620.99 },
      { name: "French Fries", quantity: 1, price: 820.99 },
      { name: "Coke", quantity: 1, price: 320.99 },
    ],
    customerName: "John Doe",
    customerContact: "01712345678",
  },
  {
    id: "10",
    type: "home-delivery",
    time: "03:35",
    totalItems: 3,
    items: [
      { name: "Pizza Margherita", quantity: 1, price: 1220.99 },
      { name: "Garlic Bread", quantity: 1, price: 620.99 },
      { name: "Sprite", quantity: 1, price: 320.99 },
    ],
    customerName: "Jane Smith",
    customerContact: "01723456789",
    deliveryAddress: "123 Main St, City",
  },
  {
    id: "11",
    type: "Dine in",
    time: "03:40",
    totalItems: 5,
    items: [
      { name: "Fish & Chips", quantity: 2, price: 1220.99 },
      { name: "Onion Rings", quantity: 1, price: 620.99 },
      { name: "Coleslaw", quantity: 1, price: 820.99 },
      { name: "Ice Tea", quantity: 2, price: 320.99 },
    ],
    tableNo: 3,
  },
];
