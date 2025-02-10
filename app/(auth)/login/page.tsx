"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { EmailSent } from "./components/email-sent";
import { ForgotPasswordForm } from "./components/forgot-password-form";
import { LoginForm } from "./components/login-form";

type LoginStep = "login" | "forgot-password" | "email-sent";

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<LoginStep>("login");

  const getStepContent = () => {
    switch (currentStep) {
      case "login":
        return {
          title: "Log in to Dashboard",
          description: "Please enter information below to continue",
          component: (
            <LoginForm
              onForgotPassword={() => setCurrentStep("forgot-password")}
            />
          ),
        };
      case "forgot-password":
        return {
          title: "Forgot password?",
          description:
            "Enter your email address to get the reset password link",
          component: (
            <ForgotPasswordForm
              onBackToLogin={() => setCurrentStep("login")}
              onEmailSent={() => setCurrentStep("email-sent")}
            />
          ),
        };
      case "email-sent":
        return {
          title: "Email sent",
          description: "Please check your inbox to reset your password",
          component: (
            <EmailSent onBackToLogin={() => setCurrentStep("login")} />
          ),
        };
    }
  };

  const { title, description, component } = getStepContent();

  return (
    <div className="min-h-screen bg-[#1E90FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-[450px] py-12 space-y-5">
        <CardHeader className="space-y-1">
          {currentStep === "email-sent" && (
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
