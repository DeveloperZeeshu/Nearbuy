import apiClient from "./apiClient";

apiClient.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config

        if (err.response?.status === 401 &&
            originalRequest.url?.includes('/refresh')
        ) {
            return Promise.reject(err)
        }

        if (
            err.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            try {
                await apiClient.get('/refresh')
                return apiClient(originalRequest)
            } catch (refreshErr) {
                return Promise.reject(refreshErr)
            }
        }
        return Promise.reject(err)
    }
)



