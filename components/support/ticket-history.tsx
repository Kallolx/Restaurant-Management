"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTickets } from "@/lib/constants/support-data";
import type { Ticket } from "@/types/support";
import { format } from "date-fns";
import { useState } from "react";
import { CreateTicketModal } from "./create-ticket-modal";

export function TicketHistory() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(
    undefined
  );

  return (
    <>
      <div className="relative flex flex-col h-full">
        <div className="space-y-4 flex-1">
          {mockTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-muted/50 rounded-lg p-4 grid grid-cols-2 gap-4"
            >
              <div>
                <div className="text-sm text-muted-foreground">
                  ST ID-#{ticket.id}
                </div>
                <div className="mt-1">Name: {ticket.name}</div>
                <div>Issue: {ticket.issue}</div>
                <div>Subject: {ticket.subject}</div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-sm text-muted-foreground">
                  Date: {format(ticket.date, "dd/MM/yyyy")}
                </div>
                <div>
                  Support status:{" "}
                  <Badge
                    variant={ticket.status === "open" ? "default" : "secondary"}
                  >
                    {ticket.status}
                  </Badge>
                </div>
                <div>Email: {ticket.email}</div>
                <Button
                  variant="link"
                  className="text-primary p-0 h-auto"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  Ticket Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateTicketModal
        open={!!selectedTicket}
        onOpenChange={(open) => !open && setSelectedTicket(undefined)}
        ticket={selectedTicket}
        mode="edit"
      />
    </>
  );
}
