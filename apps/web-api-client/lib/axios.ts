import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;
