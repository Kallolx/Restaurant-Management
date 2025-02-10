"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useState } from "react";
import { SalesOverviewModal } from "./sales-overview-day-modal";
import { DailySale } from "./types";

interface SalesTableProps {
  sales: DailySale[];
  currentMonth: string;
}

export function SalesTable({ sales, currentMonth }: SalesTableProps) {
  const [selectedSale, setSelectedSale] = useState<DailySale | null>(null);
  const [showOverview, setShowOverview] = useState(false);

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* <div className="text-sm text-muted-foreground">Date: {currentMonth}</div> */}
      {sales && sales.length > 0 ? (
        <Table>
          <TableHeader className="bg-secondary rounded-t-lg">
            <TableRow>
              <TableHead className="w-[150px] whitespace-nowrap">
                Date
              </TableHead>
              <TableHead>Sales items</TableHead>
              <TableHead className="text-right whitespace-nowrap">
                Total sales
              </TableHead>
              <TableHead className="w-[100px] whitespace-nowrap">
                Show details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.date}>
                <TableCell className="text-foreground text-base font-medium whitespace-nowrap">
                  {sale.date}
                </TableCell>
                <TableCell className="max-w-[400px] truncate text-base">
                  {sale.salesItems}
                </TableCell>
                <TableCell className="text-right font-medium text-lg">
                  ${sale.totalSales.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedSale(sale);
                      setShowOverview(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4">
          No sales data available for the selected period.
        </div>
      )}

      {selectedSale && (
        <SalesOverviewModal
          open={showOverview}
          onOpenChange={setShowOverview}
          sale={selectedSale}
        />
      )}
    </div>
  );
}
