import {
  mockEmployees,
  mockMenuItems,
  mockOrders,
} from "@/types/manager-dashboard";
import { MetricsCards } from "../metrics-cards";
import { DashboardOrderStack } from "./dashboard-order-stack";
import { EmployeesTable } from "./employees-table";
import { FloatingActionButtons } from "./floating-action-buttons";
import { MenuOverview } from "./menu-overview";

export default function ManagerDashboardPage() {
  return (
    <div className="">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-end-9 mobile-md:col-end-13 space-y-4">
          <MetricsCards />
          <EmployeesTable employees={mockEmployees} />
          <MenuOverview items={mockMenuItems.slice(0, 3)} />
        </div>

        <div className="col-start-9 col-end-13  mobile-md:col-start-1 mobile-md:row-start-2 space-y-4">
          <DashboardOrderStack orders={mockOrders} />
        </div>
      </div>
      <FloatingActionButtons />
    </div>
  );
}
