"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

import BeverageSalesIcon from "@/public/assets/other/BeverageSales.svg";
import FoodSalesIcon from "@/public/assets/other/FoodSales.svg";

interface RevenueStatsProps {
  className?: string;
}

export function RevenueStats({ className }: RevenueStatsProps) {
  const [revenueData, setRevenueData] = useState<{
    total: number;
    food: number;
    beverage: number;
  } | null>(null);

  useEffect(() => {
    // Simulating data fetch
    setRevenueData({ total: 852324.99, food: 3424.99, beverage: 2424.99 });
  }, []);

  if (!revenueData) {
    return <Skeleton className="h-[400px]" />;
  }

  return (
    <Card className={cn("px-4 py-4 w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
        <CardTitle className="text-foreground font-medium text-xl">
          Total Revenue
        </CardTitle>
        <div className="flex items-center gap-5">
          <Button
            size={"sm"}
            variant="link"
            className="px-0 text-sm text-primary underline"
          >
            View Details
          </Button>
          <Select defaultValue="7">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-medium">
              {formatPrice(revenueData.total)}
            </h2>
            <p className="text-base text-secondary-foreground">
              (Food + Beverage sales amount)
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="">
                  <FoodSalesIcon
                    className="size-10 fill-[#4B4B4B]"
                    fill="currentColor"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-xl font-medium">{formatPrice(3234)}</h4>
                  <p className="text-sm text-secondary-foreground">
                    Food Sales
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-foreground font-medium text-base">
                  {formatPrice(3421)}{" "}
                  <span className="font-medium text-secondary-foreground text-sm">
                    Highest sells
                  </span>
                </span>
                <span className="font-medium text-secondary-foreground text-sm">
                  Item: Grilled Chicken
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <BeverageSalesIcon
                    className="size-10 fill-[#4B4B4B]"
                    fill="currentColor"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-xl font-medium">{formatPrice(3234)}</h4>
                  <p className="text-sm text-secondary-foreground">
                    Beverage sales
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-foreground font-medium text-base">
                  {formatPrice(3421)}{" "}
                  <span className="font-medium text-secondary-foreground text-sm">
                    Lowest sells
                  </span>
                </span>
                <span className="font-medium text-secondary-foreground text-sm">
                  Item: Grilled Chicken
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
