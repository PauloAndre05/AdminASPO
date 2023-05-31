import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import nookies from "nookies";

export const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:1337/api/",
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${nookies.get(null).token}`,
    },
});