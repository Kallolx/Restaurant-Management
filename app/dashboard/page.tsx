"use client";

import ManagerDashboardPage from "@/components/dashboard/manager/manager-dashboard";
import OwnerDashboardPage from "@/components/dashboard/owner-dashboard";
import StaffDashboard from "@/components/dashboard/staff/staff-dashboard";
import { useRBAC } from "@/hooks/useRBAC";

export default function DashboardPage() {
  const { userRole } = useRBAC();
  return (
    <>
      {userRole === "owner" ? (
        <OwnerDashboardPage />
      ) : userRole === "manager" ? (
        <ManagerDashboardPage />
      ) : userRole === "staff" ? (
        <StaffDashboard />
      ) : null}
    </>
  );
}
