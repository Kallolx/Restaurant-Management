import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/apiClient";
import { CreateOfferData } from "@/types/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FOOD_MENU_KEYS } from "./use-food-menu";

const FOOD_OFFER_KEYS = {
  all: ["food-offers"] as const,
  list: () => [...FOOD_OFFER_KEYS.all, "list"] as const,
  detail: (id: string) => [...FOOD_OFFER_KEYS.all, "detail", id] as const,
};

export function useCreateFoodOffer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateOfferData) => {
      const { data: responseData } = await apiClient.post(
        "/menu-offers/",
        data
      );
      return responseData;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Food offer created successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_OFFER_KEYS.all });
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

export function useUpdateFoodOffer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      uuid,
      data,
    }: {
      uuid: string;
      data: CreateOfferData;
    }) => {
      const { data: responseData } = await apiClient.put(
        `/menu-offers/${uuid}/`,
        data
      );
      return responseData;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Food offer updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_OFFER_KEYS.all });
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

export function useDeleteFoodOffer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (uuid: string) => {
      await apiClient.delete(`/menu-offers/${uuid}/`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Food offer deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_OFFER_KEYS.all });
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
