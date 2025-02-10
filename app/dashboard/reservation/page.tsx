"use client";

import { ReservationContent } from "@/components/reservation/reservation-content";

export default function ReservationPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div>
        <h1 className="text-2xl font-medium">Reservation</h1>
      </div>

      <div className="pt-3">
        <ReservationContent />
      </div>
    </div>
  );
}
