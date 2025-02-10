"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PriceFilterProps {
  value: "high-to-low" | "low-to-high" | null;
  onChange: (value: "high-to-low" | "low-to-high" | null) => void;
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">Price</h3>
      <RadioGroup
        value={value || ""}
        onValueChange={(val) =>
          onChange(val as "high-to-low" | "low-to-high" | null)
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high-to-low" id="high-to-low" />
          <Label htmlFor="high-to-low" className="text-sm">
            High to low
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low-to-high" id="low-to-high" />
          <Label htmlFor="low-to-high" className="text-sm">
            Low to high
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
