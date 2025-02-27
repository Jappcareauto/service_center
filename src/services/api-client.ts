import axios from "axios"
import { BASE_URL } from "@/app/config/Base";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for adding bearer token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("AUTH_ACCESS");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (for handling errors globally)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Handle 401 Unauthorized
        if (error.response.status === 401) {
          console.log("Unauthorized, logging out...");
          localStorage.removeItem("AUTH_ACCESS");
          window.location.href = "/login"; // Redirect to login page
        }
        console.error("API Error:", error.response.data.message);
      }
      return Promise.reject(error);
    }
  );

export default apiClient