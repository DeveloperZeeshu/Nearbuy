import mongoose, { Document, Schema } from 'mongoose';

interface ShopLocation {
  type: 'Point'
  coordinated: [number, number]
}

export interface IShop extends Document {
  shopName: string
  ownerName: string
  email: string
  password: string
  phone: string
  address: string
  city: string
  state: string
  zipcode: string
  location: ShopLocation
  imageUrl: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const shopSchema = new Schema<IShop>(
  {
    shopName: { 
      type: String, 
      required: true, 
      trim: true 
    },
    ownerName: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true, 
      trim: true 
    },
    address: { 
      type: String, 
      required: true, 
      trim: true 
    },
    city: { 
      type: String, 
      required: true, 
      trim: true 
    },
    state: { 
      type: String, 
      required: true, 
      trim: true 
    },
    zipcode: { 
      type: String, 
      required: true, 
      trim: true 
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], 
        required: true
      }
    },

    imageUrl: { 
      type: String, 
      default: '' 
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    }
  },
  {
    timestamps: true
  }
);

shopSchema.index({ location: '2dsphere' });

export const Shop = mongoose.model<IShop>('Shop', shopSchema);
export default Shop

