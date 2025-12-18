import { Request, Response } from "express";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js"
import { createAccessToken, createRefreshToken, createSession, createShop, deleteSession, findSessionByToken, getShopByEmail, getShopByShopId, hashPassword, hashToken, verifyJWTToken, verifyPassword } from "../services/auth.services.js"
import { baseConfig } from "../conf/cookieBaseConfig.js";
import Session from "../models/session.model.js";

export const postRegisterPage = async (req: Request, res: Response) => {
    const requiredFields = [
        'shopName',
        'ownerName',
        'email',
        'password',
        'phone',
        'address',
        'city',
        'state',
        'zipcode',
        'latitude',
        'longitude'
    ];
    try {
        const {
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
        } = req.body

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required`
                });
            }
        }

        const existingUser = await getShopByEmail(email)

        if (existingUser) return res.status(409).json({ success: false, message: 'User already exists.' })

        const hashedPassword = await hashPassword(password)

        if (!hashedPassword)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        const newShop = await createShop({
            shopName,
            ownerName,
            email,
            password: hashedPassword,
            phone,
            address,
            city,
            state,
            zipcode,
            latitude,
            longitude
        })

        if (!newShop)
            return res.status(500).json({ success: false, message: 'Registration unsuccessful.' })

        return res.status(201).json({ success: true, message: 'User registered successfully.' })

    } catch (err) {
        // console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

export const postLoginPage = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password)
            return res.status(400).json({ success: false, message: 'Email and password required.' })

        const shop = await getShopByEmail(email)

        if (!shop) return res.status(404).json({ success: false, message: 'User doesn\'t exists.' })

        const isPasswordValid = await verifyPassword({ hashedPassword: shop.password, password })

        if (!isPasswordValid) return res.status(401).json({ success: false, message: 'Unauthorized.' })

        const refreshToken = createRefreshToken()
        if (!refreshToken)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        const session = await createSession({
            shopId: shop._id as string,
            userAgent: req.headers['user-agent'] ?? 'unknown',
            ip: req.clientIp ?? 'unknown',
            refreshToken,
            expiresAt: Date.now() + REFRESH_TOKEN_EXPIRY
        })

        if (!session)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        const accessToken = await createAccessToken({
            sub: shop._id as string,
        })

        if (!accessToken)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        res.cookie('refresh_token', refreshToken, {
            ...baseConfig,
            maxAge: REFRESH_TOKEN_EXPIRY,
            path: '/api/refresh'
        })

        res.cookie('access_token', accessToken, {
            ...baseConfig,
            maxAge: ACCESS_TOKEN_EXPIRY,
            path: '/'
        })

        const shopInfo = await getShopByShopId(shop._id as string)
        if (!shopInfo)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully.',
            shopInfo
        })
    } catch (err) {
        // console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

export const postRefreshPage = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token

        if (!refreshToken)
            return res.status(401).json({ success: false, message: 'Unauthorized.' })

        const hashedOld = hashToken(refreshToken)

        //rotating refresh token
        const newRefreshToken = createRefreshToken()
        const hashedNew = hashToken(newRefreshToken)

        const session = await Session.findOneAndUpdate(
            {
                refreshToken: hashedOld,
                expiresAt: { $gt: new Date() }
            },
            { refreshToken: hashedNew },
            { new: true }
        )

        if (!session)
            return res.status(401).json({
                success: false,
                message: 'Unauthorized.'
            })

        const newAccessToken = await createAccessToken({
            sub: session.shopId.toString(),
        })

        res.cookie('refresh_token', newRefreshToken, {
            ...baseConfig,
            maxAge: Math.max(0, new Date(session.expiresAt).getTime() - Date.now()),
            path: '/api/refresh'
        })

        res.cookie('access_token', newAccessToken, {
            ...baseConfig,
            maxAge: ACCESS_TOKEN_EXPIRY,
            path: '/'
        })

        return res.status(200).json({
            success: true
        })

    } catch (err) {
        // console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }
}

export const logoutUserPage = async (req: Request, res: Response) => {
    try {
        if (!req.userId)
            return res.status(401).json({ success: false, message: 'Unauthorized.' });

        const refreshToken = req.cookies.refresh_token

        const hashedToken = hashToken(refreshToken)

        const session = await findSessionByToken(hashedToken)

        if (!session)
            return res.status(401).json({ success: false, message: 'Unauthorized.' })

        const deletedSession = await deleteSession(session._id as string)
        if (!deletedSession)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        res.clearCookie('refresh_token', {
            ...baseConfig,
            path: '/api/refresh'
        })
        res.clearCookie('access_token', {
            ...baseConfig,
            path: '/'
        })

        return res.status(200).json({ success: true, message: 'User logout successfully.' })
    } catch (err) {
        // console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {
        const accessToken = req.cookies.access_token

        if (!accessToken) {
            return res.status(401).json({ success: false })
        }

        const decoded = await verifyJWTToken(accessToken)
        if (!decoded) {
            return res.status(401).json({ success: false })
        }

        const shopInfo = await getShopByShopId(decoded.sub)
        if (!shopInfo) {
            return res.status(500).json({ success: false })
        }

        return res
            .status(200)
            .json({
                success: true,
                shopInfo
            })

    } catch (err) {
        // console.log('Server Error:',err)
        return res.status(500).json({ success: false })
    }
}

