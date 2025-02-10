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
import {
  expenseCategorySchema,
  type ExpenseCategoryFormValues,
} from "@/lib/validations/expense";
import type { ExpenseCategory, ExpenseCategoryRequest } from "@/types/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (category: ExpenseCategoryRequest) => void;
  editCategory?: ExpenseCategory;
}

export function AddCategoryModal({
  open,
  onOpenChange,
  onSave,
  editCategory,
}: AddCategoryModalProps) {
  const form = useForm<ExpenseCategoryFormValues>({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues: {
      name: "",
      bangla_name: "",
    },
  });

  useEffect(() => {
    if (editCategory) {
      form.reset({
        name: editCategory.name,
        bangla_name: editCategory.bangla_name,
      });
    } else {
      form.reset({
        name: "",
        bangla_name: "",
      });
    }
  }, [editCategory, form]);

  const onSubmit = (data: ExpenseCategoryFormValues) => {
    onSave(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editCategory ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                  <FormLabel className="sm:col-span-1">Name</FormLabel>
                  <div className="sm:col-span-3">
                    <FormControl>
                      <Input placeholder="ex-Soft drinks" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bangla_name"
              render={({ field }) => (
                <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                  <FormLabel className="sm:col-span-1">Bangla Name</FormLabel>
                  <div className="sm:col-span-3">
                    <FormControl>
                      <Input placeholder="বাংলা নাম" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
