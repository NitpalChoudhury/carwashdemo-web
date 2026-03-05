import { apiRequest } from "./client";

export const getBanner = () => apiRequest("/banner");

export const deleteBanner = (token) =>
  apiRequest("/banner", {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
