import { apiRequest } from "./client";

export const getVideoContent = () => apiRequest("/videos");
export const getShortVideo = () => apiRequest("/videos/short");
export const getLongVideo = () => apiRequest("/videos/long");

export const deleteAllVideos = (token) =>
  apiRequest("/videos", {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const deleteShortVideo = (token) =>
  apiRequest("/videos/short", {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const deleteLongVideo = (token) =>
  apiRequest("/videos/long", {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const deleteShortVideoByIndex = (index, token) =>
  apiRequest(`/videos/short/${index}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const deleteLongVideoByIndex = (index, token) =>
  apiRequest(`/videos/long/${index}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
