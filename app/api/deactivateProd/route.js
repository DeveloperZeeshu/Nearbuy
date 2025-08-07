import { deactivateProd } from "@/app/services/products.services.js"

export const POST = async (req) => {
    try {
        const {id} = await req.json()
        if(!id) return Response.json({message: 'Invalid ID'},{status: 400})
        await deactivateProd(id)
        return Response.json({ success: true }, { status: 200 })
    } catch (err) {
        console.log(err)
        return Response.json({ message: 'Server error' }, { status: 500 })
    }
}
