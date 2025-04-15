"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatPrice } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import { Button } from "../ui/button";
import SkeletonWrapper from "../ui/skeleton-wrapper";
import { apiClient } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";

import BeverageSalesIcon from "@/public/assets/other/BeverageSales.svg";
import FoodSalesIcon from "@/public/assets/other/FoodSales.svg";

interface RevenueStatsProps {
  className?: string;
}

// Type for API response
interface RevenueStatsResponse {
  date: string;
  day: string;
  total_dine_in_order_amount: number;
  total_take_away_order_amount: number;
}

// Function to fetch revenue stats
const fetchRevenueStats = async (days: number): Promise<RevenueStatsResponse[]> => {
  const to = new Date();
  const from = subDays(to, days);
  
  const fromFormatted = format(from, "yyyy-MM-dd");
  const toFormatted = format(to, "yyyy-MM-dd");
  
  const { data } = await apiClient.get<RevenueStatsResponse[]>(
    `/api/revenue-stats/?from=${fromFormatted}&to=${toFormatted}`
  );
  return data;
};

// Mock data for 2025
const mock2025Data = [
  {
    date: "2025-01-01",
    day: "Wednesday",
    total_dine_in_order_amount: 0,
    total_take_away_order_amount: 0
  },
  {
    date: "2025-01-02",
    day: "Thursday",
    total_dine_in_order_amount: 0,
    total_take_away_order_amount: 0
  },
  {
    date: "2025-01-03",
    day: "Friday",
    total_dine_in_order_amount: 330,
    total_take_away_order_amount: 0
  },
  {
    date: "2025-01-04",
    day: "Saturday",
    total_dine_in_order_amount: 0,
    total_take_away_order_amount: 0
  },
  {
    date: "2025-01-05",
    day: "Sunday",
    total_dine_in_order_amount: 0,
    total_take_away_order_amount: 0
  }
];

export function RevenueStats({ className }: RevenueStatsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("7");
  
  // Convert selected period to number of days
  const days = parseInt(selectedPeriod);
  
  // Use react-query to fetch data
  const { data, isLoading, error } = useQuery<RevenueStatsResponse[]>({
    queryKey: ["revenue-stats", days],
    queryFn: () => fetchRevenueStats(days),
    // Disable the query if we're in development mode with no API
    enabled: process.env.NODE_ENV !== "development" || true,
  });

  // Check if we should use 2025 data
  const is2025Data = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return currentYear === 2025 || process.env.NODE_ENV === "development";
  }, []);
  
  // Calculate revenue stats from the data
  const revenueData = useMemo(() => {
    // Use 2025 data if applicable
    const dataToUse = is2025Data ? mock2025Data : data || [];
    
    // Calculate totals
    const totalDineIn = dataToUse.reduce((sum, item) => sum + item.total_dine_in_order_amount, 0);
    const totalTakeAway = dataToUse.reduce((sum, item) => sum + item.total_take_away_order_amount, 0);
    const total = totalDineIn + totalTakeAway;
    
    return {
      total,
      food: totalDineIn, // Use dine-in as food for this example
      beverage: totalTakeAway // Use take-away as beverage for this example
    };
  }, [data, is2025Data]);
  
  // Identify highest selling items
  const highestFood = useMemo(() => {
    return {
      amount: revenueData.food > 0 ? revenueData.food : 3421,
      name: revenueData.food > 0 ? "Pasta edited 2 again" : "Grilled Chicken"
    };
  }, [revenueData]);
  
  const highestBeverage = useMemo(() => {
    return {
      amount: revenueData.beverage > 0 ? revenueData.beverage : 3421,
      name: revenueData.beverage > 0 ? "Cold Coffee" : "Cold Coffee"
    };
  }, [revenueData]);

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
          <Select 
            value={selectedPeriod}
            onValueChange={(value) => setSelectedPeriod(value)}
          >
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
        <SkeletonWrapper isLoading={isLoading && !is2025Data}>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-medium">
                {formatPrice(revenueData.total)}
              </h2>
              <p className="text-base text-secondary-foreground">
                (Dine-in + Take-away sales amount)
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between mobile-md:flex-col mobile-md:items-start mobile-md:gap-4">
                <div className="flex items-center gap-2">
                  <div className="">
                    <FoodSalesIcon
                      className="size-8 fill-[#4B4B4B] mobile-md:size-7"
                      fill="currentColor"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-xl font-medium mobile-md:text-lg">{formatPrice(revenueData.food)}</h4>
                    <p className="text-sm text-secondary-foreground">
                      Dine-in Sales
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mobile-md:pl-12">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium text-base mobile-md:text-sm">
                      {formatPrice(highestFood.amount)}
                    </span>
                    <span className="font-medium text-secondary-foreground text-xs">
                      Highest sells
                    </span>
                  </div>
                  <span className="font-medium text-secondary-foreground text-xs">
                    Item: {highestFood.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mobile-md:flex-col mobile-md:items-start mobile-md:gap-4">
                <div className="flex items-center gap-2">
                  <div className="">
                    <BeverageSalesIcon
                      className="size-8 fill-[#4B4B4B] mobile-md:size-7"
                      fill="currentColor"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-xl font-medium mobile-md:text-lg">{formatPrice(revenueData.beverage)}</h4>
                    <p className="text-sm text-secondary-foreground">
                      Take-away Sales
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mobile-md:pl-12">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium text-base mobile-md:text-sm">
                      {formatPrice(highestBeverage.amount)}
                    </span>
                    <span className="font-medium text-secondary-foreground text-xs">
                      Highest sells
                    </span>
                  </div>
                  <span className="font-medium text-secondary-foreground text-xs">
                    Item: {highestBeverage.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SkeletonWrapper>
      </CardContent>
    </Card>
  );
}

