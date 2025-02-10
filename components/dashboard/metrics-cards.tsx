"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import TodayExpenseIcon from "@/public/assets/other/TodayExpense.svg";
import TodaySalesIcon from "@/public/assets/other/TodaySales.svg";
import { ExpenseRequest } from "@/types/expense";
import { CirclePlus, MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { AddExpenseModal } from "../expenses/modals/add-expense-modal";
import TodayOrdersIcon from "../icon/TodayOrdersIcon";
import CurrencyAmount from "../ui/currency-amount";
import SkeletonWrapper from "../ui/skeleton-wrapper";
import { useLanguage } from "@/providers/language-provider";

interface DailyStats {
  total_sales: string;
  total_orders: number;
  total_expense: string;
  date: string;
}

interface StatsUpdate {
  type: "daily_stats_update";
  stats: DailyStats;
}

// Mock data for development
const mockStats: DailyStats = {
  total_sales: "25000",
  total_orders: 45,
  total_expense: "8000",
  date: new Date().toISOString(),
};

function MetricsCardSkeleton() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2.5 pt-2.5 px-3">
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent className="pt-2.5 px-3 pb-2.5">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-6 w-24" />
      </CardContent>
    </Card>
  );
}

export function MetricsCards() {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [stats, setStats] = useState<DailyStats | null>(mockStats); // Initialize with mock data
  const navigation = useRouter();
  const { t } = useLanguage();

  // Get access token safely
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    
  // WebSocket setup with improved configuration
  const { lastMessage, readyState } = useWebSocket(
    "wss://api.hishabx.io/ws/stats/",
    {
      share: true,
      shouldReconnect: () => true,
      reconnectInterval: 5000,
      reconnectAttempts: 3,
      queryParams: { token: accessToken as string },
      onOpen: () => console.log("WebSocket connection established."),
      onError: (event) => console.error("WebSocket error:", event),
    }
  );

  // Handle incoming messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const data: StatsUpdate = JSON.parse(lastMessage.data);
        if (data.type === "daily_stats_update") {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    }
  }, [lastMessage]);

  const handleSubmit = (expense: ExpenseRequest) => {
    console.log("Submitted expense:", expense);
  };

  return (
    <>
      <div className="w-full">
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent>
            {/* Today Sales */}
            <CarouselItem className="basis-1/3 mobile-md:basis-4/5">
              <SkeletonWrapper
                isLoading={false} // Set to false to always show content
              >
                <Card className="w-full h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2.5 pt-2.5 px-3">
                    <CardTitle className="text-base font-medium">
                      {t("Today Sales")}
                    </CardTitle>
                    <TodaySalesIcon className="h-8 w-8 fill-[#84B2FC]" />
                  </CardHeader>
                  <CardContent className="pt-2.5 px-3 pb-2.5">
                    <div className="text-2xl font-bold">
                      <CurrencyAmount
                        amount={parseFloat(stats?.total_sales || "0")}
                      />
                    </div>
                    <div className="flex gap-2 justify-between pt-2.5">
                      <Button
                        onClick={() => navigation.push("/dashboard/sales")}
                        size={"sm"}
                        variant="link"
                        className="px-0 text-sm text-primary"
                      >
                        {t("Total sales")}
                        <MoveUpRight />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SkeletonWrapper>
            </CarouselItem>

            {/* Today Orders */}
            <CarouselItem className="basis-1/3 mobile-md:basis-4/5">
              <SkeletonWrapper
                isLoading={false} // Set to false to always show content
              >
                <Card className="w-full h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2.5 pt-2.5 px-3">
                    <CardTitle className="text-base font-medium">
                      {t("Today Orders")}
                    </CardTitle>
                    <TodayOrdersIcon className="h-8 w-8" />
                  </CardHeader>
                  <CardContent className="pt-2.5 px-3 pb-2.5">
                    <div className="text-2xl font-bold">
                      {stats?.total_orders || 0}
                    </div>
                    <div className="flex gap-2 justify-between pt-2.5">
                      <Button
                        size={"sm"}
                        variant="link"
                        className="px-0 text-sm text-primary"
                        onClick={() => navigation.push("/dashboard/sales")}
                      >
                        {t("Total orders")}
                        <MoveUpRight />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SkeletonWrapper>
            </CarouselItem>

            {/* Today Expenses */}
            <CarouselItem className="basis-1/3 mobile-md:basis-4/5">
              <SkeletonWrapper
                isLoading={false} // Set to false to always show content
              >
                <Card className="w-full h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2.5 pt-2.5 px-3">
                    <CardTitle className="text-base font-medium">
                      {t("Today Expenses")}
                    </CardTitle>
                    <TodayExpenseIcon className="h-8 w-8 fill-[#84B2FC]" />
                  </CardHeader>
                  <CardContent className="pt-2.5 px-3 pb-2.5">
                    <div className="text-2xl font-bold">
                      <CurrencyAmount
                        amount={parseFloat(stats?.total_expense || "0")}
                      />
                    </div>
                    <div className="flex gap-2.5 justify-between pt-2.5">
                      <Button
                        size={"sm"}
                        variant="link"
                        className="px-0 text-sm text-primary"
                        onClick={() => navigation.push("/dashboard/expenses")}
                      >
                        {t("Total expenses")}
                        <MoveUpRight />
                      </Button>
                      <Button
                        size={"sm"}
                        variant="link"
                        className="px-0 text-sm text-primary"
                        onClick={() => setShowExpenseForm(true)}
                      >
                        {t("Add expense")}
                        <CirclePlus />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SkeletonWrapper>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <AddExpenseModal
        open={showExpenseForm}
        onOpenChange={setShowExpenseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
}
