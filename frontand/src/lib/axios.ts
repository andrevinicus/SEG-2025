import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepta todas as requisições
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth"); // pega o JSON armazenado

  if (stored) {
    try {
      const { token } = JSON.parse(stored); // extrai o token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao ler token do localStorage:", error);
    }
  }

  return config;
});
