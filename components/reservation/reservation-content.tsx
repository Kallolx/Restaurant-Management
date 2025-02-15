"use client";

import { Button } from "@/components/ui/button";
import { generateMockReservations } from "@/data/mock-reservations";
import { Reservation } from "@/types/reservation";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { AddReservationModal } from "./modals/add-reservation-modal";
import { CancelReservationModal } from "./modals/cancel-reservation-modal";
import { ReservationList } from "./reservation-list";

export function ReservationContent() {
  const [reservations, setReservations] = useState<Reservation[]>(
    generateMockReservations()
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const handleAddReservation = (newReservation: Reservation) => {
    setReservations((prev) => [...prev, newReservation]);
    setIsAddModalOpen(false);
  };

  const handleCancelReservation = () => {
    if (selectedReservation) {
      setReservations((prev) =>
        prev.map((res) =>
          res.id === selectedReservation.id
            ? { ...res, status: "completed" }
            : res
        )
      );
    }
    setIsCancelModalOpen(false);
    setSelectedReservation(null);
  };

  const pendingReservations = reservations.filter(
    (res) => res.status === "pending"
  );
  const completedReservations = reservations.filter(
    (res) => res.status === "completed"
  );

  return (
    <div className="flex flex-col gap-6 mobile-md:gap-4">
      <div className="flex-1 bg-background rounded-lg max-h-[calc(100vh-133px)] mobile-md:max-h-[calc(50vh-80px)] overflow-y-auto custom-scrollbar">
        <h2 className="px-4 pt-4 pb-2 text-lg font-semibold bg-background sticky top-0 left-0 right-0 z-50">
          Confirm Reservations
        </h2>
        <div className="p-4">
          <ReservationList
            reservations={pendingReservations}
            onCancelClick={(reservation) => {
              setSelectedReservation(reservation);
              setIsCancelModalOpen(true);
            }}
            variant="pending"
            showCancelButton
          />
        </div>
      </div>

      <div className="flex-1 bg-background rounded-lg max-h-[calc(100vh-133px)] mobile-md:max-h-[calc(50vh-80px)] overflow-y-auto custom-scrollbar">
        <h2 className="px-4 pt-4 pb-2 text-lg font-semibold bg-background sticky top-0 left-0 right-0 z-50">
          Completed Reservations
        </h2>
        <div className="p-4">
          <ReservationList
            reservations={completedReservations}
            variant="completed"
            showCompletedBadge
          />
        </div>
      </div>

      <Button
        className="fixed bottom-6 right-6 gap-3 rounded-2xl py-7 mobile-md:bottom-20 mobile-md:right-4 mobile-md:py-5"
        onClick={() => setIsAddModalOpen(true)}
        variant="primary"
        size="lg"
      >
        <Calendar className="h-5 w-5" />
        Add Reservation
      </Button>

      <AddReservationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddReservation}
      />

      <CancelReservationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelReservation}
      />
    </div>
  );
}
