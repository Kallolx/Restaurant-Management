import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/apiClient";
import { Category, CreateCategoryData, UpdateCategoryData } from "@/types/menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CategoriesResponse {
  general_categories: Category[];
  restaurant_categories: Category[];
}

const FOOD_CATEGORY_KEYS = {
  all: ["food-categories"] as const,
  list: () => [...FOOD_CATEGORY_KEYS.all, "list"] as const,
  detail: (id: string) => [...FOOD_CATEGORY_KEYS.all, "detail", id] as const,
};

export function useFoodCategories() {
  return useQuery({
    queryKey: FOOD_CATEGORY_KEYS.list(),
    queryFn: async () => {
      const { data } = await apiClient.get<CategoriesResponse>("/food-categories/");
      return data;
    },
  });
}

export function useCreateFoodCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const { data: responseData } = await apiClient.post("/food-categories/", data);
      return responseData;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Food category created successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_CATEGORY_KEYS.all });
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

export function useUpdateFoodCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ uuid, data }: { uuid: string; data: UpdateCategoryData }) => {
      const { data: responseData } = await apiClient.put(`/food-categories/${uuid}/`, data);
      return responseData;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Food category updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_CATEGORY_KEYS.all });
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

export function useDeleteFoodCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (uuid: string) => {
      await apiClient.delete(`/food-categories/${uuid}/`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Food category deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: FOOD_CATEGORY_KEYS.all });
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
