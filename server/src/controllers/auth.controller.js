import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js"
import { createAccessToken, createRefreshToken, createSession, createShop, deleteSession, findSessionByToken, getShopByEmail, getShopByShopId, hashPassword, hashToken, verifyPassword } from "../services/auth.services.js"

export const postRegisterPage = async (req, res) => {
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
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

export const postLoginPage = async (req, res) => {
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
            return error('Something went wrong.', 500)

        const session = await createSession({
            shopId: shop._id,
            userAgent: req.headers['user-agent'],
            ip: req.clientIp,
            refreshToken,
            expiresAt: Date.now() + REFRESH_TOKEN_EXPIRY
        })

        if (!session)
            return res.status(500).json({ success: false, message: 'Unable to create session.' })

        const accessToken = await createAccessToken({
            sub: shop._id,
            name: shop.ownerName,
            email: shop.email
        })

        if (!accessToken)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        const baseConfig = { httpOnly: true, secure: false, sameSite: 'lax' }

        res.cookie('refresh_token', refreshToken, {
            ...baseConfig,
            maxAge: REFRESH_TOKEN_EXPIRY
        })

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully.',
            accessToken,
            sub: shop._id,
            name: shop.ownerName,
            email: shop.email
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

export const getRefreshPage = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token

        if (!refreshToken)
            return res.status(404).json({ success: false, message: 'Token not found.' })

        const hashedToken = hashToken(refreshToken)
        const session = await findSessionByToken({ refreshToken: hashedToken })

        if (!session)
            return res.status(400).json({ success: false, message: 'Invalid session.' })

        const shop = await getShopByShopId(session.shopId)

        if (!shop)
            return res.status(404).json({ success: false, message: 'User not found.' })

        const accessToken = await createAccessToken({
            sub: shop._id,
            ownerName: shop.ownerName,
            email: shop.email,
        })

        if (!accessToken)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        return res.status(200).json({ success: true, accessToken, sub: shop._id, ownerName: shop.ownerName, email: shop.email })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

export const logoutUserPage = async (req, res) => {
    try {
        if (!req.userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const refreshToken = req.cookies.refresh_token

        const hashedToken = hashToken(refreshToken)

        const session = await findSessionByToken({ refreshToken: hashedToken })

        if (!session)
            return res.status(404).json({ success: false, message: 'Invalid session.' })

        const deletedSession = await deleteSession(session._id)
        if (!deletedSession)
            return res.state(501).json({ success: false, message: 'Something went wrong.' })

        const baseConfig = { httpOnly: true, secure: false, sameSite: 'lax' }
        res.clearCookie('refresh_token', baseConfig);

        return res.status(200).json({ success: true, message: 'User logout successfully.' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}



