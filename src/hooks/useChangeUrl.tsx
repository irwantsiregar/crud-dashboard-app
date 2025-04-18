import {
  DELAY,
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "@/constants/limit.constants";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;

  const setURL = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;

    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;

      router.push({
        query: {
          ...router.query,
          page: PAGE_DEFAULT,
          search,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        page: PAGE_DEFAULT,
        search: "",
      },
    });
  };

  return {
    currentLimit,
    currentPage,
    currentSearch,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    setURL,
  };
};

export default useChangeUrl;
