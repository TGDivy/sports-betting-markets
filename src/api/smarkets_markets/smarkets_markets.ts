import {
  marketQuotes,
  contractType,
  volumentType,
} from "types/smarket_markets";
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

export const getMarketContracts = async (market_ids: number[]) => {
  try {
    const response = await smarketsMarketsAPI.get<{
      description: string;
      contracts: contractType[];
    }>(`${market_ids.join(",")}/contracts/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMarketQuotes = async (market_ids: number[]) => {
  try {
    const response = await smarketsMarketsAPI.get<marketQuotes>(
      `${market_ids.join(",")}/quotes/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
