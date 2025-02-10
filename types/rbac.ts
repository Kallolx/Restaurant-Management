import { SidebarNavItem } from "./index";
import { UserRoleType } from "./auth";

export interface RBACPermission {
  action: string;
  subject: string;
}

export interface RBACRole {
  name: UserRoleType;
  permissions: RBACPermission[];
  sidebarItems: SidebarNavItem[];
  dashboardView: string;
}

export interface RBACConfig {
  roles: Record<UserRoleType, RBACRole>;
}
