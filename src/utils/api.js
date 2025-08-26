const API_BASE = "";

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/events`);
  return res.json();
}

export async function createEvent(formData) {
  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

export async function fetchEventById(id) {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}
