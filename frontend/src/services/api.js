import axios from "axios";

const API = axios.create({
  baseURL: "https://project-management-backend-9.onrender.com",
});

// Add token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = Bearer `${token}`;
  }
  return config;
});

export default API;