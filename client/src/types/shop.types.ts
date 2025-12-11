
export interface UserProfile {
    ownerName: string
    email: string
}

interface ShopLocation {
    type: 'Point'
    coordinates: [number, number]
}

export interface ShopInfo {
    _id: string
    shopName: string
    ownerName: string
    email: string
    password: string
    phone: string
    address: string
    city: string
    state: string
    zipcode?: string
    location?: ShopLocation
    imageUrl?: string
    isVerified?: boolean
}

