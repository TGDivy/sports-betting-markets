if (!process.env.REACT_APP_SMARKETS_API) {
  throw new Error("REACT_APP_SMARKETS_API is not set");
}

export const SMARKETS_API = process.env.REACT_APP_SMARKETS_API;
