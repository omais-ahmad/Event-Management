export const API_BASE =
  import.meta.env?.VITE_API_BASE || window.__API_BASE__ || "http://localhost:3000";

function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function setToken(token) {
  if (token) localStorage.setItem("jwt_token", token);
  window.dispatchEvent(new Event("auth-changed"));
}

export function clearToken() {
  localStorage.removeItem("jwt_token");
  window.dispatchEvent(new Event("auth-changed"));
}

export function getToken() {
  return localStorage.getItem("jwt_token") || "";
}

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/api/events`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function createEvent(formData) {
  const res = await fetch(`${API_BASE}/api/events`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

export async function fetchEventById(id) {
  const res = await fetch(`${API_BASE}/api/events/${id}`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/api/events/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to delete event");
  return res.json();
}

export async function sendNotification({ message, eventId }) {
  const res = await fetch(`${API_BASE}/api/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ message, eventId }),
  });
  if (!res.ok) throw new Error("Failed to send notification");
  return res.json();
}

export async function fetchNotifications() {
  const res = await fetch(`${API_BASE}/api/notifications`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export async function login({ username, password }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const possibleToken = data?.token || data?.accessToken || data?.jwt;
  if (possibleToken) setToken(possibleToken);
  return data;
}

export async function register({ username, password }) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Register failed");
  const data = await res.json();
  return data;
}
