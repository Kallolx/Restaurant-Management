"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, MenuFilters } from "@/types/menu";
import { Pencil, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { MenuFilterPopover } from "./filter/menu-filter-popup";
import { AddCategoryModal } from "./modals/add-category-modal";

interface MenuHeaderProps {
  categories: Category[];
  onAddItem: () => void;
  onCategoryChange: (value: string) => void;
  onFilterChange: (filters: MenuFilters) => void;
}

export function MenuHeader({
  categories,
  onAddItem,
  onCategoryChange,
  onFilterChange,
}: MenuHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);

  const handleEditClick = (e: React.MouseEvent, category: Category) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-medium">Restaurant Food Item list</h2>
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={onAddItem} variant="primary">
          Add New Food Item
        </Button>
        <div className="relative w-full sm:w-[180px]">
          <Select
            open={isCategorySelectOpen}
            onOpenChange={setIsCategorySelectOpen}
          >
            <SelectTrigger>
              <SelectValue placeholder="Edit Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <div
                    key={category.uuid}
                    className="relative flex items-center px-2 py-1.5"
                    role="option"
                    aria-selected={false}
                  >
                    <span className="flex-1 truncate">{category.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-7 w-7"
                      onClick={(e) => {
                        handleEditClick(e, category);
                        setIsCategorySelectOpen(false);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <MenuFilterPopover
          trigger={
            <Button variant="outline" size="icon" className="">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          }
          onApplyFilters={onFilterChange}
        />
      </div>

      <AddCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategory(undefined);
        }}
        initialData={selectedCategory}
      />
    </div>
  );
}
