import { comparePassword, generateToken, isUserExists } from "@/app/services/auth.services.js"
import { cookies } from "next/headers"

export const POST = async (req) => {
    try {
        const data = await req.json()
        const { email, password } = data

        const user = await isUserExists(email)
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not exist' }), { status: 400 })
        }

        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid)
            return new Response(JSON.stringify({ message: 'Incorrect Password' }), { status: 400 })

        const token = await generateToken({
            id: user.id,
            shopName: user.shopName,
            ownerName: user.ownerName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode
        })

        const cookieStore = await cookies()

        cookieStore.set('user_access', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        return new Response(JSON.stringify({ message: 'Success' }), { status: 201 })
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({ message: 'Login failed!' }), { status: 500 })
    }
}


