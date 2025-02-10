"use client";

import { Label } from "@/components/ui/label";
import { PopoverColorPicker } from "@/components/ui/popover-color-picker";
import { cn } from "@/lib/utils";
import type { ColorOption } from "@/types/settings";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const predefinedColors: ColorOption[] = [
  { id: "white", value: "#FFFFFF", label: "White" },
  { id: "black", value: "#000000", label: "Black" },
  { id: "red", value: "#FF0000", label: "Red" },
  { id: "green", value: "#00FF00", label: "Green" },
  { id: "blue", value: "#0000FF", label: "Blue" },
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="grid gap-4">
      <Label>Select text color</Label>
      <div className="flex flex-wrap gap-2">
        {predefinedColors.map(({ value: presetColor }) => (
          <Button
            key={presetColor}
            variant="outline"
            className="w-8 h-8 p-0 rounded-sm"
            style={{ backgroundColor: presetColor }}
            onClick={() => onChange(presetColor)}
          >
            {presetColor === value && (
              <Check
                className={cn("w-4 h-4 text-white", {
                  "text-black": value.toLowerCase() === "#ffffff",
                })}
              />
            )}
            <span className="sr-only">Pick {presetColor} color</span>
          </Button>
        ))}

        <div className="flex items-center gap-1.5">
          <span className="font-medium text-sm">Custom</span>
          <PopoverColorPicker
            color={value}
            onChange={onChange}
            presetColors={predefinedColors.map((color) => color.value)}
          />
        </div>
      </div>
    </div>
  );
}
