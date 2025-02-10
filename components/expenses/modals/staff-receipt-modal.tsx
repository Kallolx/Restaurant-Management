"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

interface StaffReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    employeeName: string;
    role: string;
    dueAmount: number;
    receiptNo: string;
  };
}

export function StaffReceiptModal({
  isOpen,
  onClose,
  data,
}: StaffReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && receiptRef.current) {
      const timeout = setTimeout(() => {
        window.print();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      <style jsx global>{`
        @media print {
          body > *:not(.receipt-print-area) {
            display: none !important;
          }

          .receipt-print-area {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
          }

          @page {
            size: 80mm 297mm;
            margin: 0;
          }

          .receipt-content {
            max-height: none !important;
            border: none !important;
            padding: 1rem !important;
            width: 80mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
          }
        }
      `}</style>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="print:shadow-none sm:max-w-[380px]">
          <div ref={receiptRef} className="receipt-content space-y-6 p-6">
            <div>
              <h1 className="text-center">Staff Salary Receipt</h1>
            </div>
            <div className="space-y-6 print:space-y-4">
              <div className="text-center">
                <div className="text-lg font-semibold">Restaurant name</div>
                <div className="text-sm text-muted-foreground">
                  Receipt no #{data.receiptNo}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Employee name:</span>
                  <span>{data.employeeName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span>{data.role}</span>
                </div>
                <div className="flex justify-between">
                  <span>Salary due month:</span>
                  <span>{format(new Date(), "MMMM")}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-3 font-medium">
                  <div>Particulars</div>
                  <div className="text-center">SL</div>
                  <div className="text-right">Total</div>
                </div>
                <div className="grid grid-cols-3">
                  <div>Due salary</div>
                  <div className="text-center">1</div>
                  <div className="text-right">
                    {formatPrice(data.dueAmount)}
                  </div>
                </div>
                <div className="border-t pt-2">
                  <div className="grid grid-cols-3 font-medium">
                    <div className="col-span-2">Total</div>
                    <div className="text-right">
                      {formatPrice(data.dueAmount)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="h-32 w-32 bg-black"></div>
                <div className="text-center font-medium">Thank You!</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
