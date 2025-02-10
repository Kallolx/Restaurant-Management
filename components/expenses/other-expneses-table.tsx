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
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterComponent } from "../sales-page/filter-component";
import { FilterState } from "../sales-page/types";
import { ClearDueConfirmModal } from "./modals/clear-due-confirm-modal";
import { DueCalculateModal } from "./modals/due-calculate-modal";
import { StaffReceiptModal } from "./modals/staff-receipt-modal";
import { OtherExpense } from "./types";

const otherExpenses = [
  { category: "Food", expense: 65000, due: 1000, date: new Date(2024, 0, 15) },
  { category: "Labor", expense: 55000, due: 1000, date: new Date(2024, 0, 15) },
  {
    category: "Utilities",
    expense: 35000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  { category: "Rent", expense: 85000, due: 1000, date: new Date(2024, 0, 15) },
  {
    category: "Supplies",
    expense: 15000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    category: "Beverage",
    expense: 45000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    category: "Equipment",
    expense: 25000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    category: "Others",
    expense: 35000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
];

export function OtherExpensesTable() {
  const [filter, setFilter] = useState<FilterState>({
    selectedMonths: [0],
    customDate: undefined,
  });
  const [selectedExpense, setSelectedExpense] = useState<OtherExpense | null>(
    null
  );
  const [isDueModalOpen, setIsDueModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [expenses, setExpenses] = useState(otherExpenses);

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

  const handleClearClick = (expense: OtherExpense) => {
    setSelectedExpense(expense);
    setIsDueModalOpen(true);
  };

  const handleClearDue = () => {
    setIsDueModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmClear = () => {
    if (selectedExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.category === selectedExpense.category
            ? { ...expense, due: 0 }
            : expense
        )
      );
    }
    setIsConfirmModalOpen(false);
  };

  const handlePrintReceipt = () => {
    setIsDueModalOpen(false);
    setIsReceiptModalOpen(true);
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
          // format(new Date(new Date().getFullYear(), month), "MMMM");
          return `${dateMonth}-${year}`;
        })
        .join(", ");
    }
    return "All time";
  };

  const totalExpenses = filteredExpenses.reduce(
    (acc, curr) => acc + curr.expense,
    0
  );

  return (
    <>
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between border-b p-4">
          <div className="grid gap-1.5">
            <h2 className="text-base font-medium">Other Expenses</h2>
            <div className="text-sm text-muted-foreground">
              Showing data for: {getCurrentFilterDisplay()}
            </div>
          </div>
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

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Expense category</TableHead>
                <TableHead className="text-right">Total expense</TableHead>
                <TableHead className="text-right">Due</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense, index) => (
                <TableRow key={`${expense.category}-${index}`}>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(expense.expense)}
                  </TableCell>
                  <TableCell className="text-right text-red-500">
                    {formatPrice(expense.due)}
                  </TableCell>
                  <TableCell>
                    {expense.due > 0 && (
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
              ))}
              <TableRow className="bg-muted/50 p-4">
                <TableCell colSpan={2} className="font-medium">
                  Total other expenses
                </TableCell>
                <TableCell className="font-medium text-right">
                  {formatPrice(totalExpenses)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
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
            dueAmount={selectedExpense.due}
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
              dueAmount: selectedExpense.due,
              receiptNo: Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0"),
            }}
          />
        </>
      )}
    </>
  );
}
