const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process payment with Stripe
router.post('/stripe', authenticate, async (req, res) => {
  const { amount, token, currency = 'KES' } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      source: token,
      description: `ShopUp Order - User ${req.user.userId}`
    });

    res.json({
      success: true,
      transactionId: charge.id,
      amount: amount,
      currency: currency
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Process M-Pesa payment
router.post('/mpesa', authenticate, async (req, res) => {
  const { amount, phone, orderId } = req.body;

  // Mock M-Pesa implementation
  try {
    const transaction = {
      transactionId: 'MPE' + Date.now(),
      amount,
      phone,
      orderId,
      status: 'Pending',
      timestamp: new Date()
    };

    res.json({
      success: true,
      transaction,
      message: 'M-Pesa prompt sent to ' + phone
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Verify payment
router.get('/verify/:transactionId', authenticate, async (req, res) => {
  const { transactionId } = req.params;

  // Mock verification
  res.json({
    transactionId,
    status: 'Completed',
    amount: 5000,
    timestamp: new Date()
  });
});

module.exports = router;
