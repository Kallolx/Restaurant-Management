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

export function withRBAC<T extends object>(
  WrappedComponent: ComponentType<T>,
  requiredRole?: string
) {
  return function WithRBACComponent(props: T) {
    const { data: authState } = useAuthState();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
      // Check if user is not authenticated
      if (!authState?.user) {
        router.push("/login");
        toast({
          title: "Authentication Required",
          description: "Please log in to access this page.",
          variant: "destructive",
        });
        return;
      }

      // Check if user has required role
      if (requiredRole && authState.role !== requiredRole) {
        router.push("/dashboard");
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        return;
      }
    }, [authState, router]);

    // If no auth state or wrong role, don't render anything
    if (!authState?.user || (requiredRole && authState.role !== requiredRole)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
