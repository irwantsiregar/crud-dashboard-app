import {
  DELAY,
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "@/constants/limit.constants";
import useDebounce from "@/hooks/useDebounce";
import { SortDescriptor } from "@heroui/react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentSortBy = router.query.sortBy;
  const currentOrder = router.query.order;

  const setURL = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
        ...(!(!currentSortBy && !currentOrder) && {
          sortBy: currentSortBy,
          order: currentOrder,
        }),
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

  const handleSortChange = (descriptor: SortDescriptor) => {
    console.log(descriptor);

    if (descriptor.column && descriptor.direction) {
      router.push({
        query: {
          ...router.query,
          sortBy: descriptor.column,
          order: descriptor.direction === "descending" ? "desc" : "asc",
        },
      });
    }
  };

  return {
    currentLimit,
    currentPage,
    currentSearch,
    currentSortBy,
    currentOrder,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleSortChange,
    setURL,
  };
};

export default useChangeUrl;
