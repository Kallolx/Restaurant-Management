"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight } from "lucide-react";
import { TimeRange, TimeRangeSelect } from "./time-range-select";

const topSellingItems = [
  { name: "Grilled Chicken", units: 125 },
  { name: "Beef Burger", units: 125 },
  { name: "Fish & Chips", units: 125 },
];

const lowSellingItems = [
  { name: "Caesar Salad", units: 38 },
  { name: "Mushroom Soup", units: 25 },
  { name: "Green Salad", units: 18 },
];

export function SalesStats() {
  const handleTimeRangeChange = (range: TimeRange) => {};
  return (
    <Card>
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-medium">Sales Stats</h2>
        <TimeRangeSelect onChange={handleTimeRangeChange} />
      </div>

      <div className="p-4">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">Items (Top sell)</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingItems.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.units}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Items (Low sell)</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowSellingItems.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.units}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" className="gap-2">
            View Details
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
