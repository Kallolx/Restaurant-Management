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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addReservationSchema } from "@/lib/validations/reservation";
import { Reservation } from "@/types/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isToday, isYesterday, isTomorrow } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { useToast } from "@/hooks/use-toast";

interface AddReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reservation: Reservation) => void;
}

interface TableAvailability {
  total_tables: number;
  available_table_numbers: number[];
}

// Convert 24h time options to 12h format
const timeOptions = [
  { value: "09:00", label: "9:00 AM" },
  { value: "09:30", label: "9:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:00", label: "9:00 PM" },
  { value: "21:30", label: "9:30 PM" },
  { value: "22:00", label: "10:00 PM" },
  { value: "22:30", label: "10:30 PM" },
  { value: "23:00", label: "11:00 PM" }
];

// Helper function to format date display
const formatDateDisplay = (date: Date | undefined) => {
  if (!date) return "Pick a date";
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "PPP");
};

export function AddReservationModal({
  isOpen,
  onClose,
  onSubmit,
}: AddReservationModalProps) {
  const [date, setDate] = useState<Date>(new Date()); // Initialize with today's date
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(addReservationSchema),
    defaultValues: {
      date: new Date().toISOString(), // Initialize with today's date
      from_time: "",
      to_time: "",
      tableNo: "",
      guestCount: "",
      guest_name: "",
      guest_phone: "",
      guest_email: "",
      guest_note: "",
    },
  });

  // Get the selected date and time from form
  const selectedDate = form.watch("date");
  const selectedFromTime = form.watch("from_time");

  // Query for available tables
  const { data: tableAvailability, isLoading: isLoadingTables } = useQuery<TableAvailability>({
    queryKey: ['table-availability', selectedDate, selectedFromTime],
    queryFn: async () => {
      if (!selectedDate || !selectedFromTime) return null;
      
      const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");
      const formattedTime = selectedFromTime + ":00";
      
      const response = await apiClient.get(
        `/reservations/table_availability/?date=${formattedDate}&time=${formattedTime}`
      );
      return response.data;
    },
    enabled: !!selectedDate && !!selectedFromTime,
  });

  const handleSubmit = form.handleSubmit((data) => {
    const newReservation = {
      date: format(new Date(data.date), "yyyy-MM-dd"),
      from_time: data.from_time + ":00",
      to_time: data.to_time + ":00",
      table_number: Number(data.tableNo), // Ensure proper number conversion
      number_of_guests: Number(data.guestCount),
      guest_name: data.guest_name,
      guest_phone: data.guest_phone,
      guest_email: data.guest_email,
      guest_note: data.guest_note,
    };
    console.log('Submitting reservation:', newReservation); // Debug log
    onSubmit(newReservation);
    form.reset();
    setDate(undefined);
  });

  // Effect to show toast when table availability changes
  useEffect(() => {
    if (tableAvailability) {
      toast({
        title: "Available Tables",
        description: `${tableAvailability.available_table_numbers.length} tables available`,
      });
    }
  }, [tableAvailability]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-full max-w-[800px] overflow-hidden flex-col p-0 mobile-md:h-[95vh] mobile-md:w-[95vw] mobile-md:max-w-none">
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="grid h-[92vh] mobile-md:h-full grid-rows-[auto_1fr_auto]"
          >
            <DialogHeader className="px-6 py-5 mobile-md:px-4 mobile-md:py-3 border-b">
              <DialogTitle className="text-xl mobile-md:text-lg">Add Reservation</DialogTitle>
              <DialogDescription className="text-sm mobile-md:text-xs text-muted-foreground">
                Fill up the form below to add a new reservation
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 mobile-md:px-4">
              <div className="space-y-6 py-4 mobile-md:space-y-4 mobile-md:py-3">
                <div className="grid gap-6 mobile-md:gap-4">
                  {/* Date Field */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                        <FormLabel className="text-sm mobile-md:text-xs">Reservation date</FormLabel>
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-10 mobile-md:h-9 mobile-md:text-sm",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  {formatDateDisplay(date)}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => {
                                  if (newDate) {
                                    setDate(newDate);
                                    field.onChange(newDate.toISOString());
                                  }
                                }}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="absolute text-xs mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Time Range Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="from_time"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                          <FormLabel className="text-sm mobile-md:text-xs">From Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 mobile-md:h-9 mobile-md:text-sm">
                                <SelectValue placeholder="Select start time">
                                  {field.value ? timeOptions.find(opt => opt.value === field.value)?.label : "Select start time"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeOptions.map((time) => (
                                <SelectItem 
                                  key={time.value} 
                                  value={time.value}
                                  className="mobile-md:text-sm"
                                >
                                  {time.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="absolute text-xs mt-1" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="to_time"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                          <FormLabel className="text-sm mobile-md:text-xs">To Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!form.watch("from_time")}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 mobile-md:h-9 mobile-md:text-sm">
                                <SelectValue placeholder="Select end time">
                                  {field.value ? timeOptions.find(opt => opt.value === field.value)?.label : "Select end time"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeOptions
                                .filter(time => time.value > form.watch("from_time"))
                                .map((time) => (
                                  <SelectItem 
                                    key={time.value} 
                                    value={time.value}
                                    className="mobile-md:text-sm"
                                  >
                                    {time.label}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="absolute text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Table Selection */}
                  <FormField
                    control={form.control}
                    name="tableNo"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                        <FormLabel className="text-sm mobile-md:text-xs">Table no</FormLabel>
                        <div className="relative">
                          <Select
                            disabled={!tableAvailability || isLoadingTables}
                            onValueChange={(value) => {
                              field.onChange(value);
                              console.log('Selected table:', value); // Debug log
                            }}
                            value={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 mobile-md:h-9 mobile-md:text-sm">
                                <SelectValue placeholder={
                                  isLoadingTables 
                                    ? "Loading tables..." 
                                    : !selectedDate || !selectedFromTime 
                                    ? "Select date and time first"
                                    : "Select a table"
                                } />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingTables ? (
                                <div className="flex items-center justify-center py-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                              ) : tableAvailability?.available_table_numbers.map((tableNo) => (
                                <SelectItem 
                                  key={tableNo} 
                                  value={tableNo.toString()}
                                  className="mobile-md:text-sm"
                                >
                                  Table {tableNo}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="absolute text-xs mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Guest Count */}
                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                        <FormLabel className="text-sm mobile-md:text-xs">Number of guests</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter number of guests"
                              className="h-10 mobile-md:h-9 mobile-md:text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute text-xs mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Guest Information Section */}
                  <div className="space-y-4 mobile-md:space-y-3">
                    <h3 className="text-sm font-medium mobile-md:text-xs">
                      Guest Information
                    </h3>
                    <div className="space-y-4 mobile-md:space-y-3">
                      <FormField
                        control={form.control}
                        name="guest_name"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                            <FormLabel className="text-sm mobile-md:text-xs">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Guest name"
                                className="h-10 mobile-md:h-9 mobile-md:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guest_phone"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                            <FormLabel className="text-sm mobile-md:text-xs">Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Guest phone number"
                                className="h-10 mobile-md:h-9 mobile-md:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guest_email"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                            <FormLabel className="text-sm mobile-md:text-xs">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Guest email"
                                className="h-10 mobile-md:h-9 mobile-md:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guest_note"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-1 gap-2 mobile-md:gap-1.5">
                            <FormLabel className="text-sm mobile-md:text-xs">Special Request</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Any special requests"
                                className="h-10 mobile-md:h-9 mobile-md:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-shrink-0 border-t px-6 py-4 mobile-md:px-4 mobile-md:py-3">
              <div className="flex gap-3 w-full mobile-md:flex-col">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1 h-10 mobile-md:h-9 mobile-md:text-sm"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  className="flex-1 h-10 mobile-md:h-9 mobile-md:text-sm"
                >
                  Add Reservation
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
