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
import { CalendarIcon, Pencil, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddCategoryModal } from "./add-category-modal";

interface ExpenseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (expense: any) => void;
}

const initialCategories = [
  "Food",
  "Beverage",
  "Rent",
  "Labor cost",
  "Utilities",
  "Supplies",
  "Equipment",
  "Maintenance",
  "Marketing",
  "Other"
];

export function AddExpenseModal({
  open,
  onOpenChange,
  onSubmit,
}: ExpenseFormProps) {
  const [categories] = useState<string[]>(initialCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      category: "",
      amount: 0,
      due_expense: 0,
      date: format(new Date(), "yyyy-MM-dd"),
      description: "",
      note: "",
      mode: "cash",
    },
  });

  const handleSubmit = async (data: ExpenseFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Format the expense data according to API requirements
      const expenseData = {
        category_name: data.category,
        amount: data.amount,
        due_expense: data.due_expense || 0,
        date: data.date,
        description: data.description || "",
        note: data.note || "",
        mode: data.mode,
      };
      
      // Submit the data
      await onSubmit(expenseData);
      
      // Reset form and close modal
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
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
                    <FormLabel className="sm:col-span-1">Amount</FormLabel>
                    <div className="sm:col-span-3">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount"
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
                          placeholder="Enter due amount (optional)"
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
                      Payment Mode
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
                            <RadioGroupItem value="card" id="card" />
                            <FormLabel htmlFor="card">Card</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="digital" id="digital" />
                            <FormLabel htmlFor="digital">Digital</FormLabel>
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
                name="category"
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
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                        <Textarea
                          placeholder="Enter expense description"
                          className="resize-none"
                          {...field}
                        />
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
                  <FormItem className="grid gap-4 sm:grid-cols-4 sm:items-center">
                    <FormLabel className="sm:col-span-1">Notes</FormLabel>
                    <div className="sm:col-span-3">
                      <FormControl>
                        <Input
                          placeholder="Additional notes (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4 space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Add Expense"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
