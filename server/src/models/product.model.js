import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model('Product', productSchema);
