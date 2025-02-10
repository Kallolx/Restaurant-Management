"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Report } from "@/types/report-feedback";
import { Download, FileText, Printer } from "lucide-react";

interface ReportsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reports: Report[];
}

export function ReportsModal({
  open,
  onOpenChange,
  reports,
}: ReportsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Restaurant Reports</DialogTitle>
          <p className="text-sm text-muted-foreground">
            View restaurant all previous reports
          </p>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">{report.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    <Printer className="mr-2 h-3 w-3" />
                    Print
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
