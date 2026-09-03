const express = require('express');
const router = express.Router();

const categories = [
  { id: 1, name: 'Phones & Tablets', icon: '📱' },
  { id: 2, name: 'TVs & Audio', icon: '📺' },
  { id: 3, name: 'Appliances', icon: '🧺' },
  { id: 4, name: 'Health & Beauty', icon: '🧴' },
  { id: 5, name: 'Home & Office', icon: '🏠' },
  { id: 6, name: 'Fashion', icon: '👕' },
  { id: 7, name: 'Computing', icon: '💻' },
  { id: 8, name: 'Gaming', icon: '🎮' },
  { id: 9, name: 'Supermarket', icon: '🛒' },
  { id: 10, name: 'Baby Products', icon: '👶' }
];

router.get('/', (req, res) => {
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(category);
});

module.exports = router;
