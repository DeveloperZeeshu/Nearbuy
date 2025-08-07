import { verifyJWTToken } from "@/app/services/auth.services"
import { cookies } from "next/headers"

export const GET = async () => {
    try {
        const token = (await cookies()).get('user_access')?.value

        if (!token)
            return Response.json({ message: 'Not logged in' }, { status: 401 })

        const user = await verifyJWTToken(token)

        if (!user)
            return Response.json({ message: 'Invalid credentials' }, { status: 401 })

        return Response.json(user, { status: 200 })

    } catch (err) {
        console.log(err)
        return Response.json({ message: 'User not found' }, { status: 500 })
    }
}
