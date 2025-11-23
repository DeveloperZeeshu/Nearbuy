import mongoose, {Document, Schema} from "mongoose"

export interface IProduct extends Document {
    shopId: mongoose.Types.ObjectId
    name: string
    category: 'Groceries' | 'Electronics' | 'Clothing' | 'All Categories'
    description: string
    price: number
    imageUrl: string
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
}

const productSchema = new Schema<IProduct>(
    {
        shopId: {
            type: Schema.Types.ObjectId,
            ref: 'Shop',
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            enum: ['Groceries', 'Electronics', 'Clothing', 'All Categories'],
            default: 'All Categories',
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative'],
        },

        imageUrl: {
            type: String,
            default: '',
            trim: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product
