import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import nookies from "nookies";

export const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:5555",
    headers: {
        "Content-Type": "application/json",
    },
});