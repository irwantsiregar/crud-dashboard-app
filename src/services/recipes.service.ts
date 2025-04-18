import instance from "@/libs/axios/instanceDummy";
import endpoint from "./endpoint.constant";

const recipesServices = {
  getRecipes: (params?: string, isSearch?: boolean) =>
    instance.get(
      `${endpoint.RECIPES}${isSearch ? endpoint.SEARCH : ""}?${params}`,
    ),
};

export default recipesServices;
