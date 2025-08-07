import { getNearbyShops } from "@/app/services/search.services.js"

export const POST = async (req) => {
    try {
        const { query, radius, category, latitude, longitude } = await req.json()
        const shops = await getNearbyShops(latitude, longitude, radius, query, category)

        if (!shops || shops.length === 0) return Response.json({ message: 'No shop found in your radius' }, { status: 400 })

        return Response.json(shops, { status: 200 })

    } catch (err) {
        console.log(err)
        return Response.json({ message: 'Server error' }, { status: 500 })
    }
}

