import { getProducts } from "@/app/services/products.services.js"

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url)
        const shopId = Number(searchParams.get('shopId'))
        if (!shopId) return Response.json({ message: 'Shop ID missing' }, { status: 400 })

        const products = await getProducts(shopId)
        return Response.json(products, { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
    }
}

