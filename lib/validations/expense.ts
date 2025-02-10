import * as z from "zod";

export const expenseCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  bangla_name: z.string().min(1, "Bangla name is required"),
});

export const expenseSchema = z.object({
  expense_category: z.string().min(1, "Category is required"),
  amount: z.number().min(0, "Amount must be positive"),
  due_expense: z.number().min(0, "Due amount must be positive"),
  date: z.date({
    required_error: "Date is required",
  }),
  description: z.string().min(1, "Description is required"),
  note: z.string().optional(),
  mode: z.enum(["cash", "credit"], {
    required_error: "Payment mode is required",
  }),
});

export type ExpenseCategoryFormValues = z.infer<typeof expenseCategorySchema>;
export type ExpenseFormValues = z.infer<typeof expenseSchema>;
