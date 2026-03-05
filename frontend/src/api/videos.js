import { apiRequest } from "./client";

export const getVideoContent = () => apiRequest("/videos");
export const getShortVideo = () => apiRequest("/videos/short");
export const getLongVideo = () => apiRequest("/videos/long");
