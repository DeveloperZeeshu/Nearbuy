import axios from 'axios'
import { handleAxiosError } from '../utils/handleAxiosError'

interface LogoutResponse {
    success: boolean
    message?: string
}

export const logoutUser = async (
    accessToken: string
): Promise<LogoutResponse | null> => {
    const confirmRes = confirm('Are you sure, you want to logout?')
    if (!confirmRes)
        return null

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true
        })
        if (res.data.success)
            return res.data

        return null
    } catch (err: unknown) {
        handleAxiosError(err)

        return null
    }
}

