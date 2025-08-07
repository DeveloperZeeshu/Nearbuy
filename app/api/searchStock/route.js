import { searchStock } from "@/app/services/products.services.js"

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url)
        const shopId = Number(searchParams.get('shopId'))
        const query = searchParams.get('query')

        const product = await searchStock({ shopId, query })
        if (!product) return new Response.json({ message: 'Item not found' }, { status: 400 })

        return Response.json(product, { status: 200 })

    } catch (err) {
        console.log(err)
        return Response.json({ message: 'Server error' }, { status: 500 })
    }
}

