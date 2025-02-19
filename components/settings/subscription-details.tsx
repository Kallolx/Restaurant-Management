"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  SubscriptionHistoryEntry,
  SubscriptionPlan,
} from "@/types/settings";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubscriptionHistoryModal } from "./subscription-history-modal";

// Sample subscription history data
const sampleHistory: SubscriptionHistoryEntry[] = Array.from(
  { length: 9 },
  (_, i) => ({
    id: `history-${i}`,
    paymentDate: new Date(2024, 9, 29),
    packageName: "Monthly Premium Plan",
    paymentAmount: 5000,
    receiptUrl: "#",
  })
);

export default function SubscriptionDetails() {
  const [plan, setPlan] = useState<SubscriptionPlan>({
    name: "Monthly Premium Plan",
    price: 5000,
    startDate: new Date("2024-11-17"),
    nextBillingDate: new Date("2025-02-17"),
    tax: 15,
    vat: 15,
  });
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="px-4 pt-4 pb-0">
          <CardTitle className="text-xl">Subscription Plan Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-4">
          <div>
            <h3 className="text-base font-medium text-secondary-foreground mb-2">
              Current plan
            </h3>
            <h2 className="text-lg font-medium mb-4">{plan.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <span>Start Plan: {plan.startDate.toLocaleDateString()}</span>
              <Calendar className="w-4 h-4" />
              <span className="bg-purple-100 px-3 py-1 rounded-full">
                Your next bill is {plan.price} on{" "}
                {plan.nextBillingDate.toLocaleDateString()}
              </span>
            </div>
            <div className="text-xl font-medium mb-3">{plan.price}/month</div>
            <div className="flex gap-3 mb-4">
              <Button variant="primary">Pay bill</Button>
              <Button variant="link" onClick={() => setHistoryModalOpen(true)}>
                Previous bills
              </Button>
            </div>
            <div className="mt-3">
              <Link
                href="/dashboard/subscription"
                className="text-primary hover:underline"
              >
                View all plans and features on the subscription page
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <SubscriptionHistoryModal
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
        history={sampleHistory}
      />
    </>
  );
}
