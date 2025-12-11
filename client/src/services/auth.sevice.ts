import { handleAxiosError } from '../api/utils/handleAxiosError'
import apiClient from '../api/apiClient'

interface LogoutResponse {
    success: boolean
    message?: string
}

export const logoutUser = async (): Promise<LogoutResponse | null> => {
    const confirmRes = confirm('Are you sure, you want to logout?')
    if (!confirmRes)
        return null

    try {
        const res = await apiClient.post('/logout')
        if (res.data.success)
            return res.data

        return null
    } catch (err: unknown) {
        handleAxiosError(err)

        return null
    }
}

