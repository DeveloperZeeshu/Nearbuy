import Shop, { IShop } from '../models/shop.model.js'
import { CreateShopInput } from './auth.services.js'

export interface UpdateShopInput extends CreateShopInput {
    shopId?: string
}

export const updateShop = async ({
    shopId,
    shopName,
    ownerName,
    phone,
    address,
    city,
    state,
    zipcode,
    latitude,
    longitude
}: UpdateShopInput): Promise<IShop | null> => {
    try {
        return await Shop.findOneAndUpdate(
            { _id: shopId },
            {
                $set: {
                    shopName,
                    ownerName,
                    phone,
                    address,
                    city,
                    state,
                    zipcode,
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                }
            },
            { new: true }
        )
    } catch (err) {
        // console.log(err)
        throw err
    }
}


