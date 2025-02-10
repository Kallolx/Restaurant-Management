import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "../schema";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onEmailSent: () => void;
}

export function ForgotPasswordForm({
  onBackToLogin,
  onEmailSent,
}: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    // TODO: Implement forgot password API call
    console.log("Forgot password submitted:", data);
    onEmailSent();
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className={cn({
              "focus-visible:ring-red-500": errors.email,
            })}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Send email
        </Button>
        <Button
          type="button"
          variant="link"
          className="w-full"
          onClick={onBackToLogin}
        >
          Back to login
        </Button>
      </form>
    </CardContent>
  );
}
