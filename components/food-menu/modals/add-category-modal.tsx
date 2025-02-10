"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { addCategorySchema } from "@/lib/validations/food-menu";
import {
  useCreateFoodCategory,
  useUpdateFoodCategory,
} from "@/services/hooks/use-food-categories";
import { Category } from "@/types/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Category;
}

export function AddCategoryModal({
  isOpen,
  onClose,
  initialData,
}: AddCategoryModalProps) {
  const { mutate: createCategory, isPending: isCreating } =
    useCreateFoodCategory();
  const { mutate: updateCategory, isPending: isUpdating } =
    useUpdateFoodCategory();

  const isLoading = isCreating || isUpdating;

  const form = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: initialData?.name || "",
      bangla_name: initialData?.bangla_name || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        bangla_name: initialData.bangla_name,
      });
    } else {
      form.reset({
        name: "",
        bangla_name: "",
      });
    }
  }, [initialData, form]);

  const onSubmit = (data: { name: string; bangla_name: string }) => {
    if (initialData) {
      updateCategory({
        uuid: initialData.uuid,
        data,
      });
    } else {
      createCategory(data);
    }

    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {initialData ? "Edit Food Category" : "Add Food Category"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food category</FormLabel>
                  <FormControl>
                    <Input placeholder="ex-Soft drinks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bangla_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In Bangla</FormLabel>
                  <FormControl>
                    <Input placeholder="বাংলা নাম" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
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
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
