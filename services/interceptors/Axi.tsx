import axios from "axios";
import { toast } from "sonner";

const Axi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true, // ⭐ THIS replaces Bearer token
    headers: {
        "Content-Type": "application/json",
    },
});

// You can KEEP response interceptors
Axi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.info("Session expired. Please log in again.");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    },
);

export default Axi;
