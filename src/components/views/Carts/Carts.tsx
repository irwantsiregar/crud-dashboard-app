import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { totalPages } from "@/utils/totalPages";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_CARTS } from "./Carts.constants";
import useCarts from "./useCarts";
import { formatToDollar } from "@/utils/formatToDollar";
import DropdownAction from "@/components/commons/DropdownAction";

const Carts = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataCarts,

    isLoadingCarts,
    isRefetchingCarts,

    refetchCarts,
    selectedId,
    setSelectedId,
  } = useCarts();

  const addCartsModal = useDisclosure();
  const deleteCartsModal = useDisclosure();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (cart: Record<string, unknown>, columKey: Key) => {
      const cellValue = cart[columKey as keyof typeof cart];

      switch (columKey) {
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {}}
              onPressButtonUpdate={() => {
                setSelectedId(`${cart?.id}`);
              }}
              onPressButtonDelete={() => {
                setSelectedId(`${cart?.id}`);
              }}
            />
          );
        default:
          if (["total", "discountedTotal"].includes(columKey as string)) {
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
          columns={COLUMN_LISTS_CARTS}
          data={dataCarts?.carts || []}
          emptyContent="Carts is empty"
          isLoading={isLoadingCarts || isRefetchingCarts}
          onClickButtonTopContent={addCartsModal.onOpen}
          renderCell={renderCell}
          totalPages={totalPages(dataCarts?.total)}
        />
      )}
    </section>
  );
};

export default Carts;
