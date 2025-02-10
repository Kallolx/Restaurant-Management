"use client";

import { AddExpenseModal } from "@/components/expenses/modals/add-expense-modal";
import CreateOrderModal from "@/components/order-stack/order-creation/create-order-modal";
import { AddReservationModal } from "@/components/reservation/modals/add-reservation-modal";
import { Button } from "@/components/ui/button";
import OrderStackIcon from "@/public/assets/sidebar/OrderStack.svg";
import { ExpenseRequest } from "@/types/expense";
import { Reservation } from "@/types/reservation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Plus, Receipt, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export function FloatingActionButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const handleSubmit = (expense: ExpenseRequest) => {
    console.log("Submitted expense:", expense);
    // Handle the expense submission here
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddReservation = (newReservation: Reservation) => {
    console.log("reservation added");
  };

  return (
    <>
      <div
        className="fixed bottom-[40px] right-[30px] mobile-md:bottom-[70px]"
        ref={containerRef}
      >
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-4 flex justify-end"
              >
                <Button
                  variant="primary"
                  className="px-6 rounded-full"
                  size="lg"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <CalendarPlus className="h-5 w-5 ml-2" />
                  <span>Add Reservation</span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-4 flex justify-end"
              >
                <Button
                  variant="primary"
                  className="rounded-full px-6"
                  size="lg"
                  onClick={() => setShowExpenseForm(true)}
                >
                  <Receipt className="h-5 w-5 ml-2" />
                  <span>Add Expense</span>
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className="flex flex-col items-end gap-4">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            variant="primary"
            className="h-12 w-12 rounded-full shadow-lg"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
          </Button>
          <Button
            variant="primary"
            className="py-4 h-auto rounded-xl px-6"
            size="lg"
            onClick={() => setShowCreateOrder(true)}
          >
            <OrderStackIcon className="h-5 w-5 ml-2 text-white fill-white" />
            <span>Open Order</span>
          </Button>
        </div>
      </div>

      <CreateOrderModal
        open={showCreateOrder}
        onOpenChange={setShowCreateOrder}
      />

      <AddReservationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddReservation}
      />

      <AddExpenseModal
        open={showExpenseForm}
        onOpenChange={setShowExpenseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
}
