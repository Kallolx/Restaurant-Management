"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = [
  { id: "appetizers", label: "Appetizers" },
  { id: "salads-soups", label: "Salads & Soups" },
  { id: "main-courses", label: "Main Courses" },
  { id: "desserts", label: "Desserts" },
];

interface CategoryFilterProps {
  selected: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const handleToggle = (categoryId: string) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter((id) => id !== categoryId));
    } else {
      onChange([...selected, categoryId]);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={selected.includes(category.id)}
              onCheckedChange={() => handleToggle(category.id)}
            />
            <Label htmlFor={category.id} className="text-sm">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
