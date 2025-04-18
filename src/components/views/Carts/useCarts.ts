import useChangeUrl from "@/hooks/useChangeUrl";
import cartsServices from "@/services/carts.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCarts = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>("");

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCarts = async () => {
    let params = `limit=${currentLimit}`;

    if (Number(currentPage) > 1) {
      params += `&skip=${(Number(currentPage) - 1) * Number(currentLimit)}`;
    }

    if (currentSearch) {
      params += `&q=${currentSearch}`;
    }

    const res = await cartsServices.getCarts(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataCarts,
    isLoading: isLoadingCarts,
    isRefetching: isRefetchingCarts,
    refetch: refetchCarts,
  } = useQuery({
    queryKey: ["Carts", currentPage, currentLimit, currentSearch],
    queryFn: () => getCarts(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCarts,
    isLoadingCarts,
    isRefetchingCarts,
    refetchCarts,
    selectedId,
    setSelectedId,
  };
};

export default useCarts;
