const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:4000";

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const apiRequest = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, options);
  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      data?.message || data?.error || `Request failed with ${response.status}`;
    const requestError = new Error(message);
    requestError.status = response.status;
    requestError.data = data;
    throw requestError;
  }

  return data;
};

export const buildJsonRequest = (method, body, token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    method,
    headers,
    body: JSON.stringify(body),
  };
};

export const buildFormRequest = (method, formData, token) => {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    method,
    headers,
    body: formData,
  };
};

export { API_BASE_URL };
