"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MenuFoodType } from "@/types/menu";

const types = [
  { id: "food", label: "Food" },
  { id: "beverage", label: "Beverage" },
];

interface TypeFilterProps {
  selected: MenuFoodType[];
  onChange: (types: MenuFoodType[]) => void;
}

export function TypeFilter({ selected, onChange }: TypeFilterProps) {
  const handleToggle = (type: MenuFoodType) => {
    if (selected.includes(type)) {
      onChange(selected.filter((t) => t !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">Type</h3>
      <div className="space-y-2">
        {types.map((type) => (
          <div key={type.id} className="flex items-center space-x-2">
            <Checkbox
              id={type.id}
              checked={selected.includes(type.id as MenuFoodType)}
              onCheckedChange={() => handleToggle(type.id as MenuFoodType)}
            />
            <Label htmlFor={type.id} className="text-sm">
              {type.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
