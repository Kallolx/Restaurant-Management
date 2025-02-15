"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import CashReceiptPrintModal from "../cash-receipt-print-modal";
import OrderReceiptModal from "../order-reciept-modal";
import { MenuGrid } from "./menu-grid";
import { OrderCart } from "./order-cart";
import { OrderDetails } from "./order-details";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CreateOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type OrderType = "dine-in" | "takeaway" | "home-delivery";

export default function CreateOrderModal({
  open,
  onOpenChange,
}: CreateOrderModalProps) {
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showCashReceiptModal, setShowCashReceiptModal] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);

  const handleItemSelect = (item: {
    id: string;
    name: string;
    price: number;
  }) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setSelectedItems(
      selectedItems
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleOpenOrder = () => {
    setShowReceiptModal(true);
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const calculateVAT = () => {
    return Number((calculateSubtotal() * 0.05).toFixed(2));
  };

  const calculateTotal = () => {
    return Number((calculateSubtotal() * 1.05).toFixed(2));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-max max-h-max p-0"
          closeClassName="hidden"
          overlayClassName="p-0"
        >
          <div className="flex flex-col bg-main-background w-screen h-screen">
            {/* Header */}
            <DialogTitle className="bg-background border-b">
              <div className="p-4 mobile-md:p-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium mobile-md:text-lg">
                      Add Customer Order
                    </h2>
                    <p className="text-sm font-normal text-muted-foreground mobile-md:text-xs">
                      Fill up the form below to place an order
                    </p>
                  </div>

                  <div className="w-full sm:w-auto">
                    <Tabs
                      defaultValue="dine-in"
                      value={orderType}
                      onValueChange={(value) => setOrderType(value as OrderType)}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-3 h-9 mobile-md:h-8">
                        <TabsTrigger value="dine-in" className="text-sm mobile-md:text-xs">Dine in</TabsTrigger>
                        <TabsTrigger value="takeaway" className="text-sm mobile-md:text-xs">Takeaway</TabsTrigger>
                        <TabsTrigger value="home-delivery" className="text-sm mobile-md:text-xs">
                          Home Delivery
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </div>
            </DialogTitle>

            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,400px] h-[calc(100vh-101px)] overflow-hidden">
              {/* Left Section */}
              <div className="overflow-auto p-4 mobile-md:p-3 mobile-md:pb-20">
                <div className="space-y-4">
                  <div className="bg-background rounded-lg border p-6 mobile-md:p-4">
                    <OrderDetails orderType={orderType} />
                  </div>
                  <div className="bg-background rounded-lg border p-6 mobile-md:p-4">
                    <MenuGrid
                      selectedItems={selectedItems.map((item) => item.id)}
                      onItemSelect={handleItemSelect}
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Cart Section */}
              <div className="hidden sm:block bg-background border-l overflow-auto">
                <OrderCart
                  items={selectedItems}
                  onQuantityChange={handleQuantityChange}
                  onOpenOrder={handleOpenOrder}
                />
              </div>
            </div>

            {/* Mobile Cart Button */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
              <div className="p-4 mobile-md:p-3">
                <Button
                  className="w-full bg-primary h-12 mobile-md:h-10 text-base mobile-md:text-sm"
                  onClick={() => setShowMobileCart(true)}
                  variant="primary"
                >
                  <ShoppingCart className="mr-2 h-5 w-5 mobile-md:h-4 mobile-md:w-4" />
                  View Cart ({selectedItems.length} items)
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Cart Drawer */}
      <Drawer open={showMobileCart} onOpenChange={setShowMobileCart}>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader className="border-b p-4 mobile-md:p-3">
            <DrawerTitle className="text-lg mobile-md:text-base">Order Cart</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-auto p-4 mobile-md:p-3">
            <OrderCart
              items={selectedItems}
              onQuantityChange={handleQuantityChange}
              onOpenOrder={handleOpenOrder}
            />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Receipt Modals */}
      <OrderReceiptModal
        open={showReceiptModal}
        onOpenChange={setShowReceiptModal}
        orderData={{
          date: new Date().toLocaleDateString(),
          tableNo: 1,
          foodItems: selectedItems.map((item) => item.name),
          totalItems: selectedItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
          price: calculateSubtotal(),
          vat: calculateVAT(),
          totalPrice: calculateTotal(),
        }}
        handlePrintReceipt={() => {
          setShowReceiptModal(false);
          setShowCashReceiptModal(true);
        }}
      />

      {showCashReceiptModal && (
        <CashReceiptPrintModal
          open={showCashReceiptModal}
          onOpenChange={setShowCashReceiptModal}
          orderData={{
            date: new Date().toLocaleDateString(),
            tableNo: 1,
            foodItems: selectedItems.map((item) => item.name),
            totalItems: selectedItems.reduce(
              (acc, item) => acc + item.quantity,
              0
            ),
            price: calculateSubtotal(),
            vat: calculateVAT(),
            totalPrice: calculateTotal(),
            items: selectedItems.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
            shopName: "Your Restaurant",
            tokenNumber: "123",
            tel: "123-456-789",
          }}
        />
      )}
    </>
  );
}
