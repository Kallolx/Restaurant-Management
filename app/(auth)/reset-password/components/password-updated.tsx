import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function PasswordUpdated() {
  const router = useRouter();

  return (
    <CardContent className="flex flex-col items-center">
      <Button
        type="button"
        className="w-full"
        onClick={() => router.push("/login")}
      >
        Log in with new password
      </Button>
    </CardContent>
  );
}
