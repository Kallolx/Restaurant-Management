"use client";

import CashReceiptPrintModal from "@/components/order-stack/cash-receipt-print-modal";
import OrderReceiptModal from "@/components/order-stack/order-reciept-modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateMockOrders } from "@/data/mock-orders";
import { useOrderFiltering } from "@/hooks/use-order-filtering";
import { OrderHistory } from "@/types/order-history";
import { format } from "date-fns";
import { Eye, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderFilterPopover } from "./order-filter-popover";
import { PaginationSection } from "./order-history-table-pagination";
import { QuickFilter } from "./quick-filter";

export function OrderHistoryTable() {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showCashReceiptPrintModal, setShowCashReceiptPrintModal] =
    useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);

  useEffect(() => {
    const mockOrders = generateMockOrders() as OrderHistory[];
    setOrders(mockOrders);
  }, []);

  const {
    filteredOrders,
    filterType,
    customDate,
    quickFilterDays,
    handleFilterTypeChange,
    handleCustomDateChange,
    handleQuickFilterChange,
  } = useOrderFiltering(orders);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, customDate, quickFilterDays]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] rounded-lg border bg-card">
      <div className="flex gap-4 border-b p-4 flex-row items-center justify-between flex-wrap">
        <div>
          <h2 className="text-sm font-medium">Order History</h2>
          <div className="text-sm text-muted-foreground">
            {quickFilterDays ? `Last ${quickFilterDays} days` : "All orders"}
          </div>
        </div>
        <div className="flex gap-2 flex-row items-center">
          <QuickFilter
            value={quickFilterDays}
            onChange={handleQuickFilterChange}
          />
          <OrderFilterPopover
            trigger={
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            }
            filterType={filterType}
            customDate={customDate}
            onFilterTypeChange={handleFilterTypeChange}
            onCustomDateChange={handleCustomDateChange}
          />
        </div>
      </div>

      <div className="min-h-0 overflow-auto custom-scrollbar">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 bg-card whitespace-nowrap">
                Order date
              </TableHead>
              <TableHead className="sticky top-0 bg-card whitespace-nowrap">
                Time
              </TableHead>
              <TableHead className="sticky top-0 bg-card whitespace-nowrap">
                Order no
              </TableHead>
              <TableHead className="sticky top-0 bg-card whitespace-nowrap">
                Order type
              </TableHead>
              <TableHead className="sticky top-0 bg-card whitespace-nowrap">
                Food menu
              </TableHead>
              <TableHead className="sticky top-0 bg-card whitespace-nowrap text-right">
                Total items
              </TableHead>
              <TableHead className="sticky top-0 bg-card whitespace-nowrap text-right">
                Pay bill
              </TableHead>
              <TableHead className="sticky top-0 bg-card whitespace-nowrap text-center">
                Detail
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="whitespace-nowrap">
                  {order.date ? format(order.date, "dd/MM/yyyy") : "-"}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {order.date ? format(order.date, "h:mm a") : "-"}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  #{order.orderNo}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {order.type}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {order.items.map((item) => item.name).join(", ")}
                </TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  ৳{order?.total?.toFixed(2)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      setSelectedOrder(order as OrderHistory);
                      setShowReceiptModal(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <OrderReceiptModal
        open={showReceiptModal}
        onOpenChange={() => setShowReceiptModal(false)}
        orderData={{
          date: selectedOrder ? format(selectedOrder.date, "dd/MM/yyyy") : "",
          tableNo: selectedOrder?.tableNo || 0,
          foodItems: selectedOrder?.items.map((item) => item.name) || [],
          totalItems:
            selectedOrder?.items.reduce(
              (acc, item) => acc + item.quantity,
              0
            ) || 0,
          price: selectedOrder?.total ?? 0,
          vat: (selectedOrder?.total ?? 0) * 0.05,
          totalPrice: (selectedOrder?.total ?? 0) * 1.05,
        }}
        handlePrintReceipt={() => {
          setShowReceiptModal(false);
          setShowCashReceiptPrintModal(true);
        }}
      />

      {showCashReceiptPrintModal && (
        <CashReceiptPrintModal
          open={showCashReceiptPrintModal}
          onOpenChange={() => setShowCashReceiptPrintModal(false)}
          orderData={{
            date: selectedOrder ? format(selectedOrder.date, "dd/MM/yyyy") : "",
            tableNo: selectedOrder?.tableNo || 0,
            foodItems: selectedOrder?.items.map((item) => item.name) || [],
            totalItems:
              selectedOrder?.items.reduce(
                (acc, item) => acc + item.quantity,
                0
              ) || 0,
            price: selectedOrder?.total ?? 0,
            vat: (selectedOrder?.total ?? 0) * 0.05,
            totalPrice: (selectedOrder?.total ?? 0) * 1.05,
            items:
              selectedOrder?.items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })) || [],
            subtotal: selectedOrder?.total ?? 0,
            shopName: "Restaurant Name",
            tokenNumber: selectedOrder?.orderNo || "",
            tel: "123-456-789",
          }}
        />
      )}
    </div>
  );
}
