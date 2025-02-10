export interface Report {
  id: string;
  filename: string;
  type: "account" | "statistic";
  timestamp: string;
  url: string;
}

export interface FoodReport {
  id: string;
  name: string;
  contact: string;
  issueDate: string;
  issueItem: string;
  issueStatement: string;
  status: "in-progress" | "solved";
}

export interface CustomerFeedback {
  id: string;
  name: string;
  contact: string;
  feedback: string;
}

export const mockReports: Report[] = [
  {
    id: "1",
    filename: "report.pdf.account",
    type: "account",
    timestamp: "July 12, 2024 | 8:00 PM",
    url: "#",
  },
  {
    id: "2",
    filename: "report.pdf.statistic",
    type: "statistic",
    timestamp: "July 11, 2024 | 3:30 PM",
    url: "#",
  },
  {
    id: "3",
    filename: "report.pdf.account",
    type: "account",
    timestamp: "July 10, 2024 | 11:45 AM",
    url: "#",
  },
  {
    id: "4",
    filename: "report.pdf.statistic",
    type: "statistic",
    timestamp: "July 9, 2024 | 2:15 PM",
    url: "#",
  },
  {
    id: "5",
    filename: "report.pdf.account",
    type: "account",
    timestamp: "July 8, 2024 | 9:00 AM",
    url: "#",
  },
  {
    id: "6",
    filename: "report.pdf.statistic",
    type: "statistic",
    timestamp: "July 7, 2024 | 4:45 PM",
    url: "#",
  },
  {
    id: "7",
    filename: "report.pdf.account",
    type: "account",
    timestamp: "July 6, 2024 | 10:30 AM",
    url: "#",
  },
  {
    id: "8",
    filename: "report.pdf.statistic",
    type: "statistic",
    timestamp: "July 5, 2024 | 1:00 PM",
    url: "#",
  },
  {
    id: "9",
    filename: "report.pdf.account",
    type: "account",
    timestamp: "July 4, 2024 | 7:30 AM",
    url: "#",
  },
  {
    id: "10",
    filename: "report.pdf.statistic",
    type: "statistic",
    timestamp: "July 3, 2024 | 5:15 PM",
    url: "#",
  },
];

export const mockFoodReports: FoodReport[] = [
  {
    id: "T26",
    name: "Zarif Hossain",
    contact: "+880 145754 547",
    issueDate: "July 12, 2024",
    issueItem: "Grilled Chicken",
    issueStatement:
      "I ordered a grilled chicken sandwich but received a vegetarian sandwich instead.",
    status: "in-progress",
  },
  {
    id: "T27",
    name: "Floyd Miles",
    contact: "+880 145754 547",
    issueDate: "July 12, 2024",
    issueItem: "Grilled Chicken",
    issueStatement:
      "I ordered a grilled chicken sandwich but received a vegetarian sandwich instead.",
    status: "solved",
  },
  {
    id: "T28",
    name: "Cameron Williamson",
    contact: "+880 145754 547",
    issueDate: "July 12, 2024",
    issueItem: "Grilled Chicken",
    issueStatement:
      "I ordered a grilled chicken sandwich but received a vegetarian sandwich instead.",
    status: "solved",
  },
  {
    id: "T29",
    name: "Brooklyn Simmons",
    contact: "+880 145754 547",
    issueDate: "July 12, 2024",
    issueItem: "Grilled Chicken",
    issueStatement:
      "I ordered a grilled chicken sandwich but received a vegetarian sandwich instead.",
    status: "in-progress",
  },
];

export const mockFeedbacks: CustomerFeedback[] = [
  {
    id: "F1",
    name: "Nazmul Hasan",
    contact: "+880 1547845645",
    feedback:
      "The food was absolutely delicious! The flavors were perfectly balanced, and the presentation was stunning. I especially loved the creamy Alfredo pasta—one of the best I've ever had. Kudos to the chef!",
  },
  {
    id: "F2",
    name: "Sarah Johnson",
    contact: "+880 1547845645",
    feedback:
      "Amazing experience! The service was impeccable and the food was outstanding. Will definitely be coming back!",
  },
  {
    id: "F3",
    name: "Michael Chen",
    contact: "+880 1547845645",
    feedback:
      "Great atmosphere and even better food. The new menu items are fantastic. Highly recommend the dessert selection!",
  },
];
