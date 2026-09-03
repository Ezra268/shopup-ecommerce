const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

// Get user profile
router.get('/profile', authenticate, (req, res) => {
  // In real app, fetch from DB
  res.json({
    id: req.user.userId,
    email: 'user@example.com',
    name: 'John Doe',
    phone: '+254712345678',
    role: req.user.role
  });
});

// Update user profile
router.put('/profile', authenticate, (req, res) => {
  const { name, phone, address } = req.body;
  
  res.json({
    id: req.user.userId,
    name: name || 'John Doe',
    phone: phone || '+254712345678',
    address: address || 'Nairobi, Kenya',
    message: 'Profile updated successfully'
  });
});

// Get user orders
router.get('/orders', authenticate, (req, res) => {
  res.json({
    orders: [
      {
        id: 1,
        date: '2024-01-15',
        total: 15000,
        status: 'Delivered',
        items: 2
      }
    ]
  });
});

// Get all users (Admin only)
router.get('/', authenticate, authorize(['admin']), (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer' }
    ]
  });
});

module.exports = router;
