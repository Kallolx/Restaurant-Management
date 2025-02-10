export interface Expense {
  name: string;
  role: string;
  salary: number;
  due: number;
  date: Date;
}

export interface OtherExpense {
  category: string;
  expense: number;
  due: number;
  date: Date;
}
