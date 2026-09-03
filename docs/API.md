# ShopUp Kenya - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Auth

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Verify Token
```
GET /auth/verify
Authorization: Bearer <token>

Response:
{
  "valid": true,
  "user": {
    "userId": 1,
    "role": "customer"
  }
}
```

### Products

#### Get All Products
```
GET /products?category=Phones&brand=Samsung&search=Galaxy&page=1&limit=20

Response:
{
  "data": [
    {
      "id": 1,
      "name": "Samsung Galaxy A06",
      "price": 12599,
      "originalPrice": 21130,
      "category": "Phones & Tablets",
      "brand": "Samsung",
      "rating": 4.5,
      "reviews": 234,
      "stock": 50
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
```

#### Get Product by ID
```
GET /products/:id

Response:
{
  "id": 1,
  "name": "Samsung Galaxy A06",
  "price": 12599,
  "originalPrice": 21130,
  "category": "Phones & Tablets",
  "brand": "Samsung",
  "rating": 4.5,
  "reviews": 234,
  "stock": 50,
  "description": "Latest Samsung phone with amazing features"
}
```

#### Create Product (Admin)
```
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Product",
  "price": 5000,
  "originalPrice": 7000,
  "category": "Electronics",
  "brand": "Samsung",
  "description": "Product description",
  "stock": 100
}

Response:
{
  "id": 2,
  "name": "New Product",
  "price": 5000,
  "originalPrice": 7000,
  "category": "Electronics",
  "brand": "Samsung",
  "stock": 100
}
```

#### Update Product (Admin)
```
PUT /products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 4500,
  "stock": 80
}

Response:
{
  "id": 2,
  "name": "New Product",
  "price": 4500,
  "stock": 80
}
```

#### Delete Product (Admin)
```
DELETE /products/:id
Authorization: Bearer <admin_token>

Response:
{
  "message": "Product deleted"
}
```

### Cart

#### Get Cart
```
GET /cart
Authorization: Bearer <token>

Response:
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 12599
    }
  ],
  "total": 25198
}
```

#### Add to Cart
```
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 1,
  "price": 12599
}

Response:
{
  "items": [...],
  "total": 25198
}
```

#### Remove from Cart
```
POST /cart/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1
}

Response:
{
  "items": [...],
  "total": 12599
}
```

#### Clear Cart
```
POST /cart/clear
Authorization: Bearer <token>

Response:
{
  "message": "Cart cleared"
}
```

### Orders

#### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 12599
    }
  ],
  "shippingAddress": "123 Main St, Nairobi",
  "paymentMethod": "stripe"
}

Response:
{
  "id": 1,
  "userId": 1,
  "items": [...],
  "status": "Pending",
  "total": 25198,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get User Orders
```
GET /orders
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "userId": 1,
    "status": "Delivered",
    "total": 25198,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Order by ID
```
GET /orders/:id
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "userId": 1,
  "items": [...],
  "status": "Delivered",
  "total": 25198,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Update Order Status (Admin)
```
PUT /orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "Shipped"
}

Response:
{
  "id": 1,
  "status": "Shipped"
}
```

### Payments

#### Process Stripe Payment
```
POST /payments/stripe
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 25198,
  "token": "tok_visa",
  "currency": "KES"
}

Response:
{
  "success": true,
  "transactionId": "ch_1234567890",
  "amount": 25198,
  "currency": "KES"
}
```

#### Process M-Pesa Payment
```
POST /payments/mpesa
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 25198,
  "phone": "+254712345678",
  "orderId": 1
}

Response:
{
  "success": true,
  "transaction": {
    "transactionId": "MPE1234567890",
    "amount": 25198,
    "phone": "+254712345678",
    "status": "Pending"
  },
  "message": "M-Pesa prompt sent to +254712345678"
}
```

### Reviews

#### Get Product Reviews
```
GET /reviews/product/:productId

Response:
[
  {
    "id": 1,
    "productId": 1,
    "userId": 1,
    "rating": 5,
    "comment": "Great product!",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Create Review
```
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1,
  "rating": 5,
  "comment": "Great product!"
}

Response:
{
  "id": 1,
  "productId": 1,
  "userId": 1,
  "rating": 5,
  "comment": "Great product!",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Delete Review
```
DELETE /reviews/:id
Authorization: Bearer <token>

Response:
{
  "message": "Review deleted"
}
```

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error message"
}
```

Common HTTP status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Returns `429 Too Many Requests` when exceeded
