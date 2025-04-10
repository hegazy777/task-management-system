import axios from "axios";
import { baseURL } from "./apiConfig";

const apiInstance = axios.create({
  baseURL,
});

const privateApiInstance = axios.create({
  baseURL,
   
});

privateApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get fresh token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { privateApiInstance, apiInstance };
