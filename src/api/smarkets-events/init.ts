import axios from "axios";
import { SMARKETS_API } from "../../config/constants";

export const smarketsEventsAPI = axios.create({
  baseURL: `${SMARKETS_API}/v3/events/`,
  headers: {
    "Content-Type": "application/json",
  },
});

smarketsEventsAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
