"use client";

import { Badge } from "@/components/ui/badge";

export function KitchenHeader() {
  return (
    <div className="flex items-center gap-2 p-4 border-b">
      <h2 className="text-xl font-medium">Running Orders</h2>
      <Badge variant="secondary" className="rounded-full">
        18
      </Badge>
      <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
    </div>
  );
}
