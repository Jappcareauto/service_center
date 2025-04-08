import axios from "axios"

const BASE_URL = "https://bpi.jappcare.com/api/v1"

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

interface Token {
    accessToken: string;
    accessTokenExpiry: number;
    refreshToken: string;
    refreshTokenExpiry: number;
}

apiClient.interceptors.request.use(
    (config) => {
        const token: Token | null = localStorage.getItem("AUTH_ACCESS") ? JSON.parse(localStorage.getItem("AUTH_ACCESS") as string) : null;
        console.log("my token")
        console.log(token?.accessToken)
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
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