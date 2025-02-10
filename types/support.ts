export interface Ticket {
  id: string;
  name: string;
  email: string;
  phone?: string;
  issueCategory: string;
  issue: string;
  subject: string;
  description: string;
  priority: "high" | "medium" | "low";
  date: Date;
  status: "open" | "closed";
}
