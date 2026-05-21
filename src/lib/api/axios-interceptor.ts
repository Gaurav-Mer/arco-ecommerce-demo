import { api } from "@/api/axios-instance";
import axios from "axios";

api.interceptors.request.use((config) => {
    return config
}, (error) => Promise.reject(error))

api.interceptors.response.use((res) => res, (error) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            return Promise.reject({
                message: error.response.data.message,
                status: error.response.status,
            })
        }

        if (error.request) {
            return Promise.reject({
                message: "Network error"
            })
        }

        return Promise.reject({
            message: "Unexpected error occurred"
        })
    }

    return Promise.reject(error)
})