import { BottomNavigation } from "@/components/dashboard/bottom-navigation";
import DashboardHeader from "@/components/dashboard/header";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { PropsWithChildren } from "react";

const MainAppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-main-background">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="lg:pl-64 pb-16 md:pb-0 pt-[60px]">
        <div className="px-4 py-4">{children}</div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MainAppLayout;
