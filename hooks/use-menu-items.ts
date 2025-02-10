"use client";

import { generateMockMenuItems } from "@/lib/mock-data";
import { MenuFilters, MenuItem } from "@/types/menu";
import { useCallback, useState } from "react";

export function useMenuItems(currentPage: number) {
  const [items, setItems] = useState<MenuItem[]>(generateMockMenuItems());
  const [filters, setFilters] = useState<MenuFilters>({
    priceSort: null,
    categories: [],
    types: [],
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const filteredItems = useCallback(() => {
    let result = [...items];

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((item) =>
        filters.categories.includes(item.food_category_details.uuid)
      );
    }

    // Apply type filter
    if (filters.types.length > 0) {
      result = result.filter((item) => filters.types.includes(item.type));
    }

    // Apply price sort
    if (filters.priceSort) {
      result.sort((a, b) => {
        const priceA = a.current_offer?.offer_price || a.price;
        const priceB = b.current_offer?.offer_price || b.price;
        return filters.priceSort === "high-to-low"
          ? priceB - priceA
          : priceA - priceB;
      });
    }

    return result;
  }, [items, filters]);

  const handleAddItem = () => {
    // Handled by modal now
    console.log("Add new item");
  };

  const handleEditItem = (item: MenuItem) => {
    // Handled by modal now
    console.log("Edit item:", item);
  };

  const handleCreateOffer = (item: MenuItem) => {
    // Handled by modal now
    console.log("Create offer:", item);
  };

  const handleEditOffer = (item: MenuItem) => {
    // Handled by modal now
    console.log("Edit offer:", item);
  };

  const handleDeleteOffer = (item: MenuItem) => {
    const updatedItems = items.map((i) =>
      i.uuid === item.uuid ? { ...i, current_offer: undefined } : i
    );
    setItems(updatedItems);
  };

  const updateMenuItems = (newItems: MenuItem[]) => {
    setItems(newItems);
  };

  const handleFilterChange = (newFilters: MenuFilters) => {
    setFilters(newFilters);
  };

  // Get paginated items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems().slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    itemsPerPage,
    totalPages,
    handleAddItem,
    handleEditItem,
    handleCreateOffer,
    handleEditOffer,
    handleDeleteOffer,
    updateMenuItems,
    handleFilterChange,
  };
}
