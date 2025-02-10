"use client";

import { Button } from "@/components/ui/button";

interface QuickFilterProps {
  value: number | null;
  onChange: (days: number | null) => void;
}

export function QuickFilter({ value, onChange }: QuickFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={value === 7 ? "default" : "outline"}
        size="sm"
        className="whitespace-nowrap"
        onClick={() => onChange(value === 7 ? null : 7)}
      >
        Last 7 days
      </Button>
      <Button
        variant={value === 30 ? "default" : "outline"}
        size="sm"
        className="whitespace-nowrap"
        onClick={() => onChange(value === 30 ? null : 30)}
      >
        Last 30 days
      </Button>
    </div>
  );
}
