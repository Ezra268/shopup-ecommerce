# Database Schema

## Tables

### users
- `id` (PRIMARY KEY)
- `email` (UNIQUE)
- `password`
- `name`
- `phone`
- `address`
- `city`
- `country`
- `role` (customer, admin, seller)
- `is_active`
- `created_at`
- `updated_at`

### categories
- `id` (PRIMARY KEY)
- `name`
- `description`
- `icon`
- `created_at`

### products
- `id` (PRIMARY KEY)
- `name`
- `description`
- `price`
- `original_price`
- `category_id` (FOREIGN KEY)
- `brand`
- `stock`
- `image_url`
- `rating`
- `review_count`
- `is_active`
- `created_at`
- `updated_at`

### orders
- `id` (PRIMARY KEY)
- `order_number` (UNIQUE)
- `user_id` (FOREIGN KEY)
- `total_amount`
- `shipping_cost`
- `tax_amount`
- `status` (Pending, Processing, Shipped, Delivered, Cancelled)
- `payment_method`
- `shipping_address`
- `tracking_number`
- `created_at`
- `updated_at`

### order_items
- `id` (PRIMARY KEY)
- `order_id` (FOREIGN KEY)
- `product_id` (FOREIGN KEY)
- `quantity`
- `unit_price`
- `total_price`
- `created_at`

### cart_items
- `id` (PRIMARY KEY)
- `user_id` (FOREIGN KEY)
- `product_id` (FOREIGN KEY)
- `quantity`
- `added_at`

### payments
- `id` (PRIMARY KEY)
- `order_id` (FOREIGN KEY)
- `amount`
- `payment_method` (stripe, mpesa, paypal)
- `transaction_id` (UNIQUE)
- `status` (Pending, Completed, Failed)
- `created_at`
- `updated_at`

### reviews
- `id` (PRIMARY KEY)
- `product_id` (FOREIGN KEY)
- `user_id` (FOREIGN KEY)
- `rating` (1-5)
- `comment`
- `created_at`
- `updated_at`

### wishlists
- `id` (PRIMARY KEY)
- `user_id` (FOREIGN KEY)
- `product_id` (FOREIGN KEY)
- `added_at`

## Indexes

- `idx_users_email` - Fast email lookups
- `idx_products_category` - Filter products by category
- `idx_orders_user` - Get user orders
- `idx_order_items_order` - Get order details
- `idx_payments_order` - Get order payments
- `idx_reviews_product` - Get product reviews
- `idx_reviews_user` - Get user reviews
- `idx_cart_user` - Get user cart
- `idx_wishlists_user` - Get user wishlist
