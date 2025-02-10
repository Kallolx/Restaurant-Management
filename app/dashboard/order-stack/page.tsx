"use client";

import CancelOrderModal from "@/components/order-stack/cancel-order-modal";
import CashReceiptPrintModal from "@/components/order-stack/cash-receipt-print-modal";
import CreateOrderModal from "@/components/order-stack/order-creation/create-order-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDownIcon, Edit2Icon, PrinterIcon } from "lucide-react";
import { useState } from "react";
import OrderReceiptModal from "../../../components/order-stack/order-reciept-modal";

interface OrderItem {
  id: string;
  date: string;
  table?: string;
  items: { name: string; quantity: number }[];
  totalItems: number;
  totalPrice: number;
  orderTime: string;
  status: string;
  customerName?: string;
  contactInfo?: string;
  specialRequest?: string;
}

const dineInOrders: OrderItem[] = [
  {
    id: "857",
    date: "12/06/2024",
    table: "08",
    items: [
      { name: "Burger", quantity: 2 },
      { name: "Ice-cream", quantity: 2 },
    ],
    totalItems: 6,
    totalPrice: 324.99,
    orderTime: "7:45PM",
    status: "Ready for serve",
  },
  {
    id: "847",
    date: "12/06/2024",
    table: "08",
    items: [
      { name: "Burger", quantity: 2 },
      { name: "Ice-cream", quantity: 2 },
    ],
    totalItems: 6,
    totalPrice: 324.99,
    orderTime: "7:45PM",
    status: "Ready for serve",
  },
  {
    id: "827",
    date: "12/06/2024",
    table: "08",
    items: [
      { name: "Burger", quantity: 2 },
      { name: "Ice-cream", quantity: 2 },
    ],
    totalItems: 6,
    totalPrice: 324.99,
    orderTime: "7:45PM",
    status: "Ready for serve",
  },
  // Add more orders as needed
];

const takeawayOrders: OrderItem[] = [
  {
    id: "857",
    date: "12/06/2024",
    items: [
      { name: "Burger", quantity: 2 },
      { name: "Ice-cream", quantity: 2 },
    ],
    totalItems: 3,
    totalPrice: 324.99,
    orderTime: "7:45PM",
    status: "Ready for takeaway",
    customerName: "Shafin ahmed",
    contactInfo: "info@gmail.com",
    specialRequest: "Its urgent",
  },
  // Add more orders as needed
];

