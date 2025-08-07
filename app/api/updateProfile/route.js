import { comparePassword, findByID, updateProfile } from "@/app/services/auth.services"

export const POST = async (req) => {
    try {
        const formData = await req.json()

        const user = await findByID(formData.id)
        if (!user) return Response.json({ message: 'Invalid ID' }, { status: 400 })

        const isPassValid = await comparePassword(formData.password, user.password)
        if (!isPassValid) return Response.json({ message: 'Invaild Password' }, { status: 400 })

        const updatedProfile = await updateProfile(formData)
        if (!updatedProfile) return Response.json({ message: 'Invalid ID' }, { status: 400 })

        return Response.json({ message: true }, { status: 200 })
    } catch (err) {
        console.error(err)
        return Response.json({ message: 'Server error' }, { status: 500 })
    }
}

