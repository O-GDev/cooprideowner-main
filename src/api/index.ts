import axios from "axios";
import { getCachedData } from "../helpers/storage";

const createAxiosInstance = (axios: any, config: any) => {
  const instance = axios.create(config);

  instance.interceptors.request.use(
    async (config: any) => {
      const token = await getCachedData("token");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async (response: any) => {
      return response.data;
    },
    (error: any) => {
      const status = error.response.status;
      const data = error.response.data;
      handleError(status, data);
      return Promise.reject(convertError(data));
    }
  );

  return instance;
};

const apiClient = createAxiosInstance(axios, { baseURL: "https://coopride-api.onrender.com/api/" });

export const mediaClient = createAxiosInstance(axios, {
  baseURL: "https://coopride-api.onrender.com/api/user_mgt/upload_media/",
  "Content-Type": "multipart/form-data",
});

export default apiClient;

const handleError = (status: number, data: any) => {
  switch (status) {
    case 400:
      console.error("Bad Request:", data);
      return data;
      break;
    case 401:
      console.error("Unauthorized:", data);
      
      return data.detail;
      // Optionally, redirect to login page
      break;
    case 403:
      console.error("Forbidden:", data);
      return data;
      break;
    case 404:
      console.error("Not Found:", data);
      return convertError(data);
      break;
    case 429:
      console.error("Too Many Requests:", data);
      return data;
      // Implement retry logic or exponential backoff
      break;
    case 500:
      console.error("Internal Server Error:", data);
      break;
    case 502:
      console.error("Bad Gateway:", data);
      // Consider retry logic
      break;
    case 503:
      console.error("Service Unavailable:", data);
      // Retry after some time or alert the user
      break;
    case 504:
      console.error("Gateway Timeout:", data);
      // Retry logic or notify the user to try again later
      break;
    default:
      console.error(`Unexpected Error ${status}:`, data);
  }
};

const convertError = (errorData: any = {}) => {
  if (errorData?.detail) {
    return { message: errorData.detail };
  }

  return errorData;
};
