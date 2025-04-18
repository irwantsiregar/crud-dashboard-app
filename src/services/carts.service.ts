import instanceDummy from "@/libs/axios/instanceDummy";
import endpoint from "./endpoint.constant";

const cartsServices = {
  getCarts: (params?: string) =>
    instanceDummy.get(`${endpoint.CARTS}?${params}`),
};

export default cartsServices;
