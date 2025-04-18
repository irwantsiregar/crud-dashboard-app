import useChangeUrl from "@/hooks/useChangeUrl";
import recipesServices from "@/services/recipes.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useRecipes = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>("");

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getRecipes = async () => {
    let params = `limit=${currentLimit}`;

    if (Number(currentPage) > 1) {
      params += `&skip=${(Number(currentPage) - 1) * Number(currentLimit)}`;
    }

    if (currentSearch) {
      params += `&q=${currentSearch}`;
    }

    const res = await recipesServices.getRecipes(params, currentSearch !== "");
    const { data } = res;

    return data;
  };

  const {
    data: dataRecipes,
    isLoading: isLoadingRecipes,
    isRefetching: isRefetchingRecipes,
    refetch: refetchRecipes,
  } = useQuery({
    queryKey: ["Recipes", currentPage, currentLimit, currentSearch],
    queryFn: () => getRecipes(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataRecipes,
    isLoadingRecipes,
    isRefetchingRecipes,
    refetchRecipes,
    selectedId,
    setSelectedId,
  };
};

export default useRecipes;
