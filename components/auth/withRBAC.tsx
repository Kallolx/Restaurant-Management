import { useRBAC } from "@/hooks/useRBAC";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { useAuthState } from "@/services/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface RBACProps {
  requiredPermissions: Array<{
    action: string;
    subject: string;
  }>;
}

export const withRBAC = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { requiredPermissions }: RBACProps
) => {
  return function WithRBACWrapper(props: P) {
    const { can } = useRBAC();
    const router = useRouter();
    const { toast } = useToast();
    const { data: authState } = useAuthState();

    const hasRequiredPermissions = requiredPermissions.every(({ action, subject }) =>
      can(action, subject)
    );

    useEffect(() => {
      if (!authState?.isAuthenticated) {
        router.push("/auth/login");
        toast({
          title: "Authentication Required",
          description: "Please login to access this page",
          variant: "destructive",
        });
        return;
      }

      if (!hasRequiredPermissions) {
        router.push("/dashboard");
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page",
          variant: "destructive",
        });
      }
    }, [hasRequiredPermissions, router, authState?.isAuthenticated, toast]);

    if (!authState?.isAuthenticated || !hasRequiredPermissions) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
