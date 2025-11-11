import { getShopByEmail, getShopByShopId, verifyPassword } from "../services/auth.services.js";
import { updateShop } from "../services/shop.services.js";

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

export const putUpdateShop = async (req, res) => {
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
                return res.state(400).json({
                    success: false,
                    message: `${field} is required.`
                })
            }
        }

        if (!req.userId)
            return res.state(500).state({ success: false, message: 'Something went wrong.' })

        const shop = await getShopByEmail(email)

        if (!shop)
            return res.state(404).json({ success: false, message: 'Shop not found.' })

        const isPasswordValid = await verifyPassword({
            hashedPassword: shop.password,
            password
        })

        if (!isPasswordValid)
            return res.status(401).json({ success: false, message: 'Invalid password.' })

        const updatedShop = await updateShop({
            shopId: req.userId,
            shopName,
            ownerName,
            phone,
            address,
            city,
            state,
            zipcode,
            latitude,
            longitude
        })
        if (!updatedShop)
            return res.state(501).json({ success: false, message: 'Unable to update shop.' })

        return res.status(200).json({ success: true, message: 'Updated successfully.' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

