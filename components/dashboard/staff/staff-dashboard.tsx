import { mockMenuItems, mockOrders } from "@/types/manager-dashboard";
import { DashboardOrderStack } from "../manager/dashboard-order-stack";
import { FloatingActionButtons } from "../manager/floating-action-buttons";
import { MenuOverview } from "../manager/menu-overview";

const StaffDashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mobile-md:grid-cols-1">
      <div className="col-span-1">
        <DashboardOrderStack orders={mockOrders} />
      </div>
      <div className="col-span-2">
        <MenuOverview items={mockMenuItems} />
      </div>

      <FloatingActionButtons />
    </div>
  );
};

export default StaffDashboard;
