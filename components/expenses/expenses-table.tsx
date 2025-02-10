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
import { Expense } from "./types";

const salaryExpenses = [
  {
    name: "Shafik hasan",
    role: "Waiter",
    salary: 5000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    name: "Raqibul islam",
    role: "Waiter",
    salary: 5000,
    due: 1000,
    date: new Date(2024, 1, 25),
  },
  {
    name: "Monir hossen",
    role: "Chef",
    salary: 15000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    name: "Sajid sarker",
    role: "Waiter",
    salary: 9000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    name: "Hriday ahamad",
    role: "Chef",
    salary: 12000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    name: "Sagor khan",
    role: "Chef",
    salary: 10000,
    due: 1000,
    date: new Date(2024, 1, 15),
  },
  {
    name: "Nazrul islam",
    role: "Waiter",
    salary: 5000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    name: "Sohel rana",
    role: "Chef",
    salary: 5000,
    due: 1000,
    date: new Date(2024, 2, 15),
  },
  {
    name: "Tanvir hasan",
    role: "Waiter",
    salary: 5000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    name: "Santo ahamad",
    role: "Waiter",
    salary: 5000,
    due: 1000,
    date: new Date(2024, 0, 15),
  },
  {
    name: "Yosuf khan",
    role: "Waiter",
    salary: 5000,
    due: 1000,
    date: new Date(2024, 2, 15),
  },
  {
    name: "Sajjat hossen",
    role: "Waiter",
    salary: 5000,
    due: 1000,
    date: new Date(2024, 2, 15),
  },
];

export function ExpensesTable() {
  const [filter, setFilter] = useState<FilterState>({
    selectedMonths: [0],
    customDate: undefined,
  });
  const [selectedEmployee, setSelectedEmployee] = useState<Expense | null>(
    null
  );
  const [isDueModalOpen, setIsDueModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [expenses, setExpenses] = useState(salaryExpenses);

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

  const handleClearClick = (employee: Expense) => {
    setSelectedEmployee(employee);
    setIsDueModalOpen(true);
  };

  const handleClearDue = () => {
    setIsDueModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmClear = () => {
    if (selectedEmployee) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.name === selectedEmployee.name
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
    console.log(filter);
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

  const totalSalary = filteredExpenses.reduce(
    (acc, curr) => acc + curr.salary,
    0
  );

  return (
    <>
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between border-b p-4">
          <div className="grid gap-1.5">
            <h2 className="text-base font-medium">Salary Expenses</h2>
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
                <TableHead>Employee name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead className="text-right">Due</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.name}>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>{expense.role}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(expense.salary)}
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
                  Total salary expenses
                </TableCell>
                <TableCell className="font-medium text-right">
                  {formatPrice(totalSalary)}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedEmployee && (
        <>
          <DueCalculateModal
            isOpen={isDueModalOpen}
            onClose={() => setIsDueModalOpen(false)}
            onClearDue={handleClearDue}
            onPrintReceipt={handlePrintReceipt}
            dueAmount={selectedEmployee.due}
            dueDate={selectedEmployee.date}
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
              employeeName: selectedEmployee.name,
              role: selectedEmployee.role,
              dueAmount: selectedEmployee.due,
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
