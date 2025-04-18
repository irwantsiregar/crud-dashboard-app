import instanceDummy from "@/libs/axios/instanceDummy";
import endpoint from "./endpoint.constant";
// import Axios from "axios";

const productsServices = {
  getProducts: (params?: string, isSearch?: boolean) =>
    instanceDummy.get(
      `${endpoint.PRODUCTS}${isSearch ? endpoint.SEARCH : ""}?${params}`,
    ),
};

export default productsServices;
