import ButtonsAction from "@/components/commons/ButtonsAction/ButtonsAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { formatToDollar } from "@/utils/formatToDollar";
import { totalPages } from "@/utils/totalPages";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { COLUMN_LISTS_PRODUCTS } from "./Products.constants";
import useProducts from "./useProducts";

const Products = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataProducts,

    isLoadingProducts,
    isRefetchingProducts,

    refetchProducts,
    selectedId,
    setSelectedId,
  } = useProducts();

  const addProductsModal = useDisclosure();
  // const deleteProductsModal = useDisclosure();

  const { setURL, handleSortChange } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (product: Record<string, unknown>, columKey: Key) => {
      const cellValue = product[columKey as keyof typeof product];

      const isURL = typeof cellValue === "string" && cellValue.includes("http");

      switch (columKey) {
        case "thumbnail":
          return (
            <Image
              src={isURL ? cellValue : ""}
              alt="Image"
              width={100}
              height={100}
              loading="lazy"
              className="rounded-md bg-default-100"
            />
          );
        case "title":
          return <h4 className="flex font-semibold">{cellValue as string}</h4>;
        case "sku":
          return (
            <div className="flex justify-center rounded-md border border-default-200 p-1 font-normal">
              {cellValue as string}
            </div>
          );
        case "availabilityStatus":
          const stockStatus = cellValue as string;
          return (
            <Chip
              className="border-default-200"
              size="sm"
              color={
                stockStatus.toLowerCase() === "low stock" ? "danger" : "success"
              }
            >
              {stockStatus}
            </Chip>
          );
        case "rating":
          return (
            <Chip
              variant="bordered"
              className="border-1 border-orange-200"
              startContent={<CiStar className="text-lg text-orange-600" />}
            >
              {cellValue as number}
            </Chip>
          );
        case "actions":
          return (
            <ButtonsAction
              onPressButtonDetail={() => {}}
              onPressButtonUpdate={() => {
                setSelectedId(`${product?.id}`);
              }}
              onPressButtonDelete={() => {
                setSelectedId(`${product?.id}`);
              }}
            />
          );
        default:
          if (["price"].includes(columKey as string)) {
            return formatToDollar(cellValue as number);
          }
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Product"
          columns={COLUMN_LISTS_PRODUCTS}
          data={dataProducts?.products || []}
          emptyContent="Product is empty"
          isLoading={isLoadingProducts || isRefetchingProducts}
          onClickButtonTopContent={addProductsModal.onOpen}
          renderCell={renderCell}
          totalPages={totalPages(dataProducts?.total)}
          placeholderSearch="Search by title"
          onSortChange={handleSortChange}
        />
      )}
    </section>
  );
};

export default Products;
