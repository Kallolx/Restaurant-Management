import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "./skeleton";

const SkeletonWrapper = ({
  children,
  isLoading,
  fullWidth,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
}) => {
  if (!isLoading) return <>{children}</>;
  return (
    <Skeleton
      className={cn({
        "w-full": fullWidth,
      })}
    >
      <div className="opacity-0 select-none pointer-events-none">
        {children}
      </div>
    </Skeleton>
  );
};

export default SkeletonWrapper;
