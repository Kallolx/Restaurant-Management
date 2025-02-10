"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { mockEmployees } from "@/lib/constants/employee-data";
import { EmployeeCard } from "./employee-card";

export function EmployeeGrid() {
  return (
    <ScrollArea className="h-[calc(100vh-210px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {mockEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </ScrollArea>
  );
}
