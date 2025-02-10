import * as z from "zod";

export const addFoodItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  type: z.string().min(1, "Type is required"),
  // image: z.string().optional(),
  image: z.union([
    z.string().url("Image must be a valid URL"), // For string URLs
    z
      .instanceof(File)
      .refine((file) => file.size > 0, "Image file cannot be empty"), // For File objects
  ]),
  food_category: z.string().min(1, "Category is required"),
  is_available: z.boolean().default(true),
});

export const addCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  bangla_name: z.string().min(1, "Category bangla name is required"),
});

export type AddFoodItemFormValues = z.infer<typeof addFoodItemSchema>;
export type AddCategoryFormValues = z.infer<typeof addCategorySchema>;
