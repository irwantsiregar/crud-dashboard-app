import useProducts from "@/components/views/Products/useProducts";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Card, CardBody } from "@heroui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import Campaign from "./Campaign/Campaign";
import LineChart2 from "./Charts/LineChart2";
import Products from "./Products";
import SectionCards from "./SectionCards";
import Recipes from "./Recipes/Recipes";

const MainDashboard = () => {
  const { push, isReady, query } = useRouter();

  const { dataProducts, isLoadingProducts } = useProducts();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const memoizeProductsLineChart2 = useMemo(() => {
    return dataProducts?.products?.map(
      (product: Record<string, unknown>) => product.stock,
    );
  }, [isLoadingProducts]);

  const memoizeRecipesLineChart2 = useMemo(() => {
    return dataProducts?.products?.map(
      (product: Record<string, unknown>) => product.caloriesPerServing,
    );
  }, [isLoadingProducts]);

  return (
    <div className="container-fluid gay-y-3">
      {/* Start::Row-1 */}
      <div className="grid grid-cols-12 gap-x-6">
        {/* left */}
        <div className="col-span-12 xl:col-span-8">
          <SectionCards />
        </div>

        {/* right */}
        <div className="col-span-12 py-4 lg:py-0 xl:col-span-4">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 xl:col-span-12">
              <Campaign />
            </div>
          </div>
        </div>
      </div>
      {/* End: Row-1 */}

      {/* Start: Row-2 */}
      <div className="grid grid-cols-12 gap-x-6 py-3">
        {/* LEFT */}
        <div className="col-span-12 xl:col-span-8">
          <div className="relative flex flex-col overflow-hidden p-3">
            <Products />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 xl:col-span-4">
          <div className="col-span-12 xl:col-span-12">
            <Card>
              <CardBody>
                <div className="relative flex flex-col overflow-hidden p-3">
                  <LineChart2
                    seriesData={memoizeRecipesLineChart2}
                    isLoading={isLoadingProducts}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      {/* End: Row-2 */}

      {/* Start: Row-3 */}
      <div className="grid grid-cols-12 gap-x-6 py-3">
        {/* LEFT */}
        <div className="col-span-12 xl:col-span-4">
          <div className="col-span-12 xl:col-span-12">
            <Card>
              <CardBody>
                <div className="relative flex flex-col overflow-hidden p-3">
                  <LineChart2
                    seriesData={memoizeProductsLineChart2}
                    isLoading={isLoadingProducts}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 xl:col-span-8">
          <div className="relative flex flex-col overflow-hidden p-3">
            <Recipes />
          </div>
        </div>
      </div>
      {/* End: Row-3 */}
    </div>
  );
};

export default MainDashboard;
