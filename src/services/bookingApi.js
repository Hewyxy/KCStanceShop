
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export async function getServices() {
  const response = await fetch(`${API_URL}/api/services`);

  if (!response.ok) {
    throw new Error("Failed to load services.");
  }

  return response.json();
}

export async function getAvailability(serviceId, date) {
  const params = new URLSearchParams({
    serviceId: String(serviceId),
    date,
  });

  const response = await fetch(
    `${API_URL}/api/availability?${params}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to load available times."
    );
  }

  return result;
}

export async function createAppointment(appointment) {
  const response = await fetch(`${API_URL}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to book appointment."
    );
  }

  return result;
}
