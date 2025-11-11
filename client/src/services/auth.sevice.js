import axios from 'axios'

export const logoutUser = async (accessToken) => {
    const confirmRes = confirm('Are you sure, you want to logout?')
    if (!confirmRes)
        return

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true
        })
        if (res.data.success) {
            return res.data
        } else {
            return null
        }
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
        } else if (err.request) {
            console.log(err.request)
        } else
            console.log(err.message)

        return null
    }
}

