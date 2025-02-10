"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { OrderType } from "./create-order-modal";

interface OrderDetailsProps {
  orderType: OrderType;
}

export function OrderDetails({ orderType }: OrderDetailsProps) {
  const [date, setDate] = useState<Date>();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4">
      <div className="space-y-2">
        <Label htmlFor="order-no">Order no</Label>
        <Input id="order-no" placeholder="ex-#154" />
      </div>

      <div className="space-y-2">
        <Label>Order date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {orderType === "dine-in" && (
        <div className="space-y-2">
          <Label htmlFor="table-no">Table no</Label>
          <Select>
            <SelectTrigger id="table-no">
              <SelectValue placeholder="Select table number" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 25 }, (_, i) => i + 1).map((number) => (
                <SelectItem key={number} value={number.toString()}>
                  {number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(orderType === "takeaway" || orderType === "home-delivery") && (
        <>
          <div className="space-y-2">
            <Label htmlFor="customer-name">Customer Name</Label>
            <Input id="customer-name" placeholder="Enter customer name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Info</Label>
            <Input id="contact" placeholder="Phone or email" />
          </div>
        </>
      )}

      {orderType === "home-delivery" && (
        <div className="space-y-2 col-span-2 mobile-md:col-span-1">
          <Label htmlFor="delivery-address">Delivery Address</Label>
          <Input id="delivery-address" placeholder="Enter delivery address" />
        </div>
      )}

      {(orderType === "home-delivery" || orderType === "takeaway") && (
        <div className="space-y-2 col-span-2 mobile-md:col-span-1">
          <Label htmlFor="special-request">Special Request</Label>
          <Input id="special-request" placeholder="Enter special request" />
        </div>
      )}
    </div>
  );
}
