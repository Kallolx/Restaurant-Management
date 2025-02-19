"use client";

import { useLanguage } from "@/providers/language-provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
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

// Create axios instance
const publicAxios = axios.create({
  baseURL: 'https://api.hishabx.io'
});

interface MenuPageClientProps {
  restaurantId: string;
}

export default function MenuPageClient({ restaurantId }: MenuPageClientProps) {
  const { t } = useLanguage();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [menuSettings, setMenuSettings] = useState({
    selectedTheme: '',
    opacity: 30,
    textColor: '#FFFFFF'
  });

  // Fetch restaurant settings
  const { data: restaurantSettings } = useQuery({
    queryKey: ['restaurant-settings', restaurantId],
    queryFn: async () => {
      try {
        const response = await publicAxios.get(`/api/restaurants/${restaurantId}/settings/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
      }
    }
  });

  // Fetch menu items
  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["menu-items", restaurantId],
    queryFn: async () => {
      const response = await publicAxios.get(`/api/restaurants/${restaurantId}/menu/`);
      return response.data;
    }
  });

  // Update settings when they change from API
  useEffect(() => {
    if (restaurantSettings) {
      setMenuSettings({
        selectedTheme: restaurantSettings.menu_wallpaper?.uuid || '',
        opacity: restaurantSettings.background_opacity || 30,
        textColor: restaurantSettings.text_color || '#FFFFFF'
      });
    }
  }, [restaurantSettings]);

  // Get current wallpaper URL directly from settings
  const wallpaperUrl = restaurantSettings?.menu_wallpaper?.image_url || '';

  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.type === "food" ? "Food" : "Drinks";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading menu...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${wallpaperUrl})`,
          opacity: menuSettings.opacity / 100,
        }}
      />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/90 px-8 py-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="HungryHub" className="h-10 w-10" />
            <div>
              <h1 className="font-bold">HungryHub</h1>
              <p className="text-sm text-gray-500">Online Food Menu</p>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="mt-8 px-4 pb-20">
          {Object.entries(groupedItems).map(([category, items], index) => (
            <div key={category} className="mb-6">
              <h2
                className={`text-lg font-medium bg-orange-400 text-${menuSettings.textColor} px-2 py-1 rounded-lg mb-4 w-1/2 
                ${index % 2 === 0 ? "self-start text-left" : "self-end text-right ml-auto"}`}
              >
                {category}
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.uuid} className="flex items-center gap-4 bg-white/90 p-4 rounded-lg">
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

        {/* Feedback and Report Modals */}
        {/* ... rest of your modal code ... */}
      </div>
    </div>
  );
} 