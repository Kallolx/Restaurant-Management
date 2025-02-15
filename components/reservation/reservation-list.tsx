"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Reservation } from "@/types/reservation";

interface ReservationListProps {
  reservations: Reservation[];
  onCancelClick?: (reservation: Reservation) => void;
  showCancelButton?: boolean;
  showCompletedBadge?: boolean;
  variant?: "pending" | "completed";
}

export function ReservationList({
  reservations,
  onCancelClick,
  showCancelButton,
  showCompletedBadge,
  variant = "pending",
}: ReservationListProps) {
  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Card key={reservation.id} className="relative p-4 mobile-md:p-3">
          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full z-10 bg-background mobile-md:text-sm",
                    variant === "pending"
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {new Date(reservation.date).getDate()} Sep
                </Badge>
                <span className="mobile-md:text-sm">{reservation.time}</span>
              </div>
              <div className="text-sm text-muted-foreground mobile-md:text-xs">
                #{reservation.id}
              </div>
              <div
                className={cn(
                  "absolute left-6 top-1 h-full w-0.5",
                  variant === "pending" ? "bg-primary" : "bg-border"
                )}
              />
            </div>

            <div className="ml-10 space-y-2 text-sm">
              <p className="mobile-md:text-sm">Table number- {reservation.tableNumber}</p>
              <p className="mobile-md:text-sm">Number of guests- {reservation.guestCount}</p>
              <div className="mt-4">
                <p className="font-medium mobile-md:text-sm">Customer details:</p>
                <div className="ml-4 mt-2 space-y-1 text-muted-foreground">
                  <p className="mobile-md:text-xs">Name: {reservation.customer.name}</p>
                  <p className="mobile-md:text-xs">Contact info: {reservation.customer.contact}</p>
                  <p className="mobile-md:text-xs">Address: {reservation.customer.address}</p>
                  <p className="mobile-md:text-xs">
                    Special request: &quot;{reservation.customer.specialRequest}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showCancelButton && onCancelClick && (
            <div className="mt-4 mobile-md:mt-3">
              <Button
                variant="outline"
                className="text-red-500 hover:bg-red-50 hover:text-red-600 mobile-md:text-sm mobile-md:h-8"
                onClick={() => onCancelClick(reservation)}
              >
                Cancel Reservation
              </Button>
            </div>
          )}

          {showCompletedBadge && (
            <Badge className="absolute right-4 bottom-4 bg-gray-500 mobile-md:text-xs mobile-md:right-3 mobile-md:bottom-3">
              Completed Reservation
            </Badge>
          )}
        </Card>
      ))}
    </div>
  );
}
