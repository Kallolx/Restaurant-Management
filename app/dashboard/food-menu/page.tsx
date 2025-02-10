"use client";

import { MenuHeader } from "@/components/food-menu/menu-header";
import { MenuPagination } from "@/components/food-menu/menu-pagination";
import { MenuTable } from "@/components/food-menu/menu-table";
import { AddEditFoodModal } from "@/components/food-menu/modals/add-edit-food-modal";
import { CreateOfferModal } from "@/components/food-menu/modals/create-offer-modal";
import { useAuthState } from "@/services/hooks/use-auth";
import { useFoodCategories } from "@/services/hooks/use-food-categories";
import {
  useCreateFoodMenuItem,
  useDeleteFoodMenuItem,
  useFoodMenu,
  useUpdateFoodMenuItem,
} from "@/services/hooks/use-food-menu";
import {
  useCreateFoodOffer,
  useDeleteFoodOffer,
  useUpdateFoodOffer,
} from "@/services/hooks/use-food-offers";
import { MenuFilters, MenuItem } from "@/types/menu";
import { useCallback, useState } from "react";

export default function FoodMenuPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>();
  const [filters, setFilters] = useState<MenuFilters>({
    priceSort: null,
    categories: [],
    types: [],
  });

  const { data: authData } = useAuthState();
  const { data: categoriesData } = useFoodCategories();
  const { data: menuItems, isLoading: isLoadingMenu } = useFoodMenu(
    authData?.restaurant?.uuid || ""
  );
  const createMenuItem = useCreateFoodMenuItem();
  const updateMenuItem = useUpdateFoodMenuItem();
  const deleteMenuItem = useDeleteFoodMenuItem();
  const createOffer = useCreateFoodOffer();
  const updateOffer = useUpdateFoodOffer();
  const deleteOffer = useDeleteFoodOffer();

  const ITEMS_PER_PAGE = 10;

  const filteredItems = useCallback(() => {
    let result = [...(menuItems || [])];

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
  }, [menuItems, filters]);

  const totalPages = Math.ceil(filteredItems().length / ITEMS_PER_PAGE);

  const paginatedItems = filteredItems().slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddItem = async (data: any) => {
    await createMenuItem.mutateAsync(data);
  };

  const handleEditItem = async (data: any) => {
    if (selectedItem) {
      await updateMenuItem.mutateAsync({ uuid: selectedItem.uuid, data });
    }
  };

  const handleCreateOffer = async (data: any) => {
    if (selectedItem) {
      await createOffer.mutateAsync({ ...data, menu: selectedItem.uuid });
    }
  };

  const handleEditOffer = async (data: any) => {
    if (selectedItem?.current_offer) {
      await updateOffer.mutateAsync({
        uuid: selectedItem.current_offer.uuid!,
        data: { ...data, menu: selectedItem.uuid },
      });
    }
  };

  const handleDeleteOffer = async (item: MenuItem) => {
    if (item.current_offer) {
      await deleteOffer.mutateAsync(item.current_offer.uuid!);
    }
  };

  const handleDeleteItem = async (item: MenuItem) => {
    await deleteMenuItem.mutateAsync(item.uuid);
  };

  const handleModalSubmit = async (data: FormData) => {
    if (selectedItem) {
      await handleEditItem(data);
    } else {
      await handleAddItem(data);
    }
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const handleAddNewItem = () => {
    setSelectedItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleOfferSubmit = async (data: any) => {
    if (selectedItem) {
      if (selectedItem.current_offer) {
        await handleEditOffer(data);
      } else {
        await handleCreateOffer(data);
      }
    }
    setIsOfferModalOpen(false);
    setSelectedItem(undefined);
  };

  const handleCreateOfferClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsOfferModalOpen(true);
  };

  const handleEditOfferClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsOfferModalOpen(true);
  };

  const handleFilterChange = (newFilters: MenuFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="grid h-[calc(100vh-88px)] grid-rows-[auto_1fr]">
      {/* Header */}
      <div className="pb-3">
        <h1 className="text-2xl font-medium">Food Menu</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-white rounded-lg">
        <div className="h-full flex flex-col">
          {/* Menu Controls */}
          <div className="px-4 pt-4">
            <MenuHeader
              categories={categoriesData?.restaurant_categories || []}
              onAddItem={handleAddNewItem}
              onCategoryChange={() => {}}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Scrollable Table */}
          <div className="flex-1 overflow-auto">
            {isLoadingMenu ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">
                  Loading menu items...
                </div>
              </div>
            ) : (
              <MenuTable
                items={paginatedItems || []}
                onEditItem={handleEditItemClick}
                onCreateOffer={handleCreateOfferClick}
                onEditOffer={handleEditOfferClick}
                onDeleteOffer={handleDeleteOffer}
                onDeleteItem={handleDeleteItem}
              />
            )}
          </div>

          {/* Pagination */}
          <div className="py-2.5">
            <MenuPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddEditFoodModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(undefined);
        }}
        onSubmit={handleModalSubmit}
        initialData={selectedItem}
        categories={categoriesData?.restaurant_categories || []}
      />

      <CreateOfferModal
        isOpen={isOfferModalOpen}
        onClose={() => {
          setIsOfferModalOpen(false);
          setSelectedItem(undefined);
        }}
        onSubmit={handleOfferSubmit}
        item={selectedItem}
      />
    </div>
  );
}
