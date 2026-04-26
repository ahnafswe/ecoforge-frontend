import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface BackendErrorResponse {
	success: boolean;
	message: string;
	errors?: object[];
}

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const apiClient = axios.create({
	baseURL,
	withCredentials: true,
});

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: unknown) => {
		return Promise.reject(error);
	},
);

apiClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError<BackendErrorResponse>) => {
		if (error.response?.status === 401) {
			if (typeof window !== "undefined") {
				window.location.href = "/login";
			}
		}

		const errorMessage =
			error.response?.data?.message || error.message || "An unexpected error occurred";

		return Promise.reject(new Error(errorMessage));
	},
);
