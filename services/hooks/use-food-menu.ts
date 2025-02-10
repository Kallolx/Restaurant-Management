import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/apiClient";
import { MenuItem } from "@/types/menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const FOOD_MENU_KEYS = {
  all: ["food-menu"] as const,
  list: () => [...FOOD_MENU_KEYS.all, "list"] as const,
  detail: (id: string) => [...FOOD_MENU_KEYS.all, "detail", id] as const,
};

export function useFoodMenu(restaurantId: string) {
  return useQuery({
    queryKey: FOOD_MENU_KEYS.list(),
    queryFn: async () => {
      const { data } = await apiClient.get<MenuItem[]>(
        `/restaurants/${restaurantId}/menu/`
      );
      return data;
    },
    enabled: !!restaurantId,
  });
}

export function useCreateFoodMenuItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const { data: responseData } = await apiClient.post(
        "/menu-management/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return responseData;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Menu item created successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_MENU_KEYS.all });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
      });
    },
  });
}

export function useUpdateFoodMenuItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ uuid, data }: { uuid: string; data: FormData }) => {
      const { data: responseData } = await apiClient.put(
        `/menu-management/${uuid}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return responseData;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Menu item updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_MENU_KEYS.all });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
      });
    },
  });
}

export function useDeleteFoodMenuItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (uuid: string) => {
      await apiClient.delete(`/menu-management/${uuid}/`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_MENU_KEYS.all });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
      });
    },
  });
}
