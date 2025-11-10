import Product from '../models/product.model.js'
import Shop from '../models/shop.model.js'

export const addProduct = async (req, res) => {
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
    console.error('Add product error:', err)
    res.status(500).json({ success: false, message: 'Failed to add product' })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()

    if (!products)
      return res.status(404).json({ success: false, message: 'Products not found.' })

    res.status(200).json({ success: true, products });

  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};


export const deactivateProduct = async (req, res) => {
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
    console.error('Error deactivating product:', err);
    res.status(500).json({ message: 'Failed to deactivate product' });
  }
};


export const reactivateProduct = async (req, res) => {
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
    console.error('Error reactivating product:', err);
    res.status(500).json({ message: 'Failed to reactivate product' });
  }
};


export const updateProduct = async (req, res) => {
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
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};


export const searchProducts = async (req, res) => {
  try {
    const { query, category, radius = 10000, lat, lng } = req.query;

    if (!lat || !lng)
      return res.status(400).json({ success: false, message: 'Location required' });

    const nearbyShops = await Shop.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius),
        },
      },
    }).select('_id');

    const shopIds = nearbyShops.map((shop) => shop._id);

    if (shopIds.length === 0) {
      return res.status(200).json({ success: true, products: [] });
    }

    const filters = {
      shopId: { $in: shopIds },
      isAvailable: true,
      ...(query && { name: { $regex: query, $options: 'i' } }),
      ...(category && category !== 'All Categories' && { category }),
    };

    const products = await Product.find(filters)
      .populate('shopId', 'shopName address phone location');

    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error('Error in searchProducts:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
