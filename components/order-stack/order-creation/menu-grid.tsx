"use client";

import { Input } from "@/components/ui/input";
import { menuItems } from "@/lib/constants/menu-items";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
}

interface MenuGridProps {
  selectedItems: string[];
  onItemSelect: (item: MenuItem) => void;
}

export function MenuGrid({ selectedItems, onItemSelect }: MenuGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`relative cursor-pointer rounded-lg border transition-all hover:shadow-md ${
              selectedItems.includes(item.id)
                ? "border-primary ring-2 ring-primary ring-opacity-50"
                : "border-border"
            }`}
            onClick={() => onItemSelect(item)}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="rounded-t-lg object-cover"
              />
              {item.discount && (
                <div className="absolute right-2 top-2 rounded bg-destructive px-2 py-1 text-xs text-destructive-foreground">
                  {item.discount}% OFF
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium">{item.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                {item.discount ? (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      ৳ {item.price}
                    </span>
                    <span className="font-medium">
                      ৳ {(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="font-medium">৳ {item.price}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
