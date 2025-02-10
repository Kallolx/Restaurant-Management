"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { cn } from "@/lib/utils";
import { addReservationSchema } from "@/lib/validations/reservation";
import { Reservation } from "@/types/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface AddReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reservation: Reservation) => void;
}

export function AddReservationModal({
  isOpen,
  onClose,
  onSubmit,
}: AddReservationModalProps) {
  const [date, setDate] = useState<Date>();

  const form = useForm({
    resolver: zodResolver(addReservationSchema),
    defaultValues: {
      date: "",
      time: "",
      reservationNo: "",
      tableNo: "",
      guestCount: "",
      customerName: "",
      customerContact: "",
      customerAddress: "",
      specialRequest: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const newReservation: Reservation = {
      id: data.reservationNo,
      date: new Date(data.date),
      time: data.time,
      tableNumber: data.tableNo,
      guestCount: data.guestCount,
      customer: {
        name: data.customerName,
        contact: data.customerContact,
        address: data.customerAddress,
        specialRequest: data.specialRequest,
      },
      status: "pending",
    };
    onSubmit(newReservation);
    form.reset();
    setDate(undefined);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-full max-w-[800px] overflow-hidden flex-col p-0">
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="grid h-[92vh] grid-rows-[auto_1fr_auto]"
          >
            <DialogHeader className="px-6 py-5">
              <DialogTitle>Add Reservation</DialogTitle>
              <DialogDescription>
                Fill up the form with below to add a new reservation
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-6 py-4 pt-0">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0 ">
                        <FormLabel className="sm:mt-2">
                          Reservation date
                        </FormLabel>
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full bg-gray-50 pl-3 text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  {date ? (
                                    format(date, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => {
                                  setDate(newDate);
                                  field.onChange(newDate?.toISOString());
                                }}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="absolute left-0 mt-1 text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0">
                        <FormLabel className="sm:mt-2">
                          Reservation time
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="ex-30.00-5.00pm"
                              className="bg-gray-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute left-0 mt-1 text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reservationNo"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0">
                        <FormLabel className="sm:mt-2">
                          Reservation no
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="ex-#RSV10"
                              className="bg-gray-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute left-0 mt-1 text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tableNo"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0">
                        <FormLabel className="sm:mt-2">Table no</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="ex-Table no-03"
                              className="bg-gray-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute left-0 mt-1 text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0">
                        <FormLabel className="sm:mt-2">
                          Number of guests
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="ex-04"
                              className="bg-gray-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute left-0 mt-1 text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3 ">
                    <h3 className="text-sm font-medium">
                      Customer information
                    </h3>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0">
                            <FormLabel className="sm:mt-2">Name</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  placeholder="Customer name"
                                  className="bg-gray-50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="absolute left-0 mt-1 text-xs" />
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customerContact"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0">
                            <FormLabel className="sm:mt-2">
                              Contact info
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  placeholder="Contact information"
                                  className="bg-gray-50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="absolute left-0 mt-1 text-xs" />
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customerAddress"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0">
                            <FormLabel className="sm:mt-2">Address</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  placeholder="Customer address"
                                  className="bg-gray-50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="absolute left-0 mt-1 text-xs" />
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="specialRequest"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr]  sm:gap-4 items-center sm:mt-0">
                            <FormLabel className="sm:mt-2">
                              Special request
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  placeholder="Any special request"
                                  className="bg-gray-50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="absolute left-0 mt-1 text-xs" />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-shrink-0 border-t px-6 py-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Reservation
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
