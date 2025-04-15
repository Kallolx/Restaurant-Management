export type ExpensePaymentMode = "cash" | "credit";

export interface ExpenseCategoryRequest {
  name: string;
  bangla_name: string;
}

export interface ExpenseCategory extends ExpenseCategoryRequest {
  uuid: string;
}

export interface ExpenseRequest {
  expense_category: string;
  amount: number;
  due_expense: number;
  date: string;
  description: string;
  note?: string;
  mode: ExpensePaymentMode;
}

export interface ExpenseType extends Omit<ExpenseRequest, "expense_category"> {
  uuid: string;
  category_name: string;
  category_bangla_name: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  category: string;
  categoryBangla?: string;
  note: string;
  amount: number;
  dueAmount?: number;
  date: Date;
  description: string;
  paymentMode: "cash" | "card" | "digital" | string;
  createdAt: Date;
  updatedAt: Date;
}

export type ExpenseFormValues = {
  category: string;
  note: string;
  amount: number;
  due_expense?: number;
  date: string;
  description: string;
  mode: string;
};
