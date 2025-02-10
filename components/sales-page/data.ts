import { DailySale } from "./types";

export const sampleSales: DailySale[] = [
  {
    date: "29 Oct, 2024",
    salesItems: "Grilled Chicken, Chicken Noodle Soup, Spring Rolls",
    totalSales: 125.0,
    orders: [
      {
        time: "10:30",
        orderNo: "08",
        items: [
          { name: "Grilled Chicken", quantity: 2 },
          { name: "Chicken Noodle Soup", quantity: 1 },
        ],
        totalPrice: 45.0,
      },
      {
        time: "14:15",
        orderNo: "12",
        items: [
          { name: "Spring Rolls", quantity: 3 },
          { name: "Grilled Chicken", quantity: 1 },
        ],
        totalPrice: 80.0,
      },
    ],
  },
  {
    date: "28 Oct, 2024",
    salesItems: "Beef Burger, Fries, Soda",
    totalSales: 95.5,
    orders: [
      {
        time: "12:00",
        orderNo: "15",
        items: [
          { name: "Beef Burger", quantity: 2 },
          { name: "Fries", quantity: 2 },
          { name: "Soda", quantity: 2 },
        ],
        totalPrice: 55.0,
      },
      {
        time: "18:30",
        orderNo: "22",
        items: [
          { name: "Beef Burger", quantity: 1 },
          { name: "Fries", quantity: 1 },
          { name: "Soda", quantity: 1 },
        ],
        totalPrice: 40.5,
      },
    ],
  },
  {
    date: "27 Oct, 2024",
    salesItems: "Pizza, Garlic Bread, Salad",
    totalSales: 180.0,
    orders: [
      {
        time: "19:00",
        orderNo: "25",
        items: [
          { name: "Pizza", quantity: 2 },
          { name: "Garlic Bread", quantity: 1 },
          { name: "Salad", quantity: 1 },
        ],
        totalPrice: 90.0,
      },
      {
        time: "20:15",
        orderNo: "28",
        items: [
          { name: "Pizza", quantity: 2 },
          { name: "Garlic Bread", quantity: 2 },
        ],
        totalPrice: 90.0,
      },
    ],
  },
];
