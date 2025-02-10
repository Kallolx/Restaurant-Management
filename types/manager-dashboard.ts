export interface Employee {
  id: string;
  name: string;
  role: string;
  shift: string;
  status: "Regular" | "Irregular" | "On leave";
  performance: {
    type: string;
    value: number;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  availability: "Available" | "Unavailable";
  tags: string[];
}

export interface OrderItem {
  name: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNo: string;
  time: string;
  items: OrderItem[];
  totalItems: number;
  price: number;
  isReadyToServe: boolean;
  isPaid: boolean;
  isCompleted: boolean;
}

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Waiter",
    shift: "4:30-9:30PM",
    status: "Regular",
    performance: { type: "Orders", value: 0 },
  },
  {
    id: "2",
    name: "John Doe",
    role: "Waiter",
    shift: "4:30-9:30PM",
    status: "Regular",
    performance: { type: "Orders", value: 0 },
  },
  {
    id: "3",
    name: "John Doe",
    role: "Waiter",
    shift: "4:30-9:30PM",
    status: "Irregular",
    performance: { type: "Orders", value: 0 },
  },
  {
    id: "4",
    name: "John Doe",
    role: "Waiter",
    shift: "4:30-9:30PM",
    status: "Regular",
    performance: { type: "Orders", value: 0 },
  },
  {
    id: "5",
    name: "John Doe",
    role: "Waiter",
    shift: "4:30-9:30PM",
    status: "On leave",
    performance: { type: "Orders", value: 0 },
  },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Grilled Chicken",
    description: "Grilled chicken breast with...",
    price: 324.99,
    availability: "Available",
    tags: ["Gluten-Free"],
  },
  {
    id: "2",
    name: "Beef Burger",
    description: "Classic beef burger with fries.",
    price: 224.99,
    availability: "Available",
    tags: ["Vegetarian"],
  },
  {
    id: "3",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with icing.",
    price: 124.99,
    availability: "Unavailable",
    tags: ["Vegetarian"],
  },
  {
    id: "4",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with icing.",
    price: 124.99,
    availability: "Unavailable",
    tags: ["Vegetarian"],
  },
  {
    id: "5",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with icing.",
    price: 124.99,
    availability: "Unavailable",
    tags: ["Vegetarian"],
  },
  {
    id: "6",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with icing.",
    price: 124.99,
    availability: "Unavailable",
    tags: ["Vegetarian"],
  },
  {
    id: "7",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with icing.",
    price: 124.99,
    availability: "Unavailable",
    tags: ["Vegetarian"],
  },
  {
    id: "8",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with icing.",
    price: 124.99,
    availability: "Unavailable",
    tags: ["Vegetarian"],
  },
  {
    id: "9",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with icing.",
    price: 124.99,
    availability: "Unavailable",
    tags: ["Vegetarian"],
  },
];

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNo: "#08",
    time: "3:25PM",
    items: [
      { name: "Grilled Chicken", quantity: 2 },
      { name: "Spring Rolls", quantity: 2 },
      { name: "Chicken Soup", quantity: 2 },
      { name: "Fresh Salad", quantity: 2 },
      { name: "Veggie Burger", quantity: 2 },
      { name: "Fresh Lemonade", quantity: 2 },
    ],
    totalItems: 5,
    price: 2560,
    isReadyToServe: false,
    isPaid: false,
    isCompleted: false,
  },
  {
    id: "2",
    orderNo: "#08",
    time: "3:25PM",
    items: [
      { name: "Grilled Chicken", quantity: 2 },
      { name: "Spring Rolls", quantity: 2 },
    ],
    totalItems: 5,
    price: 2560,
    isReadyToServe: false,
    isPaid: false,
    isCompleted: true,
  },
  {
    id: "3",
    orderNo: "#08",
    time: "3:25PM",
    items: [
      { name: "Grilled Chicken", quantity: 2 },
      { name: "Spring Rolls", quantity: 2 },
      { name: "Chicken Soup", quantity: 2 },
      { name: "Fresh Salad", quantity: 2 },
      { name: "Veggie Burger", quantity: 2 },
      { name: "Fresh Lemonade", quantity: 2 },
    ],
    totalItems: 4,
    price: 2560,
    isReadyToServe: false,
    isPaid: false,
    isCompleted: false,
  },
];
