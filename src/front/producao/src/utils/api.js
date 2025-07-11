import { logout } from "./auth";

const baseUrl = import.meta.env.VITE_API_URL;

async function apiRequest(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const shouldSendToken = !["/auth/login"].includes(endpoint);

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(shouldSendToken && token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options);

    if (response.status === 403) {
      console.warn("Token expirado ou inválido. Redirecionando para login.");
      localStorage.setItem("logoutReason", "expired");
      logout(); 
      return; 
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Erro na requisição: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
}

export const api = {
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, data) => apiRequest(endpoint, "POST", data),
  put: (endpoint, data) => apiRequest(endpoint, "PUT", data),
  patch: (endpoint, data) => apiRequest(endpoint, "PATCH", data),
  delete: (endpoint) => apiRequest(endpoint, "DELETE"),
};
