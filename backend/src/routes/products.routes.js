const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

// Mock products data
const products = [
  {
    id: 1,
    name: 'Samsung Galaxy A06 6.7-inch HD+ Display',
    price: 12599,
    originalPrice: 21130,
    category: 'Phones & Tablets',
    brand: 'Samsung',
    rating: 4.5,
    reviews: 234,
    image: '📱',
    description: 'Latest Samsung phone with amazing features',
    stock: 50
  },
  {
    id: 2,
    name: 'Samsung Galaxy S25, 256GB',
    price: 104999,
    originalPrice: 119999,
    category: 'Phones & Tablets',
    brand: 'Samsung',
    rating: 4.8,
    reviews: 456,
    image: '📱',
    description: 'Premium Samsung flagship phone',
    stock: 20
  },
  {
    id: 3,
    name: 'Vitron 43-inch Smart Android TV',
    price: 29999,
    originalPrice: 34999,
    category: 'TVs & Audio',
    brand: 'Vitron',
    rating: 4.3,
    reviews: 189,
    image: '📺',
    description: 'Smart TV with Android operating system',
    stock: 15
  }
];

// Get all products
router.get('/', (req, res) => {
  const { category, brand, search, page = 1, limit = 20 } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (brand) {
    filtered = filtered.filter(p => p.brand === brand);
  }

  if (search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIdx = (page - 1) * limit;
  const paginatedProducts = filtered.slice(startIdx, startIdx + limit);

  res.json({
    data: paginatedProducts,
    total: filtered.length,
    page: parseInt(page),
    limit: parseInt(limit)
  });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

// Create product (Admin only)
router.post('/', authenticate, authorize(['admin']), (req, res) => {
  const { name, price, originalPrice, category, brand, description, stock, image } = req.body;

  const newProduct = {
    id: Math.max(...products.map(p => p.id), 0) + 1,
    name,
    price,
    originalPrice,
    category,
    brand,
    description,
    stock,
    image,
    rating: 0,
    reviews: 0
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product (Admin only)
router.put('/:id', authenticate, authorize(['admin']), (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  Object.assign(product, req.body);
  res.json(product);
});

// Delete product (Admin only)
router.delete('/:id', authenticate, authorize(['admin']), (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (idx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(idx, 1);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
