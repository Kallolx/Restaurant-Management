"use client";

import { ExpensesTable } from "@/components/expenses/expenses-table";
import { OtherExpensesTable } from "@/components/expenses/other-expneses-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExpensesDashboard() {
  const navigation = useRouter();
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center">
        <Button
          onClick={() => {
            navigation.back();
          }}
          variant="ghost"
          size="default"
          className="ml-0 pl-0"
        >
          <ArrowLeft className="h-6 w-6" />
          <h1 className="text-xl font-medium">Expenses</h1>
        </Button>
      </header>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 pt-3 auto-rows-auto items-start">
        <ExpensesTable />
        <OtherExpensesTable />
      </div>
    </div>
  );
}
