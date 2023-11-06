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
    // Customize the serialization of query parameters
    if (config.params) {
      const params = Object.keys(config.params)
        .map((key) => {
          const value = config.params[key];
          if (Array.isArray(value)) {
            return value
              .map((v) => `${key}=${encodeURIComponent(v)}`)
              .join("&");
          } else {
            return `${key}=${encodeURIComponent(value)}`;
          }
        })
        .join("&");
      config.url += `?${params}`;
      config.params = undefined;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