function OrderCard({
  order,
  type,
}: {
  order: OrderItem;
  type: "dine-in" | "takeaway";
}) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showCreateEditOrderModal, setShowCreateEditOrderModal] =
    useState(false);
  const [showCashReceiptPrintModal, setShowCashReceiptPrintModal] =
    useState(false);

  return (
    <Card className="mb-3 overflow-hidden border border-[#FF9500]">
      <CardHeader className="flex flex-row items-center justify-between p-4 h-[46px] bg-main-background ">
        <div className="text-sm font-medium text-foreground">
          Order no: #{order.id}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Edit Order"
            onClick={(e) => {
              console.log("edit order clicked");
              setShowCreateEditOrderModal(true);
            }}
          >
            <Edit2Icon className="h-4 w-4 text-foreground" />
          </Button>
          <Button
            onClick={() => {
              setShowReceiptModal(true);
            }}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Print"
          >
            <PrinterIcon className="h-4 w-4 text-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2.5">
        <div className="flex justify-between text-sm">
          <div className="text-foreground font-medium text-base">
            Order date: {order.date}
          </div>

          <label className="flex items-center gap-1.5">
            <Checkbox />
            Paid
          </label>
        </div>

        {type === "dine-in" && (
          <div className="flex items-center justify-between gap-1.5">
            <div className="text-foreground font-medium text-base">
              Table no: {order.table}
            </div>

            <label className="flex items-center gap-1.5">
              <Checkbox />
              Ready for serve
            </label>
          </div>
        )}

        <div className="flex items-center justify-between gap-1.5">
          <div className="text-foreground font-medium text-base">
            Total item: {order.totalItems}
          </div>
          {type === "takeaway" && (
            <label className="flex items-center gap-1.5">
              <Checkbox />
              Ready for serve
            </label>
          )}
        </div>

        <div className="text-foreground font-medium text-base">
          Order item:{" "}
          {order.items.map((item, index) => (
            <span key={index} className="font-normal">
              {item.name} × {item.quantity}
              {index < order.items.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>

        <div className="text-foreground font-medium text-base">
          Total price: $ {order.totalPrice}
        </div>

        {type === "takeaway" && (
          <>
            <div className="text-foreground font-medium text-base">
              Customer name: {order.customerName}
            </div>
            <div className="text-foreground font-medium text-base">
              Contact info: {order.contactInfo}
            </div>
            <div className="text-foreground font-medium text-base">
              Special request: {order.specialRequest}
            </div>
          </>
        )}

        <div className=" flex items-center justify-between">
          <span className="text-foreground font-medium text-base">
            Order time: {order.orderTime}
          </span>
          <div className="flex items-center gap-1.5">
            <Button size={"sm"} variant="primary">
              Complete
            </Button>
            <Button
              onClick={() => {
                console.log("click cancel order");
                setShowCancelModal(true);
              }}
              size={"sm"}
              variant="outline"
              className="text-destructive border-destructive/50 hover:bg-destructive/20 hover:text-destructive"
            >
              Cancel
            </Button>
          </div>

          <CancelOrderModal
            isOpen={showCancelModal}
            onClose={() => setShowCancelModal(false)}
            onConfirm={() => {
              // Handle order cancellation
              setShowCancelModal(false);
            }}
          />

          {/* <CreateEditOrderModal
            isOpen={showCreateEditOrderModal}
            setIsOpen={() => setShowCreateEditOrderModal(false)}
          /> */}
          <CreateOrderModal
            open={showCreateEditOrderModal}
            onOpenChange={() => setShowCreateEditOrderModal(false)}
          />

          <OrderReceiptModal
            open={showReceiptModal}
            onOpenChange={() => setShowReceiptModal(false)}
            orderData={{
              date: "10/10/24",
              tableNo: 12,
              foodItems: [
                "Grilled Chicken",
                "Beef Burger",
                "Another item",
                "Another item 2",
              ],
              totalItems: 4,
              price: 2460.0,
              vat: 140.0,
              totalPrice: 2600.0,
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
                date: "10/10/24",
                tableNo: 12,
                foodItems: [
                  "Grilled Chicken",
                  "Beef Burger",
                  "Another item",
                  "Another item 2",
                ],
                totalItems: 4,
                price: 2460.0,
                vat: 140.0,
                totalPrice: 2600.0,
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function OrderColumn({
  title,
  orders,
  type,
}: {
  title: string;
  orders: OrderItem[];
  type: "dine-in" | "takeaway";
}) {
  return (
    <ScrollArea className="flex flex-col rounded-lg border bg-background p-4 h-[calc(100vh-135px)] relative pb-16 mobile-md:h-max overflow-y-visible">
      <div className="pb-4 sticky top-0 bg-background">
        <h2 className="mb-2 text-lg font-semibold text-foreground">{title}</h2>
        <div className="px-1">
          <Input placeholder="Search by table no." />
        </div>
      </div>
      <div className="">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} type={type} />
        ))}
      </div>
      <div className="absolute left-0 right-0 bottom-0 flex justify-center bg-white py-4 mt-auto mobile-md:hidden">
        <Button variant="default" size="sm" className="flex items-center gap-2">
          Scroll down
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </div>
    </ScrollArea>
  );
}

export default function OrderStackPage() {
  return (
    <div className="">
      <h1 className="text-2xl font-medium mb-3">Order Stack</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OrderColumn
          title={`Today Total Dine in Orders (${dineInOrders.length})`}
          orders={dineInOrders}
          type="dine-in"
        />
        <OrderColumn
          title={`Today Total Takeaway Orders (${takeawayOrders.length})`}
          orders={takeawayOrders}
          type="takeaway"
        />
      </div>
    </div>
  );
}
