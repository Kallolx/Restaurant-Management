"use client";

import { EmployeeGrid } from "@/components/employee/employee-grid";
import { EmployeeHeader } from "@/components/employee/employee-header";
import { withRBAC } from "@/components/auth/withRBAC";

function EmployeePage() {
  return (
    <div className="h-full space-y-3">
      <h1 className="text-2xl font-medium">Employee</h1>
      <div className="space-y-3 bg-background rounded-lg">
        <EmployeeHeader />
        <EmployeeGrid />
      </div>
    </div>
  );
}

export default withRBAC(EmployeePage, "manager");
