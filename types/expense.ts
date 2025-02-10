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
