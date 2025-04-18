import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";

const Category = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataCategory,

    isLoadingCategory,
    isRefetchingCategory,

    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columKey: Key) => {
      const cellValue = category[columKey as keyof typeof category];

      const isURL = typeof cellValue === "string" && cellValue.includes("http");

      switch (columKey) {
        case "icon":
          return (
            <Image
              src={`${isURL ? cellValue : ""}`}
              alt="icon"
              width={100}
              height={200}
            />
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/category/${category?._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LISTS_CATEGORY}
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination?.totalPages}
        />
      )}

      <AddCategoryModal
        {...addCategoryModal}
        refetchCategory={refetchCategory}
      />

      <DeleteCategoryModal
        {...deleteCategoryModal}
        refetchCategory={refetchCategory}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Category;
