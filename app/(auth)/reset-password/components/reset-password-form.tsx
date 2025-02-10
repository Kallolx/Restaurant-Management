import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordFormValues, resetPasswordSchema } from "../schema";

interface ResetPasswordFormProps {
  onPasswordUpdated: () => void;
}

export function ResetPasswordForm({ onPasswordUpdated }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    // TODO: Implement reset password API call
    console.log("Reset password submitted:", data);
    onPasswordUpdated();
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter new password"
            className={cn({
              "focus-visible:ring-red-500": errors.password,
            })}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm new password"
            className={cn({
              "focus-visible:ring-red-500": errors.confirmPassword,
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Update password
        </Button>
      </form>
    </CardContent>
  );
}
