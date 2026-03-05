import { apiRequest, buildJsonRequest } from "./client";

export const submitContactMessage = (payload) =>
  apiRequest("/contacts", buildJsonRequest("POST", payload));

export const getContactMessages = (token) =>
  apiRequest("/contacts", {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const markContactAsRead = (id, token) =>
  apiRequest(`/contacts/${id}/read`, {
    method: "PATCH",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const deleteContactMessage = (id, token) =>
  apiRequest(`/contacts/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
