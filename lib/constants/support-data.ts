import type { Ticket } from "@/types/support";

export const mockTickets: Ticket[] = [
  {
    id: "165874",
    date: new Date("2024-12-09"),
    name: "Fardin Hossain",
    status: "closed",
    email: "example@email.com",
    issue: "Order issue",
    subject: "Failed payment",
    issueCategory: "payment",
    description: "Payment failed during checkout",
    priority: "high",
  },
  {
    id: "165875",
    date: new Date("2024-12-09"),
    name: "Sarah Johnson",
    status: "open",
    email: "sarah@email.com",
    issue: "Technical issue",
    subject: "Dashboard loading",
    issueCategory: "technical",
    description: "Dashboard is slow to load",
    priority: "medium",
  },
  {
    id: "165876",
    date: new Date("2024-12-08"),
    name: "Mike Chen",
    status: "closed",
    email: "mike@email.com",
    issue: "Order issue",
    subject: "Wrong order delivered",
    issueCategory: "order",
    description: "Wrong order delivered to customer",
    priority: "high",
  },
  {
    id: "165877",
    date: new Date("2024-12-08"),
    name: "Emma Wilson",
    status: "open",
    email: "emma@email.com",
    issue: "Payment issue",
    subject: "Refund request",
    issueCategory: "payment",
    description: "Customer requested refund for a failed payment",
    priority: "medium",
  },
];

export const faqItems = [
  {
    id: "1",
    question: "How do I filter the order history by date or type",
    answer:
      'To filter the order history, go to the "Order History" page. At the top, you will find filter options. You can select a specific date range or filter by order type (e.g., dine-in, takeout, delivery). Once you\'ve chosen your filter options, click "Apply" to see the relevant orders.',
  },
  {
    id: "2",
    question: "How do I add a new food item to the menu?",
    answer:
      'To add a new food item, navigate to the "Menu Management" section. Click the "Add New Item" button and fill in the required details, such as the item name, category, price, and description. You can also upload an image. Once completed, click "Save," and the new item will appear in the menu list.',
  },
  {
    id: "3",
    question: "How can I view the total revenue for the current month?",
    answer:
      'Go to the "Statistics" or "Revenue" section on the dashboard. Here you will see a breakdown of your revenue for the current month. You can also filter by custom date ranges to see revenue from other periods.',
  },
  {
    id: "4",
    question: "What should I do if I notice an error in an expense entry?",
    answer:
      'If you spot an error in an expense entry, go to the "Expenses" section and locate the specific entry. Click the "Edit" button next to the entry, make the necessary changes, and save. If you need to delete the entry, use the "Delete" option next to it.',
  },
  {
    id: "5",
    question: "How can I track peak reservation times?",
    answer:
      'To track peak reservation times, navigate to the "Reservation Statistics" section. You\'ll find a heat map or bar chart showing the busiest times by day and hour. You can filter the data by date range to view peak times for specific periods.',
  },
  {
    id: "6",
    question: "Can I set different access levels for users?",
    answer:
      'Yes, you can assign different roles and permissions for users. Go to the "User Management" section in the settings. From there, you can create new user roles (e.g., Admin, Manager, Staff) and assign permissions to each role. When adding a new user, simply choose the appropriate role for them.',
  },
  {
    id: "7",
    question: "What can I do if my dashboard is loading slowly?",
    answer:
      "If your dashboard is slow to load, first ensure that your internet connection is stable. If the issue persists, try clearing your browser cache or using a different browser. If none of these solutions work, contact support for further assistance, and our team will investigate the issue.",
  },
  {
    id: "8",
    question: "How can I monitor the restaurant's expenses?",
    answer:
      'You can track and monitor expenses in the "Expenses" section. This area allows you to view expenses by category (e.g., food, labor, utilities), date, or supplier. You can also export your expense data or filter it for specific time periods.',
  },
  {
    id: "9",
    question: "How do I contact support if I encounter an issue?",
    answer:
      'If you encounter any issues or need help, you can contact our support team by clicking the "Support" or "Help" button in the dashboard. This will take you to a form where you can describe the issue, and our team will get back to you as soon as possible.',
  },
];
