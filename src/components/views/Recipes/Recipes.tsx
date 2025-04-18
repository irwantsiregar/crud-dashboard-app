import ButtonsAction from "@/components/commons/ButtonsAction/ButtonsAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { totalPages } from "@/utils/totalPages";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useId } from "react";
import { CiStar } from "react-icons/ci";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { COLUMN_LISTS_RECIPES } from "./Recipes.constants";
import useRecipes from "./useRecipes";

const Recipes = () => {
  const { push, isReady, query } = useRouter();
  const uniqueID = useId();

  const {
    dataRecipes,

    isLoadingRecipes,
    isRefetchingRecipes,

    refetchRecipes,
    selectedId,
    setSelectedId,
  } = useRecipes();

  const addRecipesModal = useDisclosure();
  const deleteRecipesModal = useDisclosure();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (post: Record<string, unknown>, columKey: Key) => {
      const cellValue = post[columKey as keyof typeof post];

      const isURL = typeof cellValue === "string" && cellValue.includes("http");

      switch (columKey) {
        case "image":
          return (
            <Image
              src={isURL ? cellValue : ""}
              alt="Image"
              width={100}
              height={100}
              loading="lazy"
              className="rounded-lg"
            />
          );
        case "name":
          return <h4 className="flex font-semibold">{cellValue as string}</h4>;
        case "cuisine":
          return <span key={uniqueID}>{cellValue as string}</span>;
        case "ingredients":
          const arrIngredi = cellValue as Array<string>;
          return <div className="flex">{arrIngredi.join("., ")}</div>;
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
        case "tags":
          const arrTags = cellValue as Array<string>;
          return (
            arrTags?.length > 0 && (
              <div className="flex w-fit flex-wrap gap-1 p-1">
                {arrTags.map((tag: string) => (
                  <Chip
                    className="border-default-200"
                    variant="bordered"
                    startContent={<>#</>}
                    key={tag}
                  >
                    {tag}
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
        case "actions":
          return (
            <ButtonsAction
              onPressButtonDetail={() => {}}
              onPressButtonUpdate={() => {
                setSelectedId(`${post?.id}`);
              }}
              onPressButtonDelete={() => {
                setSelectedId(`${post?.id}`);
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
          buttonTopContentLabel="Create Recipe"
          columns={COLUMN_LISTS_RECIPES}
          data={dataRecipes?.recipes || []}
          emptyContent="Recipe is empty"
          isLoading={isLoadingRecipes || isRefetchingRecipes}
          onClickButtonTopContent={addRecipesModal.onOpen}
          renderCell={renderCell}
          totalPages={totalPages(dataRecipes?.total)}
          placeholderSearch="Search by name"
        />
      )}
    </section>
  );
};

export default Recipes;
