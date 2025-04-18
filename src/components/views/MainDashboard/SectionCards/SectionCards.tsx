import CardSummary from "@/components/ui/CardSummary";
import useCarts from "@/components/views/Carts/useCarts";
import useProducts from "@/components/views/Products/useProducts";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { BsBookmarkCheck } from "react-icons/bs";
import { CiBurger, CiMenuKebab, CiShoppingCart } from "react-icons/ci";
import { FiChevronUp } from "react-icons/fi";
import { MdCreditScore } from "react-icons/md";
import usePosts from "../../Posts/usePosts";
import useRecipes from "../../Recipes/useRecipes";
import { MixedChart, PolarAreaChart } from "../Charts";

const SectionCards = () => {
  const { isReady } = useRouter();

  const { dataProducts, isLoadingProducts } = useProducts();
  const { dataCarts, isLoadingCarts } = useCarts();
  const { dataPosts, isLoadingPosts } = usePosts();
  const { dataRecipes, isLoadingRecipes } = useRecipes();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const memoizeMixedData = useMemo(() => {
    return [
      {
        name: "Products",
        type: "column",
        data: dataProducts?.products?.map(
          (product: Record<string, unknown>) => product.price,
        ),
      },
      {
        name: "Carts",
        type: "line",
        data: dataCarts?.carts?.map(
          (cart: Record<string, unknown>) => cart.total,
        ),
      },
      {
        name: "Posts",
        type: "area",
        data: dataPosts?.posts?.map(
          (post: Record<string, unknown>) => post.views,
        ),
      },
    ];
  }, [
    isLoadingProducts,
    isLoadingCarts,
    isLoadingPosts,
    dataProducts,
    dataPosts,
    dataCarts,
  ]);

  const handleAccumulate = (data: any[], key: string) => {
    return (
      data?.reduce(
        (accumulator, currentValue) => accumulator + currentValue[key],
        0,
      ) || 0
    );
  };

  const memoizePolarArea = useMemo(() => {
    const totalPriceInProducts = handleAccumulate(dataCarts?.products, "price");
    const totalPriceInCarts = handleAccumulate(dataCarts?.carts, "total");
    const totalViewsInPosts = handleAccumulate(dataCarts?.posts, "views");
    const totalReviewInRecipes = handleAccumulate(
      dataCarts?.recipes,
      "reviewCount",
    );

    return [
      totalPriceInProducts,
      totalPriceInCarts,
      totalViewsInPosts,
      totalReviewInRecipes,
    ];
  }, [isLoadingProducts, isLoadingCarts, isLoadingPosts, isLoadingRecipes]);

  return (
    <div className="grid grid-cols-12 gap-0">
      {/* PRODUCT */}
      <div className="xxl:col-span-3 col-span-12 xl:col-span-6">
        <div className="relative flex flex-col overflow-hidden p-3">
          <CardSummary
            label={`Total Products`}
            total={dataProducts?.total ?? 0}
            icon={<MdCreditScore className="text-2xl font-bold text-white" />}
            creased={2.34}
            isCreased={false}
            bgIcon="danger"
            isLoading={isLoadingProducts}
          />
        </div>
      </div>

      <div className="xxl:col-span-3 col-span-12 xl:col-span-6">
        <div className="relative flex flex-col overflow-hidden p-3">
          <CardSummary
            label={`Total Posts`}
            total={dataPosts?.total ?? 0}
            icon={<BsBookmarkCheck className="text-2xl font-bold text-white" />}
            creased={3.8}
            isCreased={true}
            bgIcon="success"
            isLoading={isLoadingProducts}
          />
        </div>
      </div>

      <div className="xxl:col-span-3 col-span-12 xl:col-span-6">
        <div className="relative flex flex-col overflow-hidden p-3">
          <CardSummary
            label={`Total Carts`}
            total={dataCarts?.total ?? 0}
            icon={<CiShoppingCart className="text-2xl font-bold text-white" />}
            creased={3.54}
            isCreased={true}
            bgIcon="warning"
            isLoading={isLoadingCarts}
          />
        </div>
      </div>

      <div className="xxl:col-span-3 col-span-12 xl:col-span-6">
        <div className="relative flex flex-col overflow-hidden p-3">
          <CardSummary
            label={`Total Recipes`}
            total={dataRecipes?.total ?? 0}
            icon={<CiBurger className="text-2xl font-bold text-white" />}
            creased={2.97}
            isCreased={false}
            bgIcon="primary"
            isLoading={isLoadingRecipes}
          />
        </div>
      </div>

      {/* Chart Mixed */}
      <div className="col-span-12 pb-4 lg:pb-0 xl:col-span-8">
        <div className="relative flex flex-col gap-2 overflow-hidden p-3">
          <Card>
            <CardHeader>
              <div className="flex w-full items-center justify-between px-2 pb-2">
                <h4 className="text-medium font-semibold">All Overview</h4>

                <Button
                  className="border-1 border-default-200 text-xs text-default-400"
                  variant="light"
                  size="sm"
                >
                  Sort By <FiChevronUp className="text-base" />
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <MixedChart
                isLoading={
                  isLoadingProducts &&
                  isLoadingCarts &&
                  isLoadingPosts &&
                  !memoizeMixedData
                }
                seriesData={memoizeMixedData}
              />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Chart Polar */}
      <div className="col-span-12 rounded-xl xl:col-span-4">
        <div className="relative flex flex-col overflow-hidden px-2">
          <Card>
            <CardHeader>
              <div className="flex w-full items-center justify-between">
                <h4 className="text-medium font-semibold">Features</h4>

                <Button
                  isIconOnly
                  className="border-1 border-default-200 text-sm"
                  size="sm"
                  variant="light"
                >
                  <CiMenuKebab />
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              <div className="flex w-full flex-wrap gap-3 pb-8">
                {["Products", "Posts", "Carts", "Recipes"].map(
                  (item, index) => (
                    <Chip
                      aria-label="Features Type"
                      color={index % 2 === 0 ? "danger" : "secondary"}
                      className="border-default-200"
                      size="sm"
                      key={item}
                    >
                      {item}
                    </Chip>
                  ),
                )}
              </div>

              <PolarAreaChart
                isLoading={
                  isLoadingProducts &&
                  isLoadingCarts &&
                  isLoadingPosts &&
                  !memoizePolarArea
                }
                seriesData={memoizePolarArea}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SectionCards;
