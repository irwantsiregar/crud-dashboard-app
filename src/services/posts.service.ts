import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const postsServices = {
  getPosts: (params?: string, isSearch?: boolean) =>
    instance.get(
      `${endpoint.POSTS}${isSearch ? endpoint.SEARCH : ""}?${params}`,
    ),
};

export default postsServices;
