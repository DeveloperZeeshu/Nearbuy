import { getShopByShopId } from "../services/auth.services.js";

export const getShopMePage = async (req, res) => {
    try {
        const shop = await getShopByShopId(req.userId);
        if (!shop)
            return res.status(404).json({ success: false, message: 'Shop not found' });

        res.status(200).json({ success: true, shop });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

