import { Request, Response } from 'express'
import Product, { IProduct } from '../models/product.model.js'
import Shop from '../models/shop.model.js'
import { deleteProductById, getProductById } from '../services/product.services.js'
import { PipelineStage } from 'mongoose'

interface SearchTypes {
  query?: string
  category?: string
  radius?: number
  lat?: string
  lng?: string
}

const escapeRegex = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, description, price } = req.body

    const newProduct = new Product({
      shopId: req.userId,
      name,
      category,
      description,
      price
    })

    await newProduct.save()

    res.status(201).json({ success: true, product: newProduct })
  } catch (err) {
    // console.error('Add product error:', err)
    res.status(500).json({ success: false, message: 'Failed to add product' })
  }
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ shopId: req.userId }).limit(20)

    if (!products)
      return res.status(404).json({ success: false, message: 'Products not found.' })

    res.status(200).json({ success: true, products });

  } catch (err) {
    // console.error('Error fetching products:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};


export const deactivateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'Product ID is required' });

    const product = await Product.findByIdAndUpdate(
      id,
      { isAvailable: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deactivated', product });
  } catch (err) {
    // console.error('Error deactivating product:', err);
    res.status(500).json({ message: 'Failed to deactivate product' });
  }
};


export const reactivateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'Product ID is required' });

    const product = await Product.findByIdAndUpdate(
      id,
      { isAvailable: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product reactivated', product });
  } catch (err) {
    // console.error('Error reactivating product:', err);
    res.status(500).json({ message: 'Failed to reactivate product' });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, description, price } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, category, description, price },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ success: true, product });
  } catch (err) {
    // console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id)
      return res.status(400).json({ success: false, message: 'Product id missing.' })

    const product = await getProductById(id)
    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found.' })

    const deletedProduct = await deleteProductById(id)

    if (!deletedProduct)
      return res.status(500).json({ success: false, message: 'Something went wrong.' })

    return res.status(200).json({ success: true, message: 'Product deleted successfully.', deletedProduct })

  } catch (err) {
    // console.log('Error deleting product:', err)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}


//Search Products based on location
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query, category, radius = 10000, lat, lng } = req.query as unknown as SearchTypes;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters.'
      })
    }

    const latitude = Number(lat)
    const longitude = Number(lng)

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coordinates.'
      })
    }

    const coordinates: [number, number] = [longitude, latitude]

    //limit radius
    const MAX_RADIUS = 50000
    const safeRadius = Math.min(Number(radius) || 10000, MAX_RADIUS)

    const safeQuery = escapeRegex(query)

    const productMatch: Record<string, any> = {
      $expr: { $eq: ['$shopId', '$$shopId'] },
      name: { $regex: safeQuery, $options: 'i' },
      isAvailable: true
    }
    if (category && category !== 'All Categories')
      productMatch.category = category

    //Aggregation Pipeline
    const pipeline: PipelineStage[] = [
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates
          },
          distanceField: 'distance',
          maxDistance: safeRadius,
          spherical: true
        }
      },
      {
        $lookup: {
          from: 'products',
          let: { shopId: '$_id' },
          pipeline: [
            { $match: productMatch },
            {
              $project: {
                shopId: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0
              }
            }
          ],
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $addFields: {
          distanceKm: {
            $round: [{ $divide: ['$distance', 1000] }, 2]
          }
        }
      },
      {
        $project: {
          password: 0,
          distance: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0
        }
      },
      { $sort: { distanceKm: 1, 'product.price': 1 } },
      { $limit: 20 }
    ]

    const products = await Shop.aggregate(pipeline)

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    // console.error('Error in searchProducts:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
