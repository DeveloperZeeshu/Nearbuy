import axios from "axios"

export const fetchPosts = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts', { withCredentials: true })
        if (res.data.success) {
            return res.data.posts
        }
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
        } else
            console.log(err.message)
    }
    return null
}

export const fetchPostBySlug = async (slug) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/${slug}`, { withCredentials: true })
        if (res.data.success) {
            return res.data.post
        }
    } catch (err) {
        console.log(err)
    }
    return null
}

export const deletePostBySlug = async (slug) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/${slug}`, { withCredentials: true })
        if (res.data.success) {
            return res.data.deletedPost
        }
    } catch (err) {
        console.log(err)
    }
    return null
}

