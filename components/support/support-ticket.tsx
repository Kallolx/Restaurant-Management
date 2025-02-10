"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateTicketModal } from "./create-ticket-modal";

export function SupportTicket() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  return (
    <>
      <Button onClick={() => setShowCreateTicket(true)} variant={"primary"}>
        Create a New Ticket
      </Button>

      <CreateTicketModal
        open={showCreateTicket}
        onOpenChange={setShowCreateTicket}
      />
    </>
  );
}
