"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type Order } from "@/types/manager-dashboard";
import { Edit, Printer, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { OrderItemsModal } from "./order-items-modal";
import { OrderPaymentModal } from "./order-payment-modal";

export function DashboardOrderStack({
  orders: initialOrders,
}: {
  orders: Order[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showItems, setShowItems] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order
      )
    );
  };

  const handleReadyToServe = (orderId: string) => {
    updateOrder(orderId, { isReadyToServe: true });
  };

  const handlePayment = (order: Order) => {
    setSelectedOrder(order);
    setShowPayment(true);
  };

  const handlePaymentConfirm = () => {
    if (selectedOrder) {
      updateOrder(selectedOrder.id, { isPaid: true });
      setShowPayment(false);
    }
  };

  const handleComplete = (orderId: string) => {
    updateOrder(orderId, { isCompleted: true });
  };

  const handleViewItems = (order: Order) => {
    setSelectedOrder(order);
    setShowItems(true);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">Order Stack</CardTitle>
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        </div>
        <Link
          href={"/dashboard/order-stack"}
          className="text-base text-primary underline h-auto p-0"
        >
          View details
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-start justify-between border rounded-lg p-4 w-full"
          >
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Order no-{order.orderNo}</span>
                  <span className="text-sm text-muted-foreground">
                    {order.time}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>Items: {order.items[0].name},</span>
                {order.items.length > 1 && (
                  <Button
                    variant="link"
                    className="text-xs text-blue-500 h-auto p-0"
                    onClick={() => handleViewItems(order)}
                  >
                    See all
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>Total Item: {order.totalItems}</span>
                <span>Price: ৳ {order.price}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`ready-${order.id}`}
                    checked={order.isReadyToServe}
                    onCheckedChange={() => handleReadyToServe(order.id)}
                  />
                  <label
                    htmlFor={`ready-${order.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ready for serve
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`paid-${order.id}`}
                    checked={order.isPaid}
                    onCheckedChange={() => handlePayment(order)}
                  />
                  <label
                    htmlFor={`paid-${order.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Paid
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className={cn("h-8 text-xs", {
                    "bg-green-100 text-green-700": order.isCompleted,
                    "bg-blue-100 text-blue-700": !order.isCompleted,
                  })}
                  disabled={order.isCompleted}
                  onClick={() => handleComplete(order.id)}
                >
                  {order.isCompleted ? "Completed" : "Complete"}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      {selectedOrder && (
        <>
          <OrderItemsModal
            open={showItems}
            onClose={() => setShowItems(false)}
            orderNo={selectedOrder.orderNo}
            items={selectedOrder.items}
          />
          <OrderPaymentModal
            open={showPayment}
            onClose={() => setShowPayment(false)}
            total={selectedOrder.price}
            onConfirm={handlePaymentConfirm}
          />
        </>
      )}
    </Card>
  );
}
