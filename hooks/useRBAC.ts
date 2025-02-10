import { rbacConfig } from "@/config/rbac.config";
import { UserRoleType } from "@/types/auth";
import { SidebarNavItem } from "@/types";
import { useAuthState } from "@/services/hooks/use-auth";

export const useRBAC = () => {
  const { data: authState } = useAuthState();
  const userRole = authState?.role as UserRoleType;

  const can = (action: string, subject: string): boolean => {
    if (!userRole) return false;
    
    const roleConfig = rbacConfig.roles[userRole];
    return roleConfig.permissions.some(
      permission => 
        (permission.action === action || permission.action === "manage") &&
        (permission.subject === subject || permission.subject === "all")
    );
  };

  const getSidebarItems = (): SidebarNavItem[] => {
    if (!userRole) return [];
    return rbacConfig.roles[userRole].sidebarItems;
  };

  const getDashboardView = (): string => {
    if (!userRole) return "staff";
    return rbacConfig.roles[userRole].dashboardView;
  };

  return {
    userRole,
    can,
    getSidebarItems,
    getDashboardView,
  };
};
