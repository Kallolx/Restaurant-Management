"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useCallback, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface PopoverColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  presetColors: string[];
}

export function PopoverColorPicker({
  color,
  onChange,
  presetColors,
}: PopoverColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback(
    (newColor: string) => {
      onChange(newColor);
    },
    [onChange]
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-8 h-8 p-0 border-2"
          style={{ backgroundColor: color }}
        >
          {presetColors.indexOf(color) === -1 && (
            <Check
              className={cn("w-4 h-4 text-white", {
                "text-black": color.toLowerCase() === "#ffffff",
              })}
            />
          )}
          <span className="sr-only">Pick a color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-3">
        <HexColorPicker
          color={color}
          onChange={handleChange}
          className="mb-3"
        />
        <div className="flex flex-wrap gap-2 mb-3">
          {presetColors.map((presetColor) => (
            <Button
              key={presetColor}
              variant="outline"
              className="w-6 h-6 p-0 rounded-md"
              style={{ backgroundColor: presetColor }}
              onClick={() => handleChange(presetColor)}
            >
              {presetColor === color && (
                <Check className="w-4 h-4 text-white" />
              )}
              <span className="sr-only">Pick {presetColor} color</span>
            </Button>
          ))}
        </div>
        <HexColorInput
          color={color}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
}
