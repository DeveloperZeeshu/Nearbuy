import { eq } from "drizzle-orm"
import { db } from "../config/db_client.js"
import { shops } from "../db/schema.js"
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export const isUserExists = async (email) => {
    const [user] = await db.select().from(shops).where(eq(shops.email, email))
    return user
}

export const findByID = async (id) => {
    const [user] = await db.select().from(shops).where(eq(shops.id, id))
    return user
}

export const hashPassword = async (password) => {
    return await argon2.hash(password)
}

export const createUser = async ({ shopName, ownerName, email, hashedPassword, phone, address, city, state, zipcode, latitude, longitude }) => {
    return await db.insert(shops).values({ shopName, ownerName, email, password: hashedPassword, phone, address, city, state, zipCode: zipcode, latitude, longitude })
}

export const comparePassword = async (password, hashedPassword) => {
    return await argon2.verify(hashedPassword, password)
}

export const generateToken = async ({ id, shopName, ownerName, email, phone, address, city, state, zipCode }) => {
    return jwt.sign({ id, shopName, ownerName, email, phone, address, city, state, zipCode }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export const verifyJWTToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export const updateProfile = async ({ shopName, ownerName, email, phone, address, city, state, zipcode, id, imageUrl }) => {
    return await db.update(shops).set({ shopName, ownerName, email, phone, address, city, state, zipcode, imageUrl }).where(eq(shops.id, id))
}

