import * as z from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  phone: z.string().regex(/^(\+88)?01[0-9]{9}$/, "Invalid Bangladeshi phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  avatar: z.string().optional(),
});

export const restaurantSettingsSchema = z.object({
  tableCapacity: z.number().min(1, "Table capacity must be at least 1"),
  showName: z.boolean(),
  showLogo: z.boolean(),
  restaurantName: z
    .string()
    .min(2, "Restaurant name must be at least 2 characters"),
  logo: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type RestaurantSettingsValues = z.infer<typeof restaurantSettingsSchema>;
