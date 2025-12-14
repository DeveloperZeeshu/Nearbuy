import apiClient from "./apiClient";

let refreshPromise: Promise<void> | null = null

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    // If no config or not an auth error - bail
    if (!originalRequest || err.response?.status !== 401) {
      return Promise.reject(err)
    }

    // Never retry refresh itself
    if (originalRequest.url?.includes('/refresh')) {
      return Promise.reject(err)
    }

    // Prevent infinite loops
    if (originalRequest._retry) {
      return Promise.reject(err)
    }

    originalRequest._retry = true

    try {
      // Single refresh at a time
      if (!refreshPromise) {
        refreshPromise = apiClient
          .get('/refresh')
          .then(() => {})
          .finally(() => {
            refreshPromise = null
          })
      }

      await refreshPromise
      return apiClient(originalRequest)
    } catch (refreshErr) {
      refreshPromise = null
      return Promise.reject(refreshErr)
    }
  }
)




