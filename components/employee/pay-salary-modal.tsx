"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import {
  paySalaryFormSchema,
  type PaySalaryFormValues,
} from "@/lib/validations/employee";
import { Employee } from "@/types/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Printer } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StaffSalaryReceiptModal } from "./staff-salary-receipt-modal";

interface PaySalaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee;
}

export function PaySalaryModal({
  open,
  onOpenChange,
  employee,
}: PaySalaryModalProps) {
  const [showReceipt, setShowReceipt] = useState(false);

  const form = useForm<PaySalaryFormValues>({
    resolver: zodResolver(paySalaryFormSchema),
    defaultValues: {
      name: employee.name,
      role: employee.role,
      salary: employee.salary.toString(),
      dueSalary: "",
      bonus: "",
      salaryMonth: new Date(),
    },
  });

  const onSubmit = (values: PaySalaryFormValues) => {
    console.log(values);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[600px] p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              {/* Header */}
              <DialogTitle className="p-6 border-b">
                <h2 className="text-xl font-medium">Pay Salary</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Save or print employee salary data
                </p>
              </DialogTitle>

              {/* Form Content */}
              <div className="p-6 space-y-4">
                {/* Employee Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Employee name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Salary */}
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Due Salary */}
                <FormField
                  control={form.control}
                  name="dueSalary"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Due salary</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="ex-1,000Tk"
                            className="border-destructive"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Add Bonus */}
                <FormField
                  control={form.control}
                  name="bonus"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Add bonus</FormLabel>
                      <FormControl>
                        <Input placeholder="ex-1,000Tk" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Salary Month */}
                <FormField
                  control={form.control}
                  name="salaryMonth"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Salary month</FormLabel>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "MMMM")
                                ) : (
                                  <span>Pick a month</span>
                                )}
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
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Footer */}
              <div className="p-6 border-t flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReceipt(true)}
                  className="hover:bg-primary/10 hover:text-primary border-primary text-primary"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print receipt
                </Button>

                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onOpenChange(false)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Save Info
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <StaffSalaryReceiptModal
        open={showReceipt}
        onOpenChange={setShowReceipt}
        data={{
          name: employee.name,
          role: employee.role,
          salaryMonth: format(form.getValues("salaryMonth"), "MMMM"),
          salary: Number(form.getValues("salary")),
          bonus: Number(form.getValues("bonus") || 0),
          others: 0,
        }}
      />
    </>
  );
}
