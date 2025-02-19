"use client";

import { QRCodeSection } from "@/components/settings/qr-code-section";
import SettingsForm from "@/components/settings/settings-form";
import SubscriptionDetails from "@/components/settings/subscription-details";
import ThemeSelector from "@/components/settings/theme-selector";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";

export default function SettingsPage() {
  const { authData } = useAuth();

  // Debug log to check auth data
  useEffect(() => {
    console.log('Auth Data in Settings:', {
      restaurantId: authData?.restaurant?.uuid,
      fullAuthData: authData
    });
  }, [authData]);

  const handleSaveChanges = () => {
    // Here you would typically save all changes to your backend
    toast({
      title: "Settings Saved",
      description: "All your settings have been successfully saved.",
    });
  };

  // If auth data is not loaded yet, show loading state
  if (!authData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading settings...</p>
      </div>
    );
  }

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
              <QRCodeSection restaurantId={authData.restaurant?.uuid || ""} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}