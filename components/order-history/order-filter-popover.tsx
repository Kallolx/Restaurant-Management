"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";

interface OrderFilterPopoverProps {
  trigger: React.ReactNode;
  filterType: string;
  customDate: Date | undefined;
  onFilterTypeChange: (value: string) => void;
  onCustomDateChange: (date: Date | undefined) => void;
}

export function OrderFilterPopover({
  trigger,
  filterType,
  customDate,
  onFilterTypeChange,
  onCustomDateChange,
}: OrderFilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilterType, setTempFilterType] = useState(filterType);
  const [tempCustomDate, setTempCustomDate] = useState<Date | undefined>(
    customDate
  );

  const handleSave = () => {
    onFilterTypeChange(tempFilterType);
    onCustomDateChange(tempCustomDate);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempFilterType("all");
    setTempCustomDate(undefined);
    onFilterTypeChange("all");
    onCustomDateChange(undefined);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-[280px] p-4" sideOffset={8}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-base">Order filter by</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <RadioGroup
            value={tempFilterType}
            onValueChange={setTempFilterType}
            className="space-y-2.5"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All orders</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dine-in" id="dine-in" />
              <Label htmlFor="dine-in">Dine in orders</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="takeaway" id="takeaway" />
              <Label htmlFor="takeaway">Takeaway orders</Label>
            </div>
          </RadioGroup>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {tempCustomDate
                  ? format(tempCustomDate, "dd MMM, yyyy")
                  : "Select custom date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={tempCustomDate}
                onSelect={setTempCustomDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleSave}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
