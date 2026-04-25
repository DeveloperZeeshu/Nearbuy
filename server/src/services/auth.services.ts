import Shop, { IShop } from '../models/shop.model.js'
import Session, { ISession } from '../models/session.model.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import conf from '../conf/conf.js'
import { ACCESS_TOKEN_EXPIRY, MILLISECOND_PER_SECOND } from '../config/constants.js'
import crypto from 'crypto'

export interface CreateShopInput {
    shopName: string
    ownerName: string
    email?: string
    password?: string
    phone: string
    address: string
    city: string
    state: string
    zipcode: string
    latitude: number
    longitude: number
}

export interface CreateSessionInput {
    shopId: string
    userAgent: string
    ip: string
    refreshToken: string
    expiresAt: Date | number
}

interface PasswordType {
    password?: string
    hashedPassword?: string
}

interface AccessTokenType {
    sub: string
    sid: string
}

export interface AccessTokenPayload {
    sub: string
    sid: string
    name: string
    email: string
    iat: number
    exp: number
}

export const getShopByEmail = async (
    email?: string
): Promise<IShop | null> => {
    try {
        return await Shop.findOne({ email })
    } catch (err) {
        // console.log(err)
        throw err
    }
}

export const hashPassword = async (
    password: string
): Promise<string | null> => {
    try {
        return await argon2.hash(password)
    } catch (err) {
        // console.log(err)
        throw err
    }
}

export const getSessionBySessionId = async (
    _id: string
): Promise<ISession | null> => {
    try {
        return await Session.findOne({ _id })
    } catch (err) {
        // console.log(err)
        throw err
    }
}

export const findSessionByToken = async (
    refreshToken?: string
): Promise<ISession | null> => {
    try {
        const now = new Date()
        return await Session.findOne({
            refreshToken,
            valid: true,
            expiresAt: { $gt: now }
        })
    } catch (err) {
        // console.log('Error finding session:', err)
        throw err
    }
}

export const getShopByShopId = async (
    _id?: string
): Promise<IShop | null> => {
    try {
        return await Shop.findById(_id).select('-password')
    } catch (err) {
        // console.log(err)
        throw err
    }
}

export const verifyPassword = async ({
    hashedPassword, password
}: PasswordType): Promise<boolean | null> => {
    try {
        if (hashedPassword && password)
            return await argon2.verify(hashedPassword, password)
        else
            return null
    } catch (err) {
        // console.log(err)
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
}: CreateShopInput): Promise<IShop> => {
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
        // console.log(err)
        throw err
    }
}

export const createAccessToken = async ({
    sub,
    sid
}: AccessTokenType): Promise<string | null> => {
    try {
        return jwt.sign({
            sub,
            sid
        }, conf.jwtSecret, {
            expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECOND_PER_SECOND
        })
    } catch (err) {
        // console.log(err)
        throw err
    }
}

export const createRefreshToken = (): string => {
    return crypto.randomBytes(64).toString('hex')
}

export const hashToken = (
    token: string
): string => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

export const createSession = async ({
    shopId,
    userAgent,
    ip,
    refreshToken,
    expiresAt
}: CreateSessionInput): Promise<ISession> => {
    try {
        const hashedToken = crypto
            .createHash('sha256')
            .update(refreshToken)
            .digest('hex')

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
        // console.log(err)
        throw err
    }
}

export const deleteSession = async (
    _id: string
): Promise<ISession | null> => {
    try {
        return await Session.findOneAndDelete({ _id })
    } catch (err) {
        // console.log(err)
        throw err
    }
}

export const verifyJWTToken = async (
    token: string
) => {
    try {
        return jwt.verify(token, conf.jwtSecret) as AccessTokenPayload
    } catch (err) {
        // console.log(err)
        throw err
    }
}

