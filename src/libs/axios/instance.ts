import environment from "@/config/environment";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

// Intercept request (manipulate) before the continue sending process to server
instance.interceptors.request.use(
  async (request) => request,
  (error) => Promise.reject(error)
);

// Intercept response (manipulate) before the continue sending process to client
instance.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
