import { message } from "antd";
import { useEffect, useState } from "react";

interface useSessionStorageAPIProps<T> {
  key: string;
  fetchFn: () => Promise<T>;
  expiry?: number;
  errorMessageDefault?: string;
}

export const useSessionStorageAPI = <T,>(
  props: useSessionStorageAPIProps<T>
) => {
  const { key, fetchFn, expiry = 60 * 60 * 24 } = props;
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (data) return;
    const fetchData = async () => {
      const storedData = sessionStorage.getItem(key);
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        try {
          const response = await fetchFn();

          // Store the data in sessionStorage
          if (!response) return;
          sessionStorage.setItem(key, JSON.stringify(response));
          sessionStorage.setItem(`${key}_expiry`, Date.now().toString());
          setData(response);
        } catch (e) {
          message.error(props.errorMessageDefault || "Error loading data");
        }
      }
    };

    // Check if the data is expired
    const storedDataExpiry = sessionStorage.getItem(`${key}_expiry`);
    if (storedDataExpiry) {
      const expiryDate = parseInt(storedDataExpiry);
      const now = Date.now();
      if (expiryDate < now) {
        fetchData();
      }
      return;
    }

    fetchData();
  }, [key, fetchFn, expiry, data, props.errorMessageDefault]);

  return data;
};
