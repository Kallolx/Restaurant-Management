"use client";

import { useLanguage } from "@/providers/language-provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MenuItem {
  uuid: string;
  name: string;
  price: number;
  description: string;
  image: string;
  type: "food" | "drinks";
}

export default function PublicMenuPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const { t } = useLanguage();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["public-menu", params.restaurantId],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.hishabx.io/api/restaurants/${params.restaurantId}/menu/`
      );
      return response.data;
    },
  });

  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.type === "food" ? "Food" : "Drinks";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-8 py-5 flex items-center justify-between fixed top-0 left-0 right-0 z-50 border-b">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="HungryHub" className="h-10 w-10" />
          <div>
            <h1 className="font-bold">HungryHub</h1>
            <p className="text-sm text-gray-500">Online Food Menu</p>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mt-16 px-4 py-2">
        <div className="space-y-2">
          <div className="mt-6 w-full flex items-center justify-center text-sm text-gray-500 mb-1">
            This display is for viewing the food menu only
          </div>
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="w-full bg-gray-50 px-4 py-3 rounded-lg flex items-center justify-between border border-gray-300"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <span className="font-bold text-gray-600">Submit feedback</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="w-full bg-gray-50 px-4 py-3 rounded-lg flex items-center justify-between border border-gray-300"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="font-bold text-gray-600">
                Report a food issue
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="mt-8 px-4 pb-20">
        {Object.entries(groupedItems).map(([category, items], index) => (
          <div key={category} className="mb-6">
            <h2
              className={`text-lg font-medium bg-orange-400 text-white px-2 py-1 rounded-lg mb-4 w-1/2 
      ${
        index % 2 === 0 ? "self-start text-left" : "self-end text-right ml-auto"
      }`}
            >
              {category}
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.uuid} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="h-1"></div>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">
                        ৳ {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-auto py-4 px-4 border-t">
        <div className="bg-gray-50 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Powered by</span>
          <a 
            href="https://hishabx.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 text-blue-500 font-semibold"
          >
            Hishabx.io
          </a>
        </div>
      </footer>

      {/* Food Issue Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-semibold">
                  Report a Food Issue
                </DialogTitle>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Share your concerns about food quality, preparation, or
                presentation
              </p>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Report/Feedback code
                </label>
                <Input placeholder="#26" className="bg-gray-50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Name" className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact</label>
                  <Input placeholder="+880" className="bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Issue statement</label>
                <Textarea className="min-h-[100px] bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Report date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-50",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>dd/mm/yyyy</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 mt-4">
              <Button
                variant="ghost"
                className="text-red-500 flex-1"
                onClick={() => setIsReportModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex-1"
                onClick={() => {
                  // Handle submit logic here
                  setIsReportModalOpen(false);
                }}
              >
                Submit Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-semibold">
                  We Value Your Feedback
                </DialogTitle>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Your thoughts help us improve and serve you better
              </p>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Report/Feedback code
                </label>
                <Input placeholder="#26" className="bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Customer name & contact
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Name" className="bg-gray-50" />
                  <Input placeholder="+880" className="bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Feedback</label>
                <Textarea className="min-h-[100px] bg-gray-50" />
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 mt-4">
              <Button
                variant="ghost"
                className="text-red-500 flex-1"
                onClick={() => setIsFeedbackModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex-1"
                onClick={() => {
                  // Handle submit logic here
                  setIsFeedbackModalOpen(false);
                }}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
