import axios from "axios";

const api = axios.create({
  baseURL: "https://eventora-1-cjp7.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ FIX
  }
  return config;
});

export default api;