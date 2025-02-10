"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  CircleUserRound,
  HelpCircle,
  LogOut,
  Settings,
} from "lucide-react";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import DashboardSidebar from "./sidebar";
import { useLanguage } from "@/providers/language-provider";

export default function DashboardHeader() {
  const { t } = useLanguage();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-background border-b border-border">
      <div className="w-full h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a className="flex items-center" href="/dashboard">
            <img
              src="/logo.svg"
              alt={t("Restaurant Dashboard")}
              className="h-8 w-auto"
            />
          </a>
        </div>

        <ResponsiveUserIcon />

        <div className="flex flex-1 items-center justify-end space-x-4 h-full mobile-md:hidden">
          <nav className="flex items-center space-x-4 h-full py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex items-center gap-2.5 px-2 h-full"
                >
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src="/avatars/01.png" alt="Farhan Ahamed" /> */}
                    <AvatarFallback>FA</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Farhan Ahamed</span>
                    <span className="text-xs text-muted-foreground">{t("Admin")}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex flex-col items-center gap-2 p-4">
                  <Avatar className="h-16 w-16">
                    {/* <AvatarImage src="/avatars/01.png" alt="Farhan Ahamed" /> */}
                    <AvatarFallback>FA</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium">Farhan Ahamed</p>
                    <p className="text-xs text-muted-foreground">{t("Admin")}</p>
                  </div>
                </div>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  {t("Profile settings")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  {t("Help & Support")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("Log Out")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="h-full">
      <div className="bg-main-background rounded-full flex items-center h-full w-full">
        <button
          onClick={() => setLanguage("bn")}
          className={cn(
            "text-sm font-medium text-foreground flex items-center gap-2 h-[43px] w-[43px] rounded-full justify-center transition-colors",
            {
              "text-primary-foreground bg-primary": language === "bn",
            }
          )}
        >
          বাং
        </button>

        <button
          onClick={() => setLanguage("en")}
          className={cn(
            "text-sm font-medium text-foreground flex items-center gap-2 h-[43px] w-[43px] rounded-full justify-center transition-colors",
            {
              "text-primary-foreground bg-primary": language === "en",
            }
          )}
        >
          En
        </button>
      </div>
    </div>
  );
}

export function ResponsiveMenuButton() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className="flex lg:hidden">
        <button
          className="bg-transparent cursor-pointer"
          onClick={() => {
            setShowSidebar(true);
          }}
        >
          <Menu className="size-7 " />
        </button>
      </div>

      <DashboardSidebar
        isResponsiveSidebar={true}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </>
  );
}

export function ResponsiveUserIcon() {
  return (
    <div className="hidden mobile-md:flex">
      <button className=" h-9 w-9 flex items-center justify-center rounded-full bg-transparent cursor-pointer hover:bg-secondary">
        <CircleUserRound className="size-6" />
      </button>
    </div>
  );
}
