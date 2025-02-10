"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRBAC } from "@/hooks/useRBAC";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MAX_PRIMARY_ITEMS = 4;

export function BottomNavigation() {
  const pathname = usePathname();
  const { getSidebarItems } = useRBAC();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const allNavItems = getSidebarItems();
  const primaryNavItems = allNavItems.slice(0, MAX_PRIMARY_ITEMS);
  const moreNavItems = allNavItems.slice(MAX_PRIMARY_ITEMS);

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-gray-200 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {primaryNavItems.map((item) => (
          <BottomNavItem
            key={item.id}
            item={item}
            isActive={item.pathnameMatcher.includes(pathname)}
          />
        ))}

        <Popover open={isMoreOpen} onOpenChange={setIsMoreOpen}>
          <PopoverTrigger asChild>
            <button className="inline-flex flex-col items-center justify-center px-5 group">
              <MoreHorizontal className="w-6 h-6 mb-1 text-gray-800 group-hover:text-black" />
              <span className="text-xs text-gray-800 group-hover:text-black">
                More
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-screen max-w-[200px] p-2" align="end">
            <div className="space-y-1">
              {moreNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent",
                    item.pathnameMatcher.includes(pathname) &&
                      "bg-accent text-accent-foreground"
                  )}
                  onClick={() => setIsMoreOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}

function BottomNavItem({
  item,
  isActive,
}: {
  item: SidebarNavItem;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.link}
      className={cn(
        "inline-flex flex-col items-center justify-center px-5 group",
        isActive && "text-black"
      )}
    >
      <Icon
        className={cn(
          "w-6 h-6 mb-1 transition-all",
          isActive ? " fill-black" : " fill-gray-800 group-hover:fill-black"
        )}
      />
      <span
        className={cn(
          "text-xs whitespace-nowrap transition-all font-medium",
          isActive ? "text-black" : "text-gray-800 group-hover:text-black"
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}
