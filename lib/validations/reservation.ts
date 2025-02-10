import * as z from "zod";

export const addReservationSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  reservationNo: z.string().min(1, "Reservation number is required"),
  tableNo: z.string().min(1, "Table number is required"),
  guestCount: z.string().min(1, "Guest count is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerContact: z.string().min(1, "Contact information is required"),
  customerAddress: z.string().min(1, "Address is required"),
  specialRequest: z.string().optional(),
});

export type AddReservationInput = z.infer<typeof addReservationSchema>;
