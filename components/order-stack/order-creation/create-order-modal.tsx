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
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-medium">
                      Add Customer Order
                    </h2>
                    <p className="text-sm font-normal text-muted-foreground">
                      Fill up the form below to place an order
                    </p>
                  </div>

                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <Tabs
                      value={orderType}
                      onValueChange={(value) =>
                        setOrderType(value as OrderType)
                      }
                      className="w-full sm:w-auto"
                    >
                      <TabsList className="flex items-center justify-between">
                        <TabsTrigger value="dine-in">
                          Dine-in
                          <span className="mobile-sm:hidden">Order</span>
                        </TabsTrigger>
                        <TabsTrigger value="takeaway">
                          Takeaway
                          <span className="mobile-sm:hidden">Order</span>
                        </TabsTrigger>
                        <TabsTrigger value="home-delivery">
                          Home delivery
                          <span className="mobile-sm:hidden">Order</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onOpenChange(false)}
                      className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground border border-border rounded-full flex p-4 items-center justify-center"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogTitle>

            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,400px] h-[calc(100vh-101px)] overflow-hidden">
              {/* Left Section */}
              <div className="overflow-auto p-4 mobile-md:pb-16">
                <div className="space-y-4">
                  <div className="bg-background rounded-lg border p-6">
                    <OrderDetails orderType={orderType} />
                  </div>
                  <div className="bg-background rounded-lg border p-6">
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
            <div className="sm:hidden fixed bottom-0 h-16 left-0 right-0 bg-background border-t flex items-center justify-center px-4">
              <Button
                className="w-full bg-primary"
                onClick={() => setShowMobileCart(true)}
                variant={"primary"}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Cart ({selectedItems.length} items)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Cart Drawer */}
      <Drawer open={showMobileCart} onOpenChange={setShowMobileCart}>
        <DrawerContent className="flex flex-col">
          <DrawerHeader className="border-b px-4">
            <DrawerTitle>Your Cart</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 flex flex-col min-h-0">
            <OrderCart
              items={selectedItems}
              onQuantityChange={handleQuantityChange}
              onOpenOrder={() => {
                setShowMobileCart(false);
                handleOpenOrder();
              }}
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
