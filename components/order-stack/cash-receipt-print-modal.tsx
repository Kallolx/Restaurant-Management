"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { OrderReceiptData } from "@/types/receipt";
import { useEffect, useRef } from "react";
import QRCode from "react-qr-code";

interface CashReceiptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: OrderReceiptData;
}

export default function CashReceiptPrintModal({
  open,
  onOpenChange,
  orderData,
}: CashReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = receiptRef.current;
    if (!printContent) return;

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;

    window.print();
    document.body.innerHTML = originalContents;

    // Rehydrate React
    window.location.reload();
  };

  useEffect(() => {
    if (open) {
      // Automatically trigger print when modal opens
      setTimeout(() => {
        handlePrint();
      }, 500);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[380px]">
        <div ref={receiptRef} className="font-mono text-sm max-h-max">
          {/* Receipt Content */}
          <DialogTitle className="text-center space-y-2 mb-6">
            <p className="text-xl font-bold">Cash Receipt</p>
            <p className="text-secondary-foreground text-base">
              {orderData.shopName}
            </p>
            <p className="text-secondary-foreground text-base">
              Token number {orderData.tokenNumber}
            </p>
          </DialogTitle>

          <div className="space-y-1 mb-4">
            <div className="flex justify-between">
              <span>Table no:</span>
              <span>{orderData.tableNo}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{orderData.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Tel:</span>
              <span>{orderData.tel}</span>
            </div>
          </div>

          <div className="border-t border-dotted border-black my-4" />

          {/* Items Table */}
          <div className="space-y-2 mb-2.5">
            <div className="flex justify-between font-bold">
              <span className="w-1/2">Name</span>
              <span className="w-1/4 text-center">Qty</span>
              <span className="w-1/4 text-right">Total</span>
            </div>
            {orderData?.items?.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="w-1/2">{item.name}</span>
                <span className="w-1/4 text-center">{item.quantity}</span>
                <span className="w-1/4 text-right">
                  {item.price.toFixed(2)}Tk
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-black my-4" />

          {/* Totals */}
          <div className="space-y-1 mb-4">
            <div className="flex justify-between">
              <span>Price</span>
              <span>{orderData?.subtotal?.toFixed(2)}Tk</span>
            </div>
            <div className="flex justify-between">
              <span>VAT</span>
              <span>{orderData.vat.toFixed(2)}Tk</span>
            </div>
          </div>

          <div className="border-t border-black my-4" />

          <div className="flex justify-between font-bold mb-4">
            <span>Total</span>
            <span>{orderData?.totalPrice?.toFixed(2)}Tk</span>
          </div>

          <div className="border-t border-dotted border-black my-4" />

          {/* Footer */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <QRCode
                value={`Receipt:${orderData.tokenNumber}`}
                size={100}
                style={{ height: "auto", maxWidth: "100px", width: "100%" }}
              />
            </div>
            <p className="">Thank You!</p>
          </div>
        </div>
      </DialogContent>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: 80mm 297mm;
          }
          body {
            margin: 1.5mm;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </Dialog>
  );
}
