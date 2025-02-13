import AccountIcon from "@/public/assets/sidebar/Account.svg";
import EmployeeIcon from "@/public/assets/sidebar/Employee.svg";
import FoodMenuIcon from "@/public/assets/sidebar/Foodmenu.svg";
import DashboardIcon from "@/public/assets/sidebar/Home.svg";
import KitchenIcon from "@/public/assets/sidebar/kitchen.svg";
import OrderHistoryIcon from "@/public/assets/sidebar/OrderHistory.svg";
import OrderStackIcon from "@/public/assets/sidebar/OrderStack.svg";
import ReportIcon from "@/public/assets/sidebar/report.svg";
import Reservation from "@/public/assets/sidebar/Reservation.svg";
import StatisticsIcon from "@/public/assets/sidebar/Statistics.svg";

import { RBACConfig } from "@/types/rbac";
import { SidebarNavItem } from "@/types";

export const rbacConfig: RBACConfig = {
  roles: {
    owner: {
      name: "owner",
      permissions: [
        { action: "manage", subject: "all" },
      ],
      sidebarItems: [
        {
          id: 1,
          icon: DashboardIcon,
          label: "Dashboard",
          link: "/dashboard",
          pathnameMatcher: ["/dashboard"],
        },
        {
          id: 2,
          icon: FoodMenuIcon,
          label: "Food Menu",
          link: "/dashboard/food-menu",
          pathnameMatcher: ["/dashboard/food-menu"],
        },
        {
          id: 3,
          icon: OrderStackIcon,
          label: "Orders",
          link: "/dashboard/order-stack",
          pathnameMatcher: ["/dashboard/order-stack"],
        },
        {
          id: 4,
          icon: Reservation,
          label: "Reservations",
          link: "/dashboard/reservation",
          pathnameMatcher: ["/dashboard/reservation"],
        },
        {
          id: 5,
          icon: DashboardIcon,
          label: "Tables",
          link: "/dashboard/tables",
          pathnameMatcher: ["/dashboard/tables"],
        },
        {
          id: 6,
          icon: AccountIcon,
          label: "Customers",
          link: "/dashboard/customers",
          pathnameMatcher: ["/dashboard/customers"],
        },
        {
          id: 7,
          icon: EmployeeIcon,
          label: "Staff",
          link: "/dashboard/employee",
          pathnameMatcher: ["/dashboard/employee"],
        },
        {
          id: 8,
          icon: KitchenIcon,
          label: "Kitchen View",
          link: "/dashboard/kitchen",
          pathnameMatcher: ["/dashboard/kitchen"],
        },
        {
          id: 9,
          icon: StatisticsIcon,
          label: "Statistics",
          link: "/dashboard/statistics",
          pathnameMatcher: ["/dashboard/statistics"],
        },
        {
          id: 10,
          icon: ReportIcon,
          label: "Reports",
          link: "/dashboard/report",
          pathnameMatcher: ["/dashboard/report"],
        },
        {
          id: 11,
          icon: Reservation,
          label: "Expenses",
          link: "/dashboard/expenses",
          pathnameMatcher: ["/dashboard/expenses"],
        },
        {
          id: 12,
          icon: Reservation,
          label: "Reviews",
          link: "/dashboard/feedback",
          pathnameMatcher: ["/dashboard/feedback"],
        },
        {
          id: 13,
          icon: Reservation,
          label: "Notifications",
          link: "/dashboard/notifications",
          pathnameMatcher: ["/dashboard/notifications"],
        },
      ] as SidebarNavItem[],
      dashboardView: "owner",
    },
    manager: {
      name: "manager",
      permissions: [
        { action: "read", subject: "all" },
        { action: "manage", subject: "orders" },
        { action: "manage", subject: "menu" },
      ],
      sidebarItems: [
        {
          id: 1,
          icon: DashboardIcon,
          label: "Dashboard",
          link: "/dashboard",
          pathnameMatcher: ["/dashboard"],
        },
        {
          id: 2,
          icon: FoodMenuIcon,
          label: "Food Menu",
          link: "/dashboard/food-menu",
          pathnameMatcher: ["/dashboard/food-menu"],
        },
        {
          id: 3,
          icon: OrderStackIcon,
          label: "Orders",
          link: "/dashboard/order-stack",
          pathnameMatcher: ["/dashboard/order-stack"],
        },
        {
          id: 4,
          icon: Reservation,
          label: "Reservations",
          link: "/dashboard/reservation",
          pathnameMatcher: ["/dashboard/reservation"],
        },
        {
          id: 5,
          icon: EmployeeIcon,
          label: "Employee",
          link: "/dashboard/employee",
          pathnameMatcher: ["/dashboard/employee"],
        },
        {
          id: 6,
          icon: KitchenIcon,
          label: "Kitchen View",
          link: "/dashboard/kitchen",
          pathnameMatcher: ["/dashboard/kitchen"],
        },
        {
          id: 7,
          icon: StatisticsIcon,
          label: "Statistics",
          link: "/dashboard/statistics",
          pathnameMatcher: ["/dashboard/statistics"],
        },
        {
          id: 8,
          icon: ReportIcon,
          label: "Reports",
          link: "/dashboard/report",
          pathnameMatcher: ["/dashboard/report"],
        },
      ] as SidebarNavItem[],
      dashboardView: "manager",
    },
    staff: {
      name: "staff",
      permissions: [
        { action: "read", subject: "orders" },
        { action: "create", subject: "orders" },
      ],
      sidebarItems: [
        {
          id: 1,
          icon: DashboardIcon,
          label: "Dashboard",
          link: "/dashboard",
          pathnameMatcher: ["/dashboard"],
        },
        {
          id: 2,
          icon: OrderStackIcon,
          label: "Orders",
          link: "/dashboard/order-stack",
          pathnameMatcher: ["/dashboard/order-stack"],
        },
        {
          id: 3,
          icon: OrderHistoryIcon,
          label: "Order History",
          link: "/dashboard/order-history",
          pathnameMatcher: ["/dashboard/order-history"],
        },
        {
          id: 4,
          icon: FoodMenuIcon,
          label: "Food Menu",
          link: "/dashboard/food-menu",
          pathnameMatcher: ["/dashboard/food-menu"],
        },
        {
          id: 5,
          icon: Reservation,
          label: "Reservation",
          link: "/dashboard/reservation",
          pathnameMatcher: ["/dashboard/reservation"],
        },
        {
          id: 6,
          icon: KitchenIcon,
          label: "Kitchen View",
          link: "/dashboard/kitchen",
          pathnameMatcher: ["/dashboard/kitchen"],
        },
        {
          id: 7,
          icon: ReportIcon,
          label: "Reports",
          link: "/dashboard/report",
          pathnameMatcher: ["/dashboard/report"],
        },
      ] as SidebarNavItem[],
      dashboardView: "staff",
    },
  },
};
