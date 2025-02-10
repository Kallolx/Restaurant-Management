"use client";

import { Button } from "@/components/ui/button";
import { Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { AddEditEmployeeModal } from "./add-edit-employee-modal";
import { EmployeeFilterPopover } from "./employee-filter-popover";

export function EmployeeHeader() {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleApplyFilters = (filters: { status: string[] }) => {
    console.log("Applied filters:", filters);
    // Handle filtering logic here
  };

  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <h1 className="text-xl font-medium">Employee List</h1>

      <div className="flex items-center gap-3">
        <Button onClick={() => setShowAddModal(true)} variant="primary">
          <Plus className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
        <EmployeeFilterPopover
          trigger={
            <Button variant="outline" size="icon" className="">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          }
          onApplyFilters={handleApplyFilters}
        />
      </div>

      <AddEditEmployeeModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
}
