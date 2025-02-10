"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AddFoodItemFormValues,
  addFoodItemSchema,
} from "@/lib/validations/food-menu";
import { Category, MenuItem } from "@/types/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddCategoryModal } from "./add-category-modal";
import { ImageUpload } from "./image-upload";

interface AddEditFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: MenuItem;
  categories: Category[];
}

export function AddEditFoodModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
}: AddEditFoodModalProps) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [imageState, setImageState] = useState<File | string>();

  const form = useForm<AddFoodItemFormValues>({
    resolver: zodResolver(addFoodItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      type: "",
      image: "",
      food_category: "",
      is_available: true,
    },
  });

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          description: initialData.description,
          price: initialData.price.toString(),
          type: initialData.type,
          image: initialData.image || "",
          food_category: initialData.food_category_details.uuid,
          is_available: initialData.is_available,
        });
      } else {
        form.reset({
          name: "",
          description: "",
          price: "",
          type: "",
          image: "",
          food_category: "",
          is_available: true,
        });
      }
    }
  }, [isOpen, initialData, form]);

  const handleImageChange = (value: string | File) => {
    setImageState(value);
    form.setValue("image", value);
  };

  const handleSubmit = (data: AddFoodItemFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("type", data.type);
    formData.append("food_category", data.food_category);
    formData.append("is_available", data.is_available.toString());

    if (imageState && imageState instanceof File) {
      formData.append("image", imageState);
    }
    // Properly log all the FormData entries
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    onSubmit(formData);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[800px] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-bold">
              {initialData ? "Edit Food Item" : "Add Food Item"}
            </DialogTitle>
            <DialogDescription className="mt-1.5">
              Fill up the form below to {initialData ? "edit" : "add"} a food
              item & add it to the &quot;Food Menu&quot;
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col h-full"
            >
              <div className="flex-1 overflow-y-auto px-6 py-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUpload
                            isFile={true}
                            value={field.value}
                            onChange={handleImageChange}
                            onRemove={() => form.setValue("image", "")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item name</FormLabel>
                        <FormControl>
                          <Input placeholder="ex-Grilled Chicken" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex-Grilled chicken breast with vegetables"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="ex-324.99"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <select
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                              {...field}
                            >
                              <option value="">Select type</option>
                              <option value="food">Food</option>
                              <option value="beverage">Beverage</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="food_category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food category</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex flex-wrap gap-4">
                              {categories.map((category: Category) => (
                                <FormItem
                                  key={category.uuid}
                                  className="flex items-center space-y-0 space-x-2"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={category.uuid} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {category.name}
                                  </FormLabel>
                                </FormItem>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="gap-1 text-blue-500"
                                onClick={() => setIsCategoryModalOpen(true)}
                              >
                                <Plus className="h-4 w-4" />
                                Add Category
                              </Button>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_available"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(value === "true")
                            }
                            defaultValue={field.value ? "true" : "false"}
                            className="flex gap-4"
                          >
                            <FormItem className="flex items-center space-y-0 space-x-2">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Available
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-2">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Unavailable
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 border-t p-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  {initialData ? "Save Changes" : "Add Item"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </>
  );
}
