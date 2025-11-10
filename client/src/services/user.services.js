import axios from 'axios'

export const fetchUser = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/me', { withCredentials: true })
        if (res.data.success) {
            return res.data.userInfo
        }
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
        } else
            console.log(err)
    }
    return null
}

export const logoutUser = async () => {
    try {
        const res = await axios.post(`http://localhost:5000/api/logout`, {}, { withCredentials: true })
        if (res.data?.success) {
            return res.data
        }
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
        } else
            console.log(err)
    }
    return null
}

