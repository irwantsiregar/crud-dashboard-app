import environment from "@/config/environment";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const instanceDummy = axios.create({
  baseURL: environment.DUMMYJSON_API_URL,
  headers,
  timeout: 60 * 2000,
});

instanceDummy.interceptors.request.use(
  async (request) => {
    return request;
  },
  (error) => Promise.reject(error),
);

instanceDummy.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error),
);

export default instanceDummy;
