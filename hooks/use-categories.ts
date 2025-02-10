"use client";

import { generateMockCategories } from "@/lib/mock-data";
import { Category } from "@/types/menu";
import { useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(
    generateMockCategories()
  );

  const handleCategoryChange = (categoryId: string) => {
    // This function is now only used for internal state management
    console.log("Category selected:", categoryId);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.uuid === updatedCategory.uuid ? updatedCategory : category
      )
    );
  };

  return {
    categories,
    handleCategoryChange,
    handleUpdateCategory,
  };
}
