import { updateProd } from "@/app/services/products.services"

export const POST = async (req) => {
    try {
        const data = await req.json()
        const updatedProd = await updateProd(data)
        if (!updatedProd) return Response.json({ message: 'Invalid ID' }, { status: 400 })
            
        return Response.json({ message: true }, { status: 200 })
    } catch (err) {
        console.error(err)
        return Response.json({ message: 'Server error' }, { status: 500 })
    }
}

