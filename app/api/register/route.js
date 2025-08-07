import { createUser, hashPassword, isUserExists } from "@/app/services/auth.services.js"

export const POST = async (req) => {
    try {
        const data = await req.json()

        const { shopName, ownerName, email, password, phone, address, city, state, zipcode, latitude, longitude } = data

        const user = await isUserExists(email)
        if (user) {
            return new Response(JSON.stringify({ message: 'Email already registered!' }), { status: 400 })
        }

        const hashedPassword = await hashPassword(password)

        const [newUser] = await createUser({ shopName, ownerName, email, hashedPassword, phone, address, city, state, zipcode, latitude, longitude })
        console.log(newUser)

        return new Response(JSON.stringify({ message: 'Success' }), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
    }
}

