import * as z from "zod";

export const expenseCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  bangla_name: z.string().min(1, "Bangla name is required"),
});

export const expenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  note: z.string().optional(),
  amount: z
    .number({ required_error: "Amount is required" })
    .min(0.01, "Amount must be greater than 0"),
  due_expense: z
    .number()
    .min(0, "Due amount cannot be negative")
    .optional()
    .default(0),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  mode: z.string().min(1, "Payment mode is required"),
});

export type ExpenseCategoryFormValues = z.infer<typeof expenseCategorySchema>;
export type ExpenseFormValues = z.infer<typeof expenseSchema>;
