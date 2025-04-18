import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const cartsServices = {
  getCarts: (params?: string) => instance.get(`${endpoint.CARTS}?${params}`),
};

export default cartsServices;
