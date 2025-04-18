import DataTable from "@/components/ui/DataTable";
import { Button } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import useProducts from "../../Products/useProducts";
import { COLUMN_LISTS_PRODUCTS } from "./Products.constants";

const Products = () => {
  const { push } = useRouter();

  const {
    dataProducts,

    isLoadingProducts,
    isRefetchingProducts,
  } = useProducts();

  const renderCell = useCallback(
    (product: Record<string, unknown>, columKey: Key) => {
      const cellValue = product[columKey as keyof typeof product];

      return cellValue as ReactNode;
    },
    [push],
  );

  return (
    <section>
      <div className="flex w-full items-center justify-between pb-2 lg:pb-3">
        <h4 className="text-xl font-semibold">Products</h4>

        <Button
          size="sm"
          variant="light"
          className="border-1 border-default-200 text-sm text-default-600"
          onPress={() => push("/products")}
        >
          View All
        </Button>
      </div>

      <DataTable
        thTransparent
        hideTopContent
        hideBottomContent
        columns={COLUMN_LISTS_PRODUCTS}
        data={dataProducts?.products || []}
        emptyContent="Product is empty"
        isLoading={isLoadingProducts || isRefetchingProducts}
        renderCell={renderCell}
        totalPages={0}
      />
    </section>
  );
};

export default Products;
