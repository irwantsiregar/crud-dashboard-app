import DataTable from "@/components/ui/DataTable";
import { Button, Chip } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { CiStar } from "react-icons/ci";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import useRecipes from "../../Recipes/useRecipes";
import { COLUMN_LISTS_RECIPES } from "./Recipes.constants";

const Recipes = () => {
  const { push } = useRouter();

  const {
    dataRecipes,

    isLoadingRecipes,
    isRefetchingRecipes,
  } = useRecipes();

  const renderCell = useCallback(
    (product: Record<string, unknown>, columKey: Key) => {
      const cellValue = product[columKey as keyof typeof product];

      switch (columKey) {
        case "name":
          return <h4 className="flex font-semibold">{cellValue as string}</h4>;
        case "mealType":
          const arrMealType = cellValue as Array<string>;
          return (
            arrMealType?.length > 0 && (
              <div className="flex flex-wrap gap-1 p-1">
                {arrMealType.map((mealtype: string, index: number) => (
                  <Chip
                    aria-label="Meal Type"
                    color={index % 2 === 0 ? "danger" : "secondary"}
                    className="border-default-200"
                    size="sm"
                    key={mealtype}
                  >
                    {mealtype}
                  </Chip>
                ))}
              </div>
            )
          );
        case "caloriesPerServing":
          const calories = cellValue as number;
          return (
            <div className="flex gap-x-1">
              {calories}
              {calories > 320 && (
                <FiArrowUp className="text-medium text-success" />
              )}
              {calories < 150 && (
                <FiArrowDown className="text-medium text-red-600" />
              )}
            </div>
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
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      <div className="flex w-full items-center justify-between pb-2 lg:pb-3">
        <h4 className="text-xl font-semibold">Recipes</h4>

        <Button
          size="sm"
          variant="light"
          className="border-1 border-default-200 text-sm text-default-600"
          onPress={() => push("/recipes")}
        >
          View All
        </Button>
      </div>

      <DataTable
        thTransparent
        hideTopContent
        hideBottomContent
        columns={COLUMN_LISTS_RECIPES}
        data={dataRecipes?.recipes || []}
        emptyContent="Recipes is empty"
        isLoading={isLoadingRecipes || isRefetchingRecipes}
        renderCell={renderCell}
        totalPages={0}
      />
    </section>
  );
};

export default Recipes;
