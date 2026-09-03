const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

let orders = [];

// Create order
router.post('/', authenticate, (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  const order = {
    id: Math.max(...orders.map(o => o.id || 0), 0) + 1,
    userId: req.user.userId,
    items,
    shippingAddress,
    paymentMethod,
    status: 'Pending',
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    createdAt: new Date()
  };

  orders.push(order);
  res.status(201).json(order);
});

// Get user orders
router.get('/', authenticate, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.userId);
  res.json(userOrders);
});

// Get order by ID
router.get('/:id', authenticate, (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (order.userId !== req.user.userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  res.json(order);
});

// Update order status (Admin only)
router.put('/:id/status', authenticate, authorize(['admin']), (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = req.body.status;
  res.json(order);
});

// Get all orders (Admin only)
router.get('/admin/all', authenticate, authorize(['admin']), (req, res) => {
  res.json(orders);
});

module.exports = router;
