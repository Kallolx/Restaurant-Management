import { Reservation } from "@/types/reservation";
import { addDays, subDays } from "date-fns";

export const generateMockReservations = (): Reservation[] => {
  const baseDate = new Date();
  const reservations: Reservation[] = [];

  // Generate 20 pending reservations
  for (let i = 0; i < 20; i++) {
    const date = addDays(baseDate, Math.floor(Math.random() * 14));
    reservations.push({
      id: `RSV${(i + 10).toString().padStart(2, "0")}`,
      date,
      time: "3.00-5.00PM",
      tableNumber: `${Math.floor(Math.random() * 20) + 1}`,
      guestCount: `${Math.floor(Math.random() * 6) + 1}`,
      customer: {
        name: `Customer ${i + 1}`,
        contact: `+88018${Math.floor(Math.random() * 90000000) + 10000000}`,
        address: `Sector ${Math.floor(Math.random() * 15) + 1}, Road ${
          Math.floor(Math.random() * 20) + 1
        }`,
        specialRequest: `Special request ${i + 1}`,
      },
      status: "pending",
    });
  }

  // Generate 20 completed reservations
  for (let i = 0; i < 20; i++) {
    const date = subDays(baseDate, Math.floor(Math.random() * 14));
    reservations.push({
      id: `RSV${(i + 30).toString().padStart(2, "0")}`,
      date,
      time: "3.00-5.00PM",
      tableNumber: `${Math.floor(Math.random() * 20) + 1}`,
      guestCount: `${Math.floor(Math.random() * 6) + 1}`,
      customer: {
        name: `Customer ${i + 21}`,
        contact: `+88018${Math.floor(Math.random() * 90000000) + 10000000}`,
        address: `Sector ${Math.floor(Math.random() * 15) + 1}, Road ${
          Math.floor(Math.random() * 20) + 1
        }`,
        specialRequest: `Special request ${i + 21}`,
      },
      status: "completed",
    });
  }

  return reservations;
};
