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

export const rbacConfig: RBACConfig = {
  roles: {
    owner: {
      name: "owner",
      permissions: [{ action: "manage", subject: "all" }],
      sidebarItems: [
        {
          id: "dashboard",
          icon: DashboardIcon,
          label: "Dashboard",
          link: "/dashboard",
          pathnameMatcher: ["/dashboard"],
        },
        {
          id: "order-stack",
          icon: OrderStackIcon,
          label: "Order Stack",
          link: "/dashboard/order-stack",
          pathnameMatcher: ["/dashboard/order-stack"],
        },
        {
          id: "order-history",
          icon: OrderHistoryIcon,
          label: "Order History",
          link: "/dashboard/order-history",
          pathnameMatcher: ["/dashboard/order-history"],
        },
        {
          id: "food-menu",
          icon: FoodMenuIcon,
          label: "Food Menu",
          link: "/dashboard/food-menu",
          pathnameMatcher: ["/dashboard/food-menu"],
        },
        {
          id: "reservation",
          icon: Reservation,
          label: "Reservation",
          link: "/dashboard/reservation",
          pathnameMatcher: ["/dashboard/reservation"],
        },
        {
          id: "account",
          icon: AccountIcon,
          label: "Account",
          link: "/dashboard/account",
          pathnameMatcher: ["/dashboard/account"],
        },
        {
          id: "statistics",
          icon: StatisticsIcon,
          label: "Statistics",
          link: "/dashboard/statistics",
          pathnameMatcher: ["/dashboard/statistics"],
        },
        {
          id: "report",
          icon: ReportIcon,
          label: "Report",
          link: "/dashboard/report",
          pathnameMatcher: ["/dashboard/report"],
        },
      ],
      dashboardView: "owner",
    },
    manager: {
      name: "manager",
      permissions: [
        { action: "manage", subject: "orders" },
        { action: "manage", subject: "menu" },
        { action: "manage", subject: "employees" },
      ],
      sidebarItems: [
        {
          id: "dashboard",
          icon: DashboardIcon,
          label: "Dashboard",
          link: "/dashboard",
          pathnameMatcher: ["/dashboard"],
        },
        {
          id: "order-stack",
          icon: OrderStackIcon,
          label: "Order Stack",
          link: "/dashboard/order-stack",
          pathnameMatcher: ["/dashboard/order-stack"],
        },
        {
          id: "order-history",
          icon: OrderHistoryIcon,
          label: "Order History",
          link: "/dashboard/order-history",
          pathnameMatcher: ["/dashboard/order-history"],
        },
        {
          id: "food-menu",
          icon: FoodMenuIcon,
          label: "Food Menu",
          link: "/dashboard/food-menu",
          pathnameMatcher: ["/dashboard/food-menu"],
        },
        {
          id: "reservation",
          icon: Reservation,
          label: "Reservation",
          link: "/dashboard/reservation",
          pathnameMatcher: ["/dashboard/reservation"],
        },
        {
          id: "employee",
          icon: EmployeeIcon,
          label: "Employee",
          link: "/dashboard/employee",
          pathnameMatcher: ["/dashboard/employee"],
        },
        {
          id: "kitchen",
          icon: KitchenIcon,
          label: "Kitchen View",
          link: "/dashboard/kitchen",
          pathnameMatcher: ["/dashboard/kitchen"],
        },
        {
          id: "statistics",
          icon: StatisticsIcon,
          label: "Statistics",
          link: "/dashboard/statistics",
          pathnameMatcher: ["/dashboard/statistics"],
        },
        {
          id: "report",
          icon: ReportIcon,
          label: "Report",
          link: "/dashboard/report",
          pathnameMatcher: ["/dashboard/report"],
        },
      ],
      dashboardView: "manager",
    },
    staff: {
      name: "staff",
      permissions: [
        { action: "read", subject: "orders" },
        { action: "read", subject: "menu" },
      ],
      sidebarItems: [
        {
          id: "dashboard",
          icon: DashboardIcon,
          label: "Dashboard",
          link: "/dashboard",
          pathnameMatcher: ["/dashboard"],
        },
        {
          id: "order-stack",
          icon: OrderStackIcon,
          label: "Order Stack",
          link: "/dashboard/order-stack",
          pathnameMatcher: ["/dashboard/order-stack"],
        },
        {
          id: "order-history",
          icon: OrderHistoryIcon,
          label: "Order History",
          link: "/dashboard/order-history",
          pathnameMatcher: ["/dashboard/order-history"],
        },
        {
          id: "food-menu",
          icon: FoodMenuIcon,
          label: "Food Menu",
          link: "/dashboard/food-menu",
          pathnameMatcher: ["/dashboard/food-menu"],
        },
        {
          id: "reservation",
          icon: Reservation,
          label: "Reservation",
          link: "/dashboard/reservation",
          pathnameMatcher: ["/dashboard/reservation"],
        },
        {
          id: "kitchen",
          icon: KitchenIcon,
          label: "Kitchen View",
          link: "/dashboard/kitchen",
          pathnameMatcher: ["/dashboard/kitchen"],
        },
        {
          id: "report",
          icon: ReportIcon,
          label: "Report",
          link: "/dashboard/report",
          pathnameMatcher: ["/dashboard/report"],
        },
      ],
      dashboardView: "staff",
    },
  },
};
