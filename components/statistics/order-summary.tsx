"use client";

import { Card } from "@/components/ui/card";
import { CalendarIcon, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { TimeRange, TimeRangeSelect } from "./time-range-select";

export function OrderSummary() {
  const handleTimeRangeChange = (range: TimeRange) => {};
  return (
    <Card>
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="text-lg font-medium">Order Summary</h2>
          <div className="mt-1 text-sm text-muted-foreground">
            Summary of all orders
          </div>
        </div>
        <TimeRangeSelect onChange={handleTimeRangeChange} />
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <Card className="bg-pink-50">
          <div className="p-4">
            <div className="mb-2">
              <UtensilsCrossed className="h-8 w-8 text-pink-500" />
            </div>
            <div className="text-sm text-muted-foreground">
              Total dine in orders
            </div>
            <div className="mt-1 text-2xl font-semibold">#435</div>
          </div>
        </Card>

        <Card className="bg-blue-50">
          <div className="p-4">
            <div className="mb-2">
              <ShoppingBag className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-sm text-muted-foreground">
              Total takeaway orders
            </div>
            <div className="mt-1 text-2xl font-semibold">#335</div>
          </div>
        </Card>

        <Card className="bg-pink-50">
          <div className="p-4">
            <div className="mb-2">
              <CalendarIcon className="h-8 w-8 text-pink-500" />
            </div>
            <div className="text-sm text-muted-foreground">
              Peak dine in days
            </div>
            <div className="mt-1 text-xl font-semibold">Sunday</div>
          </div>
        </Card>

        <Card className="bg-blue-50">
          <div className="p-4">
            <div className="mb-2">
              <CalendarIcon className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-sm text-muted-foreground">
              Peak takeaway days
            </div>
            <div className="mt-1 text-xl font-semibold">Thursday</div>
          </div>
        </Card>
      </div>
    </Card>
  );
}
