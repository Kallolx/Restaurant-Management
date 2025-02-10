import * as z from "zod";

export const offerSchema = z.object({
  // actualPrice: z.number().min(0, "Price must be greater than 0"),
  offer_price: z.number().min(0, "Offer price must be greater than 0"),
  offer_percentage: z
    .number()
    .min(1, "Percentage must be between 1-100")
    .max(100, "Percentage must be between 1-100"),
  expiry_time: z.string().min(1, "Expire time is required"),
  expiry_date: z.string().min(1, "Expire date is required"),
});

export type OfferFormValues = z.infer<typeof offerSchema>;
