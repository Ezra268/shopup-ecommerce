const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const carts = {};

// Get cart
router.get('/', authenticate, (req, res) => {
  const userId = req.user.userId;
  const cart = carts[userId] || { items: [], total: 0 };
  res.json(cart);
});

// Add to cart
router.post('/add', authenticate, (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity, price } = req.body;

  if (!carts[userId]) {
    carts[userId] = { items: [], total: 0 };
  }

  const item = carts[userId].items.find(i => i.productId === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    carts[userId].items.push({ productId, quantity, price });
  }

  carts[userId].total = carts[userId].items.reduce(
    (sum, i) => sum + (i.price * i.quantity),
    0
  );

  res.json(carts[userId]);
});

// Remove from cart
router.post('/remove', authenticate, (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.body;

  if (carts[userId]) {
    carts[userId].items = carts[userId].items.filter(i => i.productId !== productId);
    carts[userId].total = carts[userId].items.reduce(
      (sum, i) => sum + (i.price * i.quantity),
      0
    );
  }

  res.json(carts[userId] || { items: [], total: 0 });
});

// Clear cart
router.post('/clear', authenticate, (req, res) => {
  const userId = req.user.userId;
  carts[userId] = { items: [], total: 0 };
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
