"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { PasswordUpdated } from "./components/password-updated";
import { ResetPasswordForm } from "./components/reset-password-form";

type ResetPasswordStep = "reset" | "success";

export default function ResetPasswordPage() {
  const [currentStep, setCurrentStep] = useState<ResetPasswordStep>("reset");

  const getStepContent = () => {
    switch (currentStep) {
      case "reset":
        return {
          title: "Enter new password",
          description: "Choose a new password for your account",
          component: (
            <ResetPasswordForm
              onPasswordUpdated={() => setCurrentStep("success")}
            />
          ),
        };
      case "success":
        return {
          title: "Password updated!",
          description:
            "Your password has been updated. Now you can use your new password to continue this account",
          component: <PasswordUpdated />,
        };
    }
  };

  const { title, description, component } = getStepContent();

  return (
    <div className="min-h-screen bg-[#1E90FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-[450px] py-12 space-y-5">
        <CardHeader className="space-y-1">
          {currentStep === "success" && (
            <div className="flex justify-center mb-2">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          )}
          <CardTitle className="text-2xl text-center font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-base">
            {description}
          </CardDescription>
        </CardHeader>
        {component}
      </Card>
    </div>
  );
}
