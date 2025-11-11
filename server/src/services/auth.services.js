import Shop from '../models/shop.model.js'
import Session from '../models/session.model.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import conf from '../conf/conf.js'
import { ACCESS_TOKEN_EXPIRY, MILLISECOND_PER_SECOND, REFRESH_TOKEN_EXPIRY, SECONDS_PER_MINUTE } from '../config/constants.js'
import crypto from 'crypto'

export const getShopByEmail = async (email) => {
    try {
        return await Shop.findOne({ email })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const hashPassword = async (password) => {
    try {
        return await argon2.hash(password)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getSessionBySessionId = async (_id) => {
    try {
        return await Session.findOne({ _id })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const findSessionByToken = async ({ refreshToken }) => {
    try {
        const now = new Date()
        return await Session.findOne({
            refreshToken,
            valid: true,
            expiresAt: { $gt: now }
        })
    } catch (err) {
        console.log('Error finding session:', err)
        throw err
    }
}

export const getShopByShopId = async (_id) => {
    try {
        return await Shop.findById(_id).select('-password')
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const verifyPassword = async ({ hashedPassword, password }) => {
    try {
        return await argon2.verify(hashedPassword, password)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const createShop = async ({
    shopName,
    ownerName,
    email,
    password,
    phone,
    address,
    city,
    state,
    zipcode,
    latitude,
    longitude
}) => {
    try {
        const newShop = new Shop({
            shopName,
            ownerName,
            email,
            password,
            phone,
            address,
            city,
            state,
            zipcode,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
        })
        await newShop.save()
        return newShop
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const createAccessToken = async ({ sub, name, email }) => {
    try {
        return jwt.sign({
            sub,
            name,
            email
        }, conf.jwtSecret, {
            expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECOND_PER_SECOND
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const createRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex')
}

export const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

export const createSession = async ({ shopId, userAgent, ip, refreshToken, expiresAt }) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex')

        const session = new Session({
            shopId,
            userAgent,
            ip,
            refreshToken: hashedToken,
            expiresAt
        })
        session.save()
        return session
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const deleteSession = async (_id) => {
    try {
        const deletedSession = await Session.findOneAndDelete({ _id })
        deletedSession.save()

        return deletedSession
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const verifyJWTToken = async (token) => {
    try {
        return jwt.verify(token, conf.jwtSecret)
    } catch (err) {
        console.log(err)
        throw err
    }
}

