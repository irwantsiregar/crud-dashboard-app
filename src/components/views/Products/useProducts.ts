import useChangeUrl from "@/hooks/useChangeUrl";
import productsServices from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useProducts = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>("");

  const {
    currentLimit,
    currentPage,
    currentSearch,
    currentSortBy,
    currentOrder,
  } = useChangeUrl();

  const getProducts = async () => {
    let params = `limit=${currentLimit}`;
    // let params = `limit=${currentLimit}&skip=${Number(currentPage) * Number(currentLimit)}`;

    if (Number(currentPage) > 1) {
      params += `&skip=${(Number(currentPage) - 1) * Number(currentLimit)}`;
    }

    if (currentSearch) {
      params += `&q=${currentSearch}`;
    }
    if (!(!currentSortBy && !currentOrder)) {
      params += `&sortBy=${currentSortBy}&order=${currentOrder}`;
    }

    const res = await productsServices.getProducts(
      params,
      currentSearch !== "",
    );
    const { data } = res;

    return data;
  };

  const {
    data: dataProducts,
    isLoading: isLoadingProducts,
    isRefetching: isRefetchingProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: [
      "Products",
      currentPage,
      currentLimit,
      currentSearch,
      currentSortBy,
      currentOrder,
    ],
    queryFn: () => getProducts(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataProducts,
    isLoadingProducts,
    isRefetchingProducts,
    refetchProducts,
    selectedId,
    setSelectedId,
  };
};

export default useProducts;
