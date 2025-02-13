"use client";

import { QRCodeSection } from "@/components/settings/qr-code-section";
import SettingsForm from "@/components/settings/settings-form";
import SubscriptionDetails from "@/components/settings/subscription-details";
import ThemeSelector from "@/components/settings/theme-selector";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const handleSaveChanges = () => {
    // Here you would typically save all changes to your backend
    toast({
      title: "Settings Saved",
      description: "All your settings have been successfully saved.",
    });
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <Button onClick={handleSaveChanges}>Save all changes</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <SettingsForm />
        </div>
        <div className="lg:col-span-2">
          <div className="grid gap-6">
            <SubscriptionDetails />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThemeSelector />
              <QRCodeSection restaurantId={""} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}