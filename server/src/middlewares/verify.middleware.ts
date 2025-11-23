import type { NextFunction, Request, Response } from "express";
import { verifyJWTToken } from "../services/auth.services.js";

const verifyAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer '))
            return res.status(401).json({ success: false, message: 'Unauthorized' });

        const token = authHeader.split(' ')[1];

        const decoded = await verifyJWTToken(token)
        if (!decoded)
            return res.status(403).json({ success: false, message: 'Invalid token.' })

        req.userId = decoded.sub;
        next();
    } catch (err: any) {
        console.error('Token verification error:', err);

        if (err.name === 'TokenExpiredError')
            return res.status(401).json({ success: false, message: 'Token expired.' });

        if (err.name === 'JsonWebTokenError')
            return res.status(403).json({ success: false, message: 'Invalid token.' });

        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

export default verifyAccessToken

