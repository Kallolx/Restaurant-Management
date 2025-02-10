"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  expenseSchema,
  type ExpenseFormValues,
} from "@/lib/validations/expense";
import type {
  ExpenseCategory,
  ExpenseCategoryRequest,
  ExpenseRequest,
} from "@/types/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddCategoryModal } from "./add-category-modal";

interface ExpenseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (expense: ExpenseRequest) => void;
}

const initialCategories: ExpenseCategory[] = [
  { uuid: "1", name: "Food", bangla_name: "খাবার" },
  { uuid: "2", name: "Beverage", bangla_name: "পানীয়" },
  { uuid: "3", name: "Rent", bangla_name: "ভাড়া" },
  { uuid: "4", name: "Labor cost", bangla_name: "শ্রম ব্যয়" },
  { uuid: "5", name: "Utilities", bangla_name: "ইউটিলিটি" },
  { uuid: "6", name: "Supplies", bangla_name: "সরবরাহ" },
];

export function AddExpenseModal({
  open,
  onOpenChange,
  onSubmit,
}: ExpenseFormProps) {
  const [categories, setCategories] =
    useState<ExpenseCategory[]>(initialCategories);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    ExpenseCategory | undefined
  >();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      expense_category: "",
      amount: 0,
      due_expense: 0,
      date: new Date(),
      description: "",
      note: "",
      mode: "cash",
    },
  });

  const handleSubmit = (data: ExpenseFormValues) => {
    onSubmit({
      ...data,
      date: format(data.date, "yyyy-MM-dd"),
    });
    form.reset();
    onOpenChange(false);
  };

  const handleAddCategory = (categoryData: ExpenseCategoryRequest) => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.uuid === editingCategory.uuid ? { ...cat, ...categoryData } : cat
        )
      );
    } else {
      const newCategory = {
        uuid: (categories.length + 1).toString(), // In real app, this would come from API
        ...categoryData,
      };
      setCategories([...categories, newCategory]);
      form.setValue("expense_category", newCategory.uuid);
    }
    setEditingCategory(undefined);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add Expenses</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                    <FormLabel className="sm:col-span-1">Expenses</FormLabel>
                    <div className="sm:col-span-3">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="ex-570"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          onFocus={(e) => e.target.select()}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="due_expense"
                render={({ field }) => (
                  <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                    <FormLabel className="sm:col-span-1">Due Amount</FormLabel>
                    <div className="sm:col-span-3">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="ex-100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          onFocus={(e) => e.target.select()}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                    <FormLabel className="sm:col-span-1">
                      Payment Type
                    </FormLabel>
                    <div className="sm:col-span-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <FormLabel htmlFor="cash">Cash</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credit" id="credit" />
                            <FormLabel htmlFor="credit">On credit</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expense_category"
                render={({ field }) => (
                  <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                    <FormLabel className="sm:col-span-1">Category</FormLabel>
                    <div className="sm:col-span-3">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <div
                              key={category.uuid}
                              className="flex items-center justify-between"
                            >
                              <SelectItem value={category.uuid}>
                                {category.name} ({category.bangla_name})
                              </SelectItem>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditingCategory(category);
                                  setShowAddCategory(true);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">
                                  Edit {category.name}
                                </span>
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="ghost"
                            className="relative w-full justify-start rounded-none text-left font-normal"
                            onClick={() => {
                              setEditingCategory(undefined);
                              setShowAddCategory(true);
                            }}
                          >
                            Add category
                          </Button>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                    <FormLabel className="sm:col-span-1">Description</FormLabel>
                    <div className="sm:col-span-3">
                      <FormControl>
                        <Input placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-start">
                    <FormLabel className="sm:col-span-1 pt-2">Note</FormLabel>
                    <div className="sm:col-span-3">
                      <FormControl>
                        <Textarea placeholder="Enter note" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                    <FormLabel className="sm:col-span-1">Date</FormLabel>
                    <div className="sm:col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "PPP")
                                : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                <Button type="submit">Add Expenses</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AddCategoryModal
        open={showAddCategory}
        onOpenChange={setShowAddCategory}
        onSave={handleAddCategory}
        editCategory={editingCategory}
      />
    </>
  );
}
