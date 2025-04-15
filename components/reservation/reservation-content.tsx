"use client";

import { Button } from "@/components/ui/button";
import { generateMockReservations } from "@/data/mock-reservations";
import { Reservation } from "@/types/reservation";
import { Calendar, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AddReservationModal } from "./modals/add-reservation-modal";
import { CancelReservationModal } from "./modals/cancel-reservation-modal";
import { ReservationList } from "./reservation-list";
import { fetchReservations, updateReservationStatus } from "@/services/api/reservation";
import { useToast } from "@/hooks/use-toast";

export function ReservationContent() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const { toast } = useToast();

  // Fetch reservations from API
  useEffect(() => {
    const getReservations = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReservations();
        setReservations(data);
        
        // Show success message
        toast({
          title: "Reservations Loaded",
          description: `${data.length} reservations retrieved successfully.`,
        });
      } catch (error: any) {
        console.error("Failed to fetch reservations:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Could not fetch reservations. Please try again later.",
        });
        // Fallback to mock data if API fails
        setReservations(generateMockReservations());
      } finally {
        setIsLoading(false);
      }
    };

    getReservations();
  }, [toast]);

  const handleAddReservation = (newReservation: Reservation) => {
    // Add the new reservation to the state
    setReservations((prev) => [newReservation, ...prev]);
    
    toast({
      title: "Reservation Added",
      description: `New reservation for ${newReservation.customer.name} added successfully.`,
    });
  };

  const handleCancelReservation = async () => {
    if (selectedReservation) {
      try {
        // Update status in the API
        await updateReservationStatus(selectedReservation.id, "completed");
        
        // Update local state
        setReservations((prev) =>
          prev.map((res) =>
            res.id === selectedReservation.id
              ? { ...res, status: "completed" }
              : res
          )
        );
        
        toast({
          title: "Reservation Cancelled",
          description: `Reservation #${selectedReservation.token || selectedReservation.id} has been cancelled.`,
        });
      } catch (error: any) {
        console.error("Failed to cancel reservation:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Could not cancel reservation. Please try again.",
        });
      }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-160px)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-2 text-lg">Loading reservations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mobile-md:gap-4">
      {/* Desktop: Side by side, Mobile: Stacked with Confirm on top */}
      <div className="grid grid-cols-2 gap-6 mobile-md:grid-cols-1 mobile-md:gap-4">
        {/* Confirm Reservations */}
        <div className="bg-background rounded-lg max-h-[calc(100vh-133px)] mobile-md:max-h-[60vh] overflow-y-auto custom-scrollbar">
          <h2 className="px-4 pt-4 pb-2 text-lg font-semibold bg-background sticky top-0 left-0 right-0 z-50 mobile-md:text-base">
            Confirm Reservations {pendingReservations.length > 0 && `(${pendingReservations.length})`}
          </h2>
          <div className="p-4 mobile-md:p-3">
            {pendingReservations.length > 0 ? (
              <ReservationList
                reservations={pendingReservations}
                onCancelClick={(reservation) => {
                  setSelectedReservation(reservation);
                  setIsCancelModalOpen(true);
                }}
                variant="pending"
                showCancelButton
              />
            ) : (
              <p className="text-muted-foreground text-center py-6">No pending reservations found.</p>
            )}
          </div>
        </div>

        {/* Completed Reservations */}
        <div className="bg-background rounded-lg max-h-[calc(100vh-133px)] mobile-md:max-h-[40vh] overflow-y-auto custom-scrollbar">
          <h2 className="px-4 pt-4 pb-2 text-lg font-semibold bg-background sticky top-0 left-0 right-0 z-50 mobile-md:text-base">
            Completed Reservations {completedReservations.length > 0 && `(${completedReservations.length})`}
          </h2>
          <div className="p-4 mobile-md:p-3">
            {completedReservations.length > 0 ? (
              <ReservationList
                reservations={completedReservations}
                variant="completed"
                showCompletedBadge
              />
            ) : (
              <p className="text-muted-foreground text-center py-6">No completed reservations found.</p>
            )}
          </div>
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
