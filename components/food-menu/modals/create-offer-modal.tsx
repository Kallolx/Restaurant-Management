"use client";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
import { cn } from "@/lib/utils";
import { offerSchema, type OfferFormValues } from "@/lib/validations/offer";
import { MenuItem } from "@/types/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OfferFormValues) => void;
  item?: MenuItem;
}

export function CreateOfferModal({
  isOpen,
  onClose,
  onSubmit,
  item,
}: CreateOfferModalProps) {
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      offer_price: item?.current_offer?.offer_price || 0,
      offer_percentage: item?.current_offer?.offer_percentage || 0,
      expiry_time: item?.current_offer?.expiry_time || "",
      expiry_date: item?.current_offer?.expiry_date || "",
    },
  });

  useEffect(() => {
    if (isOpen && item) {
      form.reset({
        offer_price: item.current_offer?.offer_price || 0,
        offer_percentage: item.current_offer?.offer_percentage || 0,
        expiry_time: item.current_offer?.expiry_time || "",
        expiry_date: item.current_offer?.expiry_date || "",
      });
    }
  }, [isOpen, item, form]);

  const handlePercentageChange = (value: string) => {
    const percentage = parseFloat(value);
    if (!isNaN(percentage) && item) {
      const actualPrice = item.price;
      const discountAmount = (actualPrice * percentage) / 100;
      const offerPrice = actualPrice - discountAmount;
      form.setValue("offer_price", offerPrice);
      form.setValue("offer_percentage", percentage);
    }
  };

  const handlePriceChange = (value: string) => {
    const offerPrice = parseFloat(value);
    if (!isNaN(offerPrice) && item) {
      const actualPrice = item.price;
      const percentage = ((actualPrice - offerPrice) / actualPrice) * 100;
      form.setValue("offer_price", offerPrice);
      form.setValue("offer_percentage", percentage);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{item?.current_offer ? "Edit Offer" : "Create Offer"}</span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              const submissionData = {
                ...data,
                expiry_date: format(new Date(data.expiry_date), "yyyy-MM-dd"),
              };
              onSubmit(submissionData);
            })}
            className="space-y-6 mt-4"
          >
            <FormField
              name="actualPrice"
              render={({ field }) => (
                <FormItem>
                  <div className="flex md:flex-row flex-col items-start justify-between gap-4 md:items-center">
                    <FormLabel className="md:w-1/3 text-left">
                      Actual price
                    </FormLabel>
                    <FormControl className="md:w-2/3">
                      <Input
                        type="number"
                        placeholder="ex-850Tk"
                        value={item?.price || 0}
                        disabled={!!item}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offer_price"
              render={({ field }) => (
                <FormItem>
                  <div className="flex md:flex-row flex-col items-start justify-between gap-4 md:items-center">
                    <FormLabel className="md:w-1/3 text-left">
                      Offer price
                    </FormLabel>
                    <FormControl className="md:w-2/3">
                      <Input
                        type="number"
                        placeholder="ex-480Tk"
                        {...field}
                        onChange={(e) => handlePriceChange(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offer_percentage"
              render={({ field }) => (
                <FormItem>
                  <div className="flex md:flex-row flex-col items-start justify-between gap-4 md:items-center">
                    <FormLabel className="md:w-1/3 text-left">
                      Offer percentage
                    </FormLabel>
                    <FormControl className="md:w-2/3">
                      <Input
                        type="number"
                        placeholder="ex-15%"
                        {...field}
                        onChange={(e) => handlePercentageChange(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiry_time"
              render={({ field }) => (
                <FormItem>
                  <div className="flex md:flex-row flex-col items-start justify-between gap-4 md:items-center">
                    <FormLabel className="md:w-1/3 text-left">
                      Expire time
                    </FormLabel>
                    <FormControl className="md:w-2/3">
                      <Input type="time" placeholder="Select time" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiry_date"
              render={({ field }) => (
                <FormItem>
                  <div className="flex md:flex-row flex-col items-start justify-between gap-4 md:items-center">
                    <FormLabel className="md:w-1/3 text-left">
                      Expire date
                    </FormLabel>
                    <FormControl className="md:w-2/3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
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
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </div>
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
              <Button type="submit" variant="primary">
                {item?.current_offer ? "Update Offer" : "Create Offer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
