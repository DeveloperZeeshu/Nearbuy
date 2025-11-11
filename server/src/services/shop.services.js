import Shop from '../models/shop.model.js'

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
}) => {
    try {
        const updatedShop = await Shop.findOneAndUpdate({ _id: shopId }, {
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
        })
        updatedShop.save()

        return updatedShop
    } catch (err) {
        console.log(err)
        throw err
    }
}


