import { volumentType } from "../../types/smarket-events";
import { smarketsMarketsAPI } from "./init";

export const getMarketVolumes = async (marked_ids: number[]) => {
  try {
    const response = await smarketsMarketsAPI.get<{
      description: string;
      volumes: volumentType[];
    }>(`${marked_ids.join(",")}/volumes/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
