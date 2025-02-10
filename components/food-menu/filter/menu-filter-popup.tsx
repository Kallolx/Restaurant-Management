"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MenuFilters } from "@/types/menu";
import { X } from "lucide-react";
import { useState } from "react";
import { CategoryFilter } from "./category-filter";
import { PriceFilter } from "./price-filter";
import { TypeFilter } from "./type-filter";

interface MenuFilterPopoverProps {
  trigger: React.ReactNode;
  onApplyFilters: (filters: MenuFilters) => void;
  align?: "start" | "center" | "end";
}

export function MenuFilterPopover({
  trigger,
  onApplyFilters,
  align = "end",
}: MenuFilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<MenuFilters>({
    priceSort: null,
    categories: [],
    types: [],
  });

  const handleSave = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      priceSort: null,
      categories: [],
      types: [],
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
            <h3 className="font-medium text-base">Food menu filter by</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="px-4 py-1.5 max-h-[380px] h-[calc(100vh-330px)]">
            <div className="space-y-3">
              <PriceFilter
                value={filters.priceSort}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, priceSort: value }))
                }
              />

              <div className="h-px bg-border" />

              <CategoryFilter
                selected={filters.categories}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, categories: value }))
                }
              />

              <div className="h-px bg-border" />

              <TypeFilter
                selected={filters.types}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, types: value }))
                }
              />
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-2 p-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Reset
            </Button>
            <Button
              onClick={handleSave}
              className={cn(
                "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                "hover:from-blue-600 hover:to-purple-600"
              )}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
