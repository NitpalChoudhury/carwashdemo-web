import { apiRequest, buildJsonRequest } from "./client";

export const getAnnouncements = () => apiRequest("/announcements");
export const getActiveAnnouncement = () => apiRequest("/announcements/active");

export const createAnnouncement = (payload, token) =>
  apiRequest("/announcements", buildJsonRequest("POST", payload, token));

export const updateAnnouncement = (id, payload, token) =>
  apiRequest(`/announcements/${id}`, buildJsonRequest("PUT", payload, token));

export const deleteAnnouncement = (id, token) =>
  apiRequest(`/announcements/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
