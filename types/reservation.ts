export interface Reservation {
  id: string;
  date: Date;
  time: string;
  tableNumber: string;
  guestCount: string;
  customer: {
    name: string;
    contact: string;
    address: string;
    specialRequest: string;
  };
  status: "pending" | "completed";
}
