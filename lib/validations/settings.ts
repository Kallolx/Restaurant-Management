import * as z from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar: z.string().optional(),
});

export const restaurantSettingsSchema = z.object({
  tableCapacity: z.number().min(1, "Table capacity must be at least 1"),
  showName: z.boolean(),
  showLogo: z.boolean(),
  restaurantName: z.string().min(1, "Restaurant name is required").optional(),
  logo: z.string().optional(),
  addTax: z.boolean(),
  taxPercentage: z.number().min(0).max(100).optional(),
  addVat: z.boolean(),
  vatPercentage: z.number().min(0).max(100).optional(),
  menuWallpaper: z.string().optional(),
  textColor: z.string(),
  backgroundOpacity: z.number().min(0).max(100)
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type RestaurantSettingsValues = z.infer<typeof restaurantSettingsSchema>;
