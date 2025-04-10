"use client";

import React from "react";
import { useState } from "react";
import { apiClient } from "@/services/apiClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface MenuItem {
  uuid: string;
  food_category: string;
  name: string;
  price: number;
  description: string;
  is_available: boolean;
  type: "food" | "drinks";
  image?: string;
}

interface MenuItemFormData {
  food_category: string;
  name: string;
  price: number;
  description: string;
  is_available: boolean;
  type: "food" | "drinks";
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hishabx.io/api";

export default function MenuManagementPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuItemFormData>({
    food_category: "",
    name: "",
    price: 0,
    description: "",
    is_available: true,
    type: "food",
  });

  // Fetch menu items
  const { data: menuItems = [], isLoading, error: fetchError } = useQuery<MenuItem[], AxiosError>({
    queryKey: ["menu-items"],
    queryFn: async () => {
      try {
        // Remove duplicate /api/ prefix
        const response = await apiClient.get("/menu-management/");
        console.log("Menu items response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
      }
    },
    // Refresh data every 30 seconds
    refetchInterval: 30000,
  });

  // Group menu items by type
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const type = item.type || 'food';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Create menu item mutation
  const createMenuItem = useMutation({
    mutationFn: async (data: MenuItemFormData) => {
      try {
        console.log("Creating menu item with data:", data);
        const response = await apiClient.post("/menu-management/", {
          food_category: data.food_category,
          name: data.name,
          price: Number(data.price),
          description: data.description,
          is_available: data.is_available,
          type: data.type,
        });
        console.log("Create response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating menu item:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      setIsAddModalOpen(false);
      setFormData({
        food_category: "",
        name: "",
        price: 0,
        description: "",
        is_available: true,
        type: "food",
      });
      toast({
        title: "Success",
        description: "Menu item created successfully",
      });
    },
    onError: (error: AxiosError) => {
      console.error("Create menu item error:", error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create menu item",
        variant: "destructive",
      });
    },
  });

  // Edit menu item mutation
  const editMenuItem = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: MenuItemFormData }) => {
      try {
        console.log("Editing menu item:", id, "with data:", data);
        const response = await apiClient.put(`/menu-management/${id}/`, {
          food_category: data.food_category,
          name: data.name,
          price: Number(data.price),
          description: data.description,
          is_available: data.is_available,
          type: data.type,
        });
        console.log("Edit response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error updating menu item:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      setIsEditModalOpen(false);
      setSelectedItem(null);
      setFormData({
        food_category: "",
        name: "",
        price: 0,
        description: "",
        is_available: true,
        type: "food",
      });
      toast({
        title: "Success",
        description: "Menu item updated successfully",
      });
    },
    onError: (error: AxiosError) => {
      console.error("Update menu item error:", error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update menu item",
        variant: "destructive",
      });
    },
  });

  // Delete menu item mutation
  const deleteMenuItem = useMutation({
    mutationFn: async (id: string) => {
      try {
        console.log("Deleting menu item:", id);
        const response = await apiClient.delete(`/menu-management/${id}/`);
        console.log("Delete response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error deleting menu item:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      });
    },
    onError: (error: AxiosError) => {
      console.error("Delete menu item error:", error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete menu item",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.food_category) {
      toast({
        title: "Error",
        description: "Food category is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    if (formData.price <= 0) {
      toast({
        title: "Error",
        description: "Price must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    if (selectedItem) {
      editMenuItem.mutate({ id: selectedItem.uuid, data: formData });
    } else {
      createMenuItem.mutate(formData);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData({
      food_category: item.food_category,
      name: item.name,
      price: item.price,
      description: item.description,
      is_available: item.is_available,
      type: item.type,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMenuItem.mutate(id);
    }
  };

  if (fetchError) {
    return (
      <div className="p-6">
        <div className="text-red-600">
          <h2 className="text-lg font-semibold mb-2">Error Loading Menu Items</h2>
          <p>{(fetchError as AxiosError).message}</p>
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ["menu-items"] })}
            variant="outline"
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Menu Item</Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading menu items...</span>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No menu items found</p>
          <Button onClick={() => setIsAddModalOpen(true)}>Add Your First Menu Item</Button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Food Items Section */}
          {groupedMenuItems['food'] && groupedMenuItems['food'].length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Food Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedMenuItems['food'].map((item) => (
                  <div
                    key={item.uuid}
                    className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    {item.image && (
                      <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <span className="text-xs text-gray-500">Category: {item.food_category}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="hover:bg-gray-100"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.uuid)}
                          className="hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-lg">৳{item.price.toLocaleString()}</span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          item.is_available 
                            ? "bg-green-50 text-green-600" 
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {item.is_available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drinks Section */}
          {groupedMenuItems['drinks'] && groupedMenuItems['drinks'].length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Drinks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedMenuItems['drinks'].map((item) => (
                  <div
                    key={item.uuid}
                    className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    {item.image && (
                      <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <span className="text-xs text-gray-500">Category: {item.food_category}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="hover:bg-gray-100"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.uuid)}
                          className="hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-lg">৳{item.price.toLocaleString()}</span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          item.is_available 
                            ? "bg-green-50 text-green-600" 
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {item.is_available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog
        open={isAddModalOpen || isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedItem(null);
            setFormData({
              food_category: "",
              name: "",
              price: 0,
              description: "",
              is_available: true,
              type: "food",
            });
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? "Edit Menu Item" : "Add Menu Item"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Category ID</label>
              <Input
                value={formData.food_category}
                onChange={(e) =>
                  setFormData({ ...formData, food_category: e.target.value })
                }
                placeholder="e.g., f0f2d2d1-7c1e-4f94-b780-cb0dd48d8c49"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Price</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Available</label>
              <input
                type="checkbox"
                checked={formData.is_available}
                onChange={(e) =>
                  setFormData({ ...formData, is_available: e.target.checked })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as "food" | "drinks",
                  })
                }
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="food">Food</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={createMenuItem.isPending || editMenuItem.isPending}
            >
              {(createMenuItem.isPending || editMenuItem.isPending) ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {selectedItem ? "Updating..." : "Creating..."}
                </>
              ) : (
                selectedItem ? "Update" : "Create"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}