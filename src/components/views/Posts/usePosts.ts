import useChangeUrl from "@/hooks/useChangeUrl";
import postsServices from "@/services/posts.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const usePosts = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>("");

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getPosts = async () => {
    let params = `limit=${currentLimit}`;

    if (Number(currentPage) > 1) {
      params += `&skip=${(Number(currentPage) - 1) * Number(currentLimit)}`;
    }

    if (currentSearch) {
      params += `&q=${currentSearch}`;
    }

    const res = await postsServices.getPosts(params, currentSearch !== "");
    const { data } = res;

    return data;
  };

  const {
    data: dataPosts,
    isLoading: isLoadingPosts,
    isRefetching: isRefetchingPosts,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["Posts", currentPage, currentLimit, currentSearch],
    queryFn: () => getPosts(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataPosts,
    isLoadingPosts,
    isRefetchingPosts,
    refetchPosts,
    selectedId,
    setSelectedId,
  };
};

export default usePosts;
