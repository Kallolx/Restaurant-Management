"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DownloadNidModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nidImages: string[];
}

export function DownloadNidModal({
  open,
  onOpenChange,
  nidImages,
}: DownloadNidModalProps) {
  const handleDownload = () => {
    // Handle NID download logic here
    console.log("Downloading NID...");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] p-0">
        <div className="flex flex-col">
          {/* Header */}
          <DialogTitle className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className="text-xl font-medium">Download NID</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Check & verify NID before downloading it
              </p>
            </div>
          </DialogTitle>

          {/* NID Images */}
          <ScrollArea className="max-h-[400px]">
            <div className="p-4 space-y-4">
              {nidImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[16/9] rounded-lg overflow-hidden border"
                >
                  <Image
                    src={image}
                    alt={`NID Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="flex justify-end gap-2 p-4 border-t">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDownload}
              className={cn(
                "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                "hover:from-blue-600 hover:to-purple-600"
              )}
            >
              Download NID
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
