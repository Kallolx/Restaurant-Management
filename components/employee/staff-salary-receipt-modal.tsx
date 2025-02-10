"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import { useEffect, useRef } from "react";

interface StaffSalaryReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    name: string;
    role: string;
    salaryMonth: string;
    salary: number;
    bonus: number;
    others: number;
  };
}

export function StaffSalaryReceiptModal({
  open,
  onOpenChange,
  data,
}: StaffSalaryReceiptModalProps) {
  const total = data.salary + data.bonus + data.others;
  const receiptNo = Math.floor(100000 + Math.random() * 900000);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && receiptRef.current) {
      const timeout = setTimeout(() => {
        window.print();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [open]);

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

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="print:shadow-none sm:max-w-[400px]">
          <div
            ref={receiptRef}
            className="receipt-print-area receipt-content space-y-6 p-6"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Staff Salary Receipt</h2>
              <p className="text-lg">Restaurant name</p>
              <p className="text-sm text-muted-foreground">
                Receipt no #{receiptNo}
              </p>
            </div>

            {/* Employee Info */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Employee name:</span>
                <span>{data.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Role:</span>
                <span>{data.role}</span>
              </div>
              <div className="flex justify-between">
                <span>Salary month:</span>
                <span>{data.salaryMonth}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed" />

            {/* Payment Details */}
            <div>
              <div className="grid grid-cols-[1fr,100px,100px] gap-4 text-sm">
                <div>Particulars</div>
                <div className="text-center">SL</div>
                <div className="text-right">Total</div>
              </div>
              <div className="mt-2 space-y-2">
                <div className="grid grid-cols-[1fr,100px,100px] gap-4">
                  <div>Salary</div>
                  <div className="text-center">1</div>
                  <div className="text-right">{data.salary}Tk</div>
                </div>
                <div className="grid grid-cols-[1fr,100px,100px] gap-4">
                  <div>Bonus</div>
                  <div className="text-center">2</div>
                  <div className="text-right">{data.bonus}Tk</div>
                </div>
                <div className="grid grid-cols-[1fr,100px,100px] gap-4">
                  <div>Others</div>
                  <div className="text-center">3</div>
                  <div className="text-right">{data.others}Tk</div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{total}Tk</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center py-4">
              <QrCode className="h-32 w-32" />
            </div>

            {/* Thank You */}
            <div className="text-center">
              <p className="text-lg font-medium">Thank You!</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
