"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subDays, subMonths } from "date-fns";
import { useEffect, useState } from "react";
export interface TimeRange {
  from: Date;
  to: Date;
}
interface TimeRangeSelectProps {
  onChange: (range: TimeRange) => void;
}

export function TimeRangeSelect({ onChange }: TimeRangeSelectProps) {
  const [selectedRange, setSelectedRange] = useState("7days");

  useEffect(() => {
    let from: Date;
    const to: Date = new Date();

    switch (selectedRange) {
      case "7days":
        from = subDays(to, 7);
        break;
      case "30days":
        from = subDays(to, 30);
        break;
      case "90days":
        from = subDays(to, 90);
        break;
      case "12months":
        from = subMonths(to, 12);
        break;
      default:
        from = subDays(to, 7);
    }

    onChange({ from, to });
  }, [selectedRange]);

  return (
    <Select defaultValue="7days" onValueChange={setSelectedRange}>
      <SelectTrigger className="w-max max-w-48 min-w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="30days">Last 30 days</SelectItem>
        <SelectItem value="90days">Last 90 days</SelectItem>
        <SelectItem value="12months">Last 12 months</SelectItem>
      </SelectContent>
    </Select>
  );
}
