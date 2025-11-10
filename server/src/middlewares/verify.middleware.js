import { verifyJWTToken } from "../services/auth.services.js";

const verifyAccessToken = async (req, res, next) => {
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
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};

export default verifyAccessToken

