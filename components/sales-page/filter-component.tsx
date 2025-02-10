"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { FilterState } from "./types";

interface FilterComponentProps {
  trigger: React.ReactNode;
  onFilterChange: (filter: FilterState) => void;
  align?: "start" | "center" | "end";
  initialFilter?: FilterState;
}

export function FilterComponent({
  trigger,
  onFilterChange,
  align = "end",
  initialFilter,
}: FilterComponentProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>(
    initialFilter || {
      selectedMonths: [],
      customDate: undefined,
    }
  );

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(currentYear, i), "MMM,yyyy"),
    disabled: i > currentMonth,
  }));

  const handleMonthChange = (monthValue: number) => {
    setFilterState((prev) => {
      const newSelectedMonths = prev.selectedMonths.includes(monthValue)
        ? prev.selectedMonths.filter((m) => m !== monthValue)
        : [...prev.selectedMonths, monthValue];
      return {
        ...prev,
        selectedMonths: newSelectedMonths,
        customDate: undefined,
      };
    });
  };

  const handleCustomDateChange = (date: Date | undefined) => {
    setFilterState((prev) => ({
      ...prev,
      customDate: date,
      selectedMonths: [],
    }));
    setCalendarOpen(false);
  };

  const handleSave = () => {
    onFilterChange(filterState);
    setFilterOpen(false);
  };

  return (
    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align={align} className="w-[280px] p-4" sideOffset={8}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-base">Order filter by</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setFilterOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="max-h-[410px] h-[calc(100vh-400px)]">
            <div className="space-y-2.5">
              {months.map((month) => (
                <label
                  key={month.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    disabled={month.disabled}
                    checked={filterState.selectedMonths.includes(month.value)}
                    onCheckedChange={() => handleMonthChange(month.value)}
                  />
                  <span
                    className={cn(month.disabled && "text-muted-foreground")}
                  >
                    {month.label}
                  </span>
                </label>
              ))}
            </div>
          </ScrollArea>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterState.customDate
                  ? format(filterState.customDate, "dd MMM, yyyy")
                  : "Select custom date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filterState.customDate}
                onSelect={handleCustomDateChange}
                disabled={(date) =>
                  date > new Date() || date < new Date(currentYear, 0, 1)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFilterState(
                  initialFilter || { selectedMonths: [], customDate: undefined }
                );
                setCalendarOpen(false);
              }}
            >
              Reset
            </Button>
            <Button variant={"primary"} onClick={handleSave}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
