import { addProduct } from "@/app/services/products.services.js"

export const POST = async (req) => {
    try {
        const body = await req.json()
        const { shopId, name, category, description, price, image } = body

        const [product] = await addProduct({ name, description, price: parseFloat(price), category, image, shopId })
        console.log(product)

        return new Response(JSON.stringify({ message: 'Success' }), { status: 200 })

    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({ message: 'Error adding product' }), { status: 500 })
    }
}
