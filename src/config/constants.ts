if (!process.env.REACT_APP_SMARKETS_API) {
  throw new Error("REACT_APP_SMARKETS_API is not set");
}

if (!process.env.REACT_APP_USE_NEW_TYPES) {
  throw new Error("REACT_APP_USE_NEW_TYPES is not set");
}

export const SMARKETS_API = process.env.REACT_APP_SMARKETS_API;
export const USE_NEW_TYPES = process.env.REACT_APP_USE_NEW_TYPES === "true";
