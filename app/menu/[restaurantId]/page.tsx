"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/providers/language-provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageSwitcher } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import { use } from "react";

interface MenuItem {
  uuid: string;
  name: string;
  price: string;
  description: string;
  image: string;
  is_available: boolean;
  type: "food" | "breverage";
  food_category_details: {
    uuid: string;
    name: string;
    bangla_name: string;
  };
  current_offer: null | {
    discount: number;
    end_date: string;
  };
  restaurant_settings: {
    wallpaper: {
      uuid: string;
      name: string;
      image_url: string;
      is_default: boolean;
    };
  };
}

export default function PublicMenuPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = use(params);
  const { t, language } = useLanguage();

  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["public-menu", restaurantId],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.hishabx.io/api/restaurants/${restaurantId}/menu/`
      );
      return response.data;
    },
  });

  const foodItems = menuItems.filter((item) => item.type === "food");
  const beverageItems = menuItems.filter((item) => item.type === "breverage");

  const wallpaper = menuItems[0]?.restaurant_settings?.wallpaper?.image_url;

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-lg font-medium">{t("Restaurant Menu")}</h1>
          <LanguageSwitcher />
        </div>
      </header>

      {wallpaper && (
        <div className="w-full h-48 relative mt-[60px]">
          <Image
            src={wallpaper}
            alt="Restaurant wallpaper"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <main className="container mx-auto px-4 py-8 -mt-16 relative">
        <Card className="p-4 md:p-6">
          <Tabs defaultValue="food" className="w-full">
            <ScrollArea className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="food" className="flex gap-2">
                  {t("Food")}
                  <Badge variant="secondary" className="ml-2">
                    {foodItems.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="beverages" className="flex gap-2">
                  {t("Beverages")}
                  <Badge variant="secondary" className="ml-2">
                    {beverageItems.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <TabsContent value="food" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {foodItems.map((item) => (
                  <MenuItemCard key={item.uuid} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beverages" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {beverageItems.map((item) => (
                  <MenuItemCard key={item.uuid} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  const { t, language } = useLanguage();
  
  return (
    <Card className="overflow-hidden group">
      <div className="aspect-video relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {!item.is_available && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="destructive">{t("Out of Stock")}</Badge>
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-medium text-base md:text-lg line-clamp-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-3 md:mt-4">
          <p className="font-medium">৳{item.price}</p>
          {item.current_offer && (
            <span className="text-sm text-destructive">
              {item.current_offer.discount}% OFF
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {language === "bn" 
            ? item.food_category_details.bangla_name 
            : item.food_category_details.name}
        </p>
      </div>
    </Card>
  );
} 