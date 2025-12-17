import type { NextFunction, Request, Response } from "express";
import { verifyJWTToken } from "../services/auth.services.js";

const verifyAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.access_token
        if (!token)
            return res.status(401).json({ success: false, message: 'Unauthorized.' })

        const decoded = await verifyJWTToken(token)
        if (!decoded)
            return res.status(401).json({ success: false, message: 'Unauthorized.' })

        req.userId = decoded.sub;
        next();
    } catch (err: any) {
        console.error('Token verification error:', err);

        if (err.name === 'TokenExpiredError')
            return res.status(401).json({ success: false, message: 'Unauthorized.' });

        if (err.name === 'JsonWebTokenError')
            return res.status(403).json({ success: false, message: 'Unauthorized.' });

        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

export default verifyAccessToken

