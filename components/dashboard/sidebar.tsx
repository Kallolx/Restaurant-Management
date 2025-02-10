"use client";

import { SidebarNavItem } from "@/types";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import Logo from "@/public/assets/logo.png";
import LogoutIcon from "@/public/assets/sidebar/Logout.svg";
import SettingsIcon from "@/public/assets/sidebar/Settings.svg";
import SupportIcon from "@/public/assets/sidebar/Support.svg";

import { useRBAC } from "@/hooks/useRBAC";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/providers/language-provider";
import { useLogout } from "@/services/hooks/use-auth";

const footerNavItems: SidebarNavItem[] = [
  {
    id: 1,
    icon: SettingsIcon,
    label: "Settings",
    link: "/dashboard/settings",
    pathnameMatcher: ["/dashboard/settings"],
  },
  {
    id: 2,
    icon: SupportIcon,
    label: "Help & support",
    link: "/dashboard/support",
    pathnameMatcher: ["/dashboard/support"],
  },
  {
    id: 3,
    icon: LogoutIcon,
    label: "Log Out",
    link: "#",
    pathnameMatcher: [],
  },
];

export default function DashboardSidebar({
  isResponsiveSidebar = false,
  showSidebar = false,
  setShowSidebar,
}: {
  isResponsiveSidebar?: boolean;
  showSidebar?: boolean;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { getSidebarItems } = useRBAC();
  const sidebarItems = getSidebarItems();
  const { t } = useLanguage();
  const logout = useLogout();

  useEffect(() => {
    if (isResponsiveSidebar && showSidebar && setShowSidebar) {
      setShowSidebar(false);
    }
  }, [pathname]);

  return (
    <aside
      className={cn(
        "fixed left-0 top-[60px] h-[calc(100vh-60px)] border-r border-gray-200 dark:border-gray-800 bg-sidebar-background dark:bg-sidebar-background transition-transform",
        {
          "w-full md:w-64 translate-x-[-100%]": isResponsiveSidebar,
          "w-64 -translate-x-full lg:translate-x-0": !isResponsiveSidebar,
          "translate-x-0": showSidebar,
        }
      )}
    >
      <div className="h-full overflow-y-auto custom-scrollbar bg-sidebar-background dark:bg-sidebar-background">
        {isResponsiveSidebar && (
          <div className="flex items-center justify-between h-[55px] px-4 mb-2 border-b border-gray-200 dark:border-gray-800">
            <Link href="/" className="h-[35px] w-max text-foreground dark:text-foreground">
              {t("Restaurant Dashboard")}
            </Link>
          </div>
        )}

        <div className="flex flex-col h-full justify-between px-3 pb-4 pt-1.5">
          <ul>
            <SidebarLogo />
          </ul>
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item) => (
              <NavLinkItem key={item.id} sidebarItem={{...item, label: t(item.label)}} />
            ))}
          </ul>

          <div>
            <div className="my-4 h-px bg-gray-200 dark:bg-gray-800" />
            <ul className="space-y-2 font-medium">
              {footerNavItems.map((item) => (
                <NavLinkItem key={item.id} sidebarItem={{...item, label: t(item.label)}} />
              ))}
              <ThemeSwitcher />
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavLinkItem({ sidebarItem }: { sidebarItem: SidebarNavItem }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useLogout();
  const { t } = useLanguage();
  const { icon: Icon, label, link, pathnameMatcher } = sidebarItem;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (sidebarItem.label === "Log Out") {
      e.preventDefault();
      try {
        localStorage.removeItem("auth");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <li key={sidebarItem.id} className="relative">
      <Link
        href={link}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-2.5 rounded-md hover:bg-accent dark:hover:bg-accent text-secondary-foreground dark:text-secondary-foreground justify-start px-5 py-2.5",
          {
            "bg-accent dark:bg-accent text-foreground dark:text-foreground before:h-full before:w-[2px] before:bg-primary before:absolute before:left-0 rounded-l-none":
              pathnameMatcher.includes(pathname),
          }
        )}
      >
        <Icon className="size-6 fill-current dark:fill-white dark:text-white" fill="currentColor" />
        <span className="text-sm font-medium font-bangla">{label}</span>
      </Link>
    </li>
  );
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <li className={cn("px-5 py-2.5", className)}>
      <div className="bg-accent dark:bg-accent px-2 py-1.5 rounded-2xl flex items-center gap-1.5 justify-between">
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "text-secondary-foreground dark:text-secondary-foreground flex items-center gap-2 px-2.5 py-1 rounded-full",
            {
              "text-foreground dark:text-foreground bg-accent dark:bg-muted": theme === "light",
            }
          )}
        >
          <Sun className="size-4" />
          <span className="text-sm font-medium">{t("Light")}</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "text-secondary-foreground dark:text-secondary-foreground flex items-center gap-2 px-2.5 py-1 rounded-full",
            {
              "text-foreground dark:text-foreground bg-accent dark:bg-muted": theme === "dark",
            }
          )}
        >
          <Moon className="size-4" />
          <span className="text-sm font-medium">{t("Dark")}</span>
        </button>
      </div>
    </li>
  );
}

function SidebarLogo() {
  return (
    <li className="relative">
      <div className="h-11 py-1.5 flex items-center">
        <Image className="w-full h-auto" src={Logo} alt="logo" priority />
      </div>
    </li>
  );
}
