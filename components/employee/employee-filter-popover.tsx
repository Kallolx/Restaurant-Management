"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { useState } from "react";

interface EmployeeFilters {
  status: string[];
}

interface EmployeeFilterPopoverProps {
  trigger: React.ReactNode;
  onApplyFilters: (filters: EmployeeFilters) => void;
  align?: "start" | "center" | "end";
}

export function EmployeeFilterPopover({
  trigger,
  onApplyFilters,
  align = "end",
}: EmployeeFilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<EmployeeFilters>({
    status: [],
  });

  const statusOptions = [
    { label: "Regular", value: "Regular" },
    { label: "Irregular", value: "Irregular" },
    { label: "On leave", value: "On Leave" },
  ];

  const handleStatusChange = (value: string) => {
    setFilters((prev) => {
      const currentStatus = prev.status;
      const updatedStatus = currentStatus.includes(value)
        ? currentStatus.filter((s) => s !== value)
        : [...currentStatus, value];

      return {
        ...prev,
        status: updatedStatus,
      };
    });
  };

  const handleSave = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      status: [],
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align={align} className="w-[280px] p-0" sideOffset={8}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-medium text-base">Filter by</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="px-4 py-3 ">
            <div className="space-y-4">
              {statusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={filters.status.includes(option.value)}
                    onCheckedChange={() => handleStatusChange(option.value)}
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-2 p-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} variant={"primary"}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
