import { Request, Response } from "express";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js"
import { createAccessToken, createRefreshToken, createSession, createShop, deleteSession, findSessionByToken, getShopByEmail, getShopByShopId, hashPassword, hashToken, verifyJWTToken, verifyPassword } from "../services/auth.services.js"
import Session from "../models/session.model.js";
import { baseConfig } from "../conf/cookieBaseConfig.js";

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

        return res.status(200).json({ success: true, message: 'User registered successfully.' })

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

        if (!isPasswordValid) return res.status(401).json({ success: false, message: 'Invalid Password.' })

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
            return res.status(500).json({ success: false, message: 'Unable to create session.' })

        const accessToken = await createAccessToken({
            sub: shop._id as string,
            name: shop.ownerName,
            email: shop.email
        })

        if (!accessToken)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        res.cookie('refresh_token', refreshToken, {
            ...baseConfig,
            maxAge: REFRESH_TOKEN_EXPIRY,
        })

        res.cookie('access_token', accessToken, {
            ...baseConfig,
            maxAge: ACCESS_TOKEN_EXPIRY
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

export const getRefreshPage = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token

        if (!refreshToken)
            return res.status(401).json({ success: false, message: 'Unauthorized.' })

        const hashedToken = hashToken(refreshToken)
        const session = await findSessionByToken(hashedToken)

        if (!session) {
            // res.clearCookie('refresh_token', baseConfig)
            // res.clearCookie('access_token', baseConfig)

            return res.status(401).json({ success: false, message: 'Unauthorized.' })
        }

        const shop = await getShopByShopId(session.shopId.toString())

        if (!shop) {
            await Session.deleteOne({ _id: session._id })
            return res.status(401).json({ success: false, message: 'Unauthorized.' })
        }

        //refreshing Refresh Token
        const newRefreshToken = createRefreshToken()
        const newHashedToken = hashToken(newRefreshToken)

        const updatedSession = await Session.findOneAndUpdate(
            { _id: session._id },
            {
                refreshToken: newHashedToken
            },
            { new: true }
        )
        if (!updatedSession)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        res.clearCookie('refresh_token', baseConfig)
        res.clearCookie('access_token', baseConfig)

        res.cookie('refresh_token', newRefreshToken, {
            ...baseConfig,
            maxAge: session.expiresAt.getTime() - Date.now(),
        })

        // refreshing Access Token
        const newAccessToken = await createAccessToken({
            sub: shop._id as string,
            name: shop.ownerName,
            email: shop.email,
        })

        if (!newAccessToken)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        res.cookie('access_token', newAccessToken, {
            ...baseConfig,
            maxAge: ACCESS_TOKEN_EXPIRY
        })

        return res.status(200).json({
            success: true
        })

    } catch (err) {
        // console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

export const logoutUserPage = async (req: Request, res: Response) => {
    try {
        if (!req.userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const refreshToken = req.cookies.refresh_token

        const hashedToken = hashToken(refreshToken)

        const session = await findSessionByToken(hashedToken)

        if (!session)
            return res.status(404).json({ success: false, message: 'Invalid session.' })

        const deletedSession = await deleteSession(session._id as string)
        if (!deletedSession)
            return res.status(501).json({ success: false, message: 'Something went wrong.' })

        res.clearCookie('refresh_token', baseConfig)
        res.clearCookie('access_token', baseConfig)

        return res.status(200).json({ success: true, message: 'User logout successfully.' })
    } catch (err) {
        // console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token
        const accessToken = req.cookies.access_token

        if (!refreshToken)
            return res.status(401).json({ success: false, message: 'Unauthorized.' })

        if (accessToken) {
            const decodedAccessToken = await verifyJWTToken(accessToken)
            if (decodedAccessToken) {
                const shopInfo = await getShopByShopId(decodedAccessToken.sub)
                if (!shopInfo)
                    return res.status(500).json({ success: false, message: 'Something went wrong.' })

                return res
                    .status(200)
                    .json({
                        success: true,
                        message: 'Authorized.',
                        shopInfo
                    })
            }
        }

        return res.status(401).json({ success: false, message: 'Unauthorized.' })
    } catch (err) {
        // console.log('Server Error:',err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

