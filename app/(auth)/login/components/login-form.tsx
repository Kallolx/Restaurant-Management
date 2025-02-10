import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLogin } from "@/services/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schema";

interface LoginFormProps {
  onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
      restaurant_code: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login.mutateAsync({
        ...data,
        restaurant_code: parseInt(data.restaurant_code),
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Email or Phone number</Label>
          <Input
            id="phone"
            {...register("phone")}
            type="text"
            placeholder="Email or phone"
            className={cn({
              "focus-visible:ring-red-500": errors.phone,
            })}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Button
              variant="link"
              className="px-0 py-0 w-auto h-auto"
              type="button"
              onClick={onForgotPassword}
            >
              Forgot password?
            </Button>
          </div>
          <div className="relative">
            <Input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className={cn({
                "focus-visible:ring-red-500": errors.password,
                "pr-10": true,
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="restaurant_code">Restaurant Code</Label>
          <Input
            id="restaurant_code"
            {...register("restaurant_code")}
            type="text"
            placeholder="Enter restaurant code"
            className={cn({
              "focus-visible:ring-red-500": errors.restaurant_code,
            })}
          />
          {errors.restaurant_code && (
            <p className="text-sm text-destructive">
              {errors.restaurant_code.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </CardContent>
  );
}
