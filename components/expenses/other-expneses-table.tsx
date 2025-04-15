"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { format, isSameDay, isSameMonth } from "date-fns";
import { Loader2, Plus, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FilterComponent } from "../sales-page/filter-component";
import { FilterState } from "../sales-page/types";
import { ClearDueConfirmModal } from "./modals/clear-due-confirm-modal";
import { DueCalculateModal } from "./modals/due-calculate-modal";
import { StaffReceiptModal } from "./modals/staff-receipt-modal";
import { AddExpenseModal } from "./modals/add-expense-modal";
import { fetchExpenses, createExpense } from "@/services/api/expense";
import { Expense } from "@/types/expense";
import { useToast } from "@/hooks/use-toast";

export function OtherExpensesTable() {
  const [filter, setFilter] = useState<FilterState>({
    selectedMonths: [0],
    customDate: undefined,
  });
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDueModalOpen, setIsDueModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch expenses from API
  useEffect(() => {
    const getExpenses = async () => {
      try {
        setIsLoading(true);
        const data = await fetchExpenses();
        setExpenses(data);
        
        toast({
          title: "Expenses Loaded",
          description: `${data.length} expenses retrieved successfully.`,
        });
      } catch (error: any) {
        console.error("Failed to fetch expenses:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Could not fetch expenses. Please try again later.",
        });
        // Fallback to empty array if API fails
        setExpenses([]);
      } finally {
        setIsLoading(false);
      }
    };

    getExpenses();
  }, [toast]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (filter.customDate) {
        return isSameDay(expense.date, filter.customDate);
      } else if (filter.selectedMonths.length > 0) {
        return filter.selectedMonths.some((month) =>
          isSameMonth(expense.date, new Date(expense.date.getFullYear(), month))
        );
      }
      return true;
    });
  }, [filter, expenses]);

  const handleClearClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDueModalOpen(true);
  };

  const handleClearDue = () => {
    setIsDueModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmClear = () => {
    if (selectedExpense) {
      // Here you would update the expense in the API
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === selectedExpense.id
            ? { ...expense, dueAmount: 0 }
            : expense
        )
      );
      
      toast({
        title: "Success",
        description: "Due amount has been cleared.",
      });
    }
    setIsConfirmModalOpen(false);
  };

  const handlePrintReceipt = () => {
    setIsDueModalOpen(false);
    setIsReceiptModalOpen(true);
  };

  const handleAddExpense = async (expenseData: any) => {
    try {
      const newExpense = await createExpense(expenseData);
      setExpenses((prev) => [newExpense, ...prev]);
      
      toast({
        title: "Expense Added",
        description: `New expense for ${newExpense.category} added successfully.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add expense. Please try again.",
      });
    }
  };

  const getCurrentFilterDisplay = () => {
    if (filter.customDate) {
      return format(filter.customDate, "dd MMM, yyyy");
    }
    if (filter.selectedMonths.length > 0) {
      return filter.selectedMonths
        .map((month) => {
          const formedDate = new Date(new Date().getFullYear(), month);
          const year = format(formedDate, "yy");
          const dateMonth = format(formedDate, "MMMM");
          return `${dateMonth}-${year}`;
        })
        .join(", ");
    }
    return "All time";
  };

  const totalExpenses = filteredExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-2 text-lg">Loading expenses...</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between border-b p-4">
          <div className="grid gap-1.5">
            <h2 className="text-base font-medium">Expenses</h2>
            <div className="text-sm text-muted-foreground">
              Showing data for: {getCurrentFilterDisplay()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
            <FilterComponent
              trigger={
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              }
              onFilterChange={setFilter}
              initialFilter={{ selectedMonths: [0], customDate: undefined }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Due</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{format(expense.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{expense.note || "-"}</TableCell>
                    <TableCell className="capitalize">{expense.paymentMode}</TableCell>
                    <TableCell className="text-right">
                      {formatPrice(expense.amount)}
                    </TableCell>
                    <TableCell className="text-right text-red-500">
                      {formatPrice(expense.dueAmount || 0)}
                    </TableCell>
                    <TableCell>
                      {(expense.dueAmount || 0) > 0 && (
                        <Button
                          variant="link"
                          className="h-auto p-0 text-blue-500"
                          size="sm"
                          onClick={() => handleClearClick(expense)}
                        >
                          Clear
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No expenses found. Add an expense to get started.
                  </TableCell>
                </TableRow>
              )}
              {filteredExpenses.length > 0 && (
                <TableRow className="bg-muted/50 p-4">
                  <TableCell colSpan={4} className="font-medium">
                    Total expenses
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    {formatPrice(totalExpenses)}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedExpense && (
        <>
          <DueCalculateModal
            isOpen={isDueModalOpen}
            onClose={() => setIsDueModalOpen(false)}
            onClearDue={handleClearDue}
            onPrintReceipt={handlePrintReceipt}
            dueAmount={selectedExpense.dueAmount || 0}
            dueDate={selectedExpense.date}
          />

          <ClearDueConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmClear}
          />

          <StaffReceiptModal
            isOpen={isReceiptModalOpen}
            onClose={() => setIsReceiptModalOpen(false)}
            data={{
              employeeName: selectedExpense.category,
              role: "Expense",
              dueAmount: selectedExpense.dueAmount || 0,
              receiptNo: Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0"),
            }}
          />
        </>
      )}

      <AddExpenseModal
        open={isAddExpenseModalOpen}
        onOpenChange={setIsAddExpenseModalOpen}
        onSubmit={handleAddExpense}
      />
    </>
  );
}
