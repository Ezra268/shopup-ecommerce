const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const reviews = [];

// Get reviews for product
router.get('/product/:productId', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === parseInt(req.params.productId));
  res.json(productReviews);
});

// Create review
router.post('/', authenticate, (req, res) => {
  const { productId, rating, comment } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const review = {
    id: reviews.length + 1,
    productId,
    userId: req.user.userId,
    rating,
    comment,
    createdAt: new Date()
  };

  reviews.push(review);
  res.status(201).json(review);
});

// Delete review
router.delete('/:id', authenticate, (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  
  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }

  if (review.userId !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  reviews.splice(reviews.indexOf(review), 1);
  res.json({ message: 'Review deleted' });
});

module.exports = router;
