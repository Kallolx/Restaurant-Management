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
        <Card key={reservation.id} className="relative p-4">
          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full z-10 bg-background",
                    variant === "pending"
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {new Date(reservation.date).getDate()} Sep
                </Badge>
                <span>{reservation.time}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                #{reservation.id}
              </div>
              <div
                className={cn(
                  "absolute left-6 top-1 h-full w-0.5",
                  variant === "pending" ? "bg-primary" : "bg-border"
                )}
              />
            </div>

            <div className="relative mt-4">
              <div className="ml-10 space-y-2 text-sm">
                <p>Table number- {reservation.tableNumber}</p>
                <p>Number of guests- {reservation.guestCount}</p>
                <div className="mt-4">
                  <p className="font-medium">Customer details:</p>
                  <div className="ml-4 mt-2 space-y-1 text-muted-foreground">
                    <p>Name: {reservation.customer.name}</p>
                    <p>Contact info: {reservation.customer.contact}</p>
                    <p>Address: {reservation.customer.address}</p>
                    <p>
                      Special request: &quot;
                      {reservation.customer.specialRequest}
                      &quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showCancelButton && onCancelClick && (
            <div className="mt-4">
              <Button
                variant="outline"
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => onCancelClick(reservation)}
              >
                Cancel Reservation
              </Button>
            </div>
          )}

          {showCompletedBadge && (
            <Badge className="absolute right-4 bottom-4 bg-gray-500">
              Completed Reservation
            </Badge>
          )}
        </Card>
      ))}
    </div>
  );
}
