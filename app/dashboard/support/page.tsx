"use client";

import { FAQ } from "@/components/support/faq";
import { SupportTicket } from "@/components/support/support-ticket";
import { TicketHistory } from "@/components/support/ticket-history";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="h-full overflow-hidden">
      <h1 className="text-2xl font-medium mb-3">Help & Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-5 h-[calc(100vh-132px)]">
        {/* Left Column */}
        <div className="bg-background rounded-lg border flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-background">
            <h2 className="text-xl font-medium">Support Ticket</h2>
            <p className="text-muted-foreground mb-4">
              Create a support ticket to get help from our support team
            </p>
            <SupportTicket />
          </div>
          <div className="flex-1 overflow-hidden ">
            <ScrollArea className="h-[calc(100vh-330px)]">
              <div className="p-4">
                <TicketHistory />
              </div>
            </ScrollArea>
          </div>
          <div className="flex items-center justify-center bg-background py-1.5">
            <Button variant="default" size="sm" className="">
              <ChevronDown className="h-4 w-4" />
              Scroll down
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-background rounded-lg border flex flex-col overflow-hidden">
          <div className="p-6 border-b bg-background">
            <h2 className="text-xl font-medium">What can we help you find?</h2>
            <p className="text-muted-foreground">
              Frequently Asked Questions(FAQ)
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-4">
                <FAQ />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
