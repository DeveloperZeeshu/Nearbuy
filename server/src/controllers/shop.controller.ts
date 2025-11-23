import { Request, Response } from "express";
import { getShopByEmail, getShopByShopId, verifyPassword } from "../services/auth.services.js";
import { updateShop, UpdateShopInput } from "../services/shop.services.js";

export const getShopMePage = async (req: Request, res: Response) => {
    try {
        const shop = await getShopByShopId(req.userId);
        if (!shop)
            return res.status(404).json({ success: false, message: 'Shop not found' });

        res.status(200).json({ success: true, shop });
    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const putUpdateShop = async (req: Request, res: Response) => {
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
        }: UpdateShopInput = req.body

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required.`
                })
            }
        }

        if (!req.userId)
            return res.status(500).json({ success: false, message: 'Something went wrong.' })

        const shop = await getShopByEmail(email)

        if (!shop)
            return res.status(404).json({ success: false, message: 'Shop not found.' })

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
            return res.status(501).json({ success: false, message: 'Unable to update shop.' })

        return res.status(200).json({ success: true, message: 'Updated successfully.' })

    } catch (err) {
        // console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}


