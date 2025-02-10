import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/apiClient";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/types/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const AUTH_KEYS = {
  state: ["auth", "state"] as const,
  login: ["auth", "login"] as const,
  refresh: ["auth", "refresh"] as const,
};

// Get current auth state
export function useAuthState() {
  return useQuery({
    queryKey: AUTH_KEYS.state,
    queryFn: () => {
      const authData = localStorage.getItem("auth");
      if (!authData) {
        return {
          user: null,
          restaurant: null,
          role: null,
          tokens: null,
          isAuthenticated: false,
        };
      }

      try {
        const { user, restaurant, role, tokens } = JSON.parse(
          authData
        ) as LoginResponse;

        return {
          user,
          restaurant,
          role,
          tokens,
          isAuthenticated: !!tokens.access,
        } as LoginResponse;
      } catch {
        // If JSON parsing fails, clear the invalid data
        localStorage.removeItem("auth");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return {
          user: null,
          restaurant: null,
          role: null,
          tokens: null,
          isAuthenticated: false,
        };
      }
    },
    // Disable network refetch since we're using local storage
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

// Login mutation
export function useLogin() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const { data } = await apiClient.post<LoginResponse>(
        "/login/",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      // Store auth data in localStorage
      localStorage.setItem("auth", JSON.stringify(data));
      localStorage.setItem("access_token", JSON.stringify(data.tokens.access));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data.tokens.refresh)
      );

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });
}

// Logout mutation
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/logout/");
    },
    onSuccess: () => {
      // Clear auth data from localStorage
      localStorage.removeItem("auth");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.clear();
      router.push("/login");
      toast({
        title: "Logged out successfully",
      });
    },
  });
}

// Refresh token mutation
export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: RefreshTokenRequest) => {
      const { data } = await apiClient.post<RefreshTokenResponse>(
        "/refresh/",
        request
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.state });
    },
  });
}
