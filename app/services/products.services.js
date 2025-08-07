import { and, eq, like } from "drizzle-orm"
import { db } from "../config/db_client.js"
import { products } from "../db/schema.js"

export const addProduct = async ({ name, description, price, category, image, shopId }) => {
    return await db.insert(products).values({ name, description, price, category, image, shopId })
}

export const getProducts = async (shopId) => {
    return await db.select().from(products).where(eq(products.shopId, shopId)).limit(4)
}

export const deactivateProd = async (id) => {
    return await db.update(products).set({ isAvailable: false }).where(eq(products.id, id))
}

export const restockProd = async (id) => {
    return await db.update(products).set({ isAvailable: true }).where(eq(products.id, id))
}

export const deleteProd = async (id) => {
    return await db.delete(products).where(eq(products.id, id))
}

export const updateProd = async ({ id, name, category, price, image, description }) => {
    return await db.update(products).set({ name, price, category, description, image }).where(eq(products.id, id))
}

export const searchStock = async ({ query, shopId }) => {
    return await db.select().from(products).where(and(like(products.name, `%${query}%`), eq(products.shopId, shopId)))
}
