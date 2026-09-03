# ShopUp Kenya - Quick Start Guide

## 🚀 Start the Platform

### Using Docker Compose (Easiest)
```bash
cd shopup-ecommerce
docker-compose up -d
```

Then access:
- 🛒 **Customer App**: http://localhost:3000
- 👨‍💼 **Admin Dashboard**: http://localhost:3001
- 🔧 **API**: http://localhost:5000

### Manual Start

**Terminal 1 - Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

**Terminal 3 - Admin**
```bash
cd admin
cp .env.example .env
npm install
npm run dev
```

## 📚 Key Files

### Backend
- `backend/src/index.js` - Main server file
- `backend/src/routes/` - API endpoints
- `backend/src/middleware/auth.js` - Authentication
- `backend/.env.example` - Environment template

### Frontend
- `frontend/app/page.jsx` - Home page
- `frontend/components/` - React components
- `frontend/store/` - Redux store
- `frontend/lib/api.js` - API client

### Admin
- `admin/app/page.jsx` - Dashboard
- `admin/app/products/page.jsx` - Product management
- `admin/app/orders/page.jsx` - Order management

## 🔐 Test Credentials

### Admin Account
- Email: `admin@shopup.ke`
- Password: `Admin@123`

### Test Customer
- Email: `customer@shopup.ke`
- Password: `Customer@123`

## 📝 Environment Setup

### Get API Keys

1. **Stripe**
   - Go to https://dashboard.stripe.com
   - Copy Secret Key and Public Key
   - Add to `.env` files

2. **M-Pesa**
   - Register at Daraja Portal
   - Get API credentials
   - Add to backend `.env`

3. **SendGrid**
   - Create account at sendgrid.com
   - Generate API key
   - Add to backend `.env`

## 🧪 Test the API

Using cURL or Postman:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'

# Get Products
curl http://localhost:5000/api/products

# Get Orders (with token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/orders
```

## 🛠️ Common Tasks

### Reset Database
```bash
# Drop and recreate
psql shopup < database/init.sql
```

### Clear Cache
```bash
redis-cli FLUSHALL
```

### Check Logs
```bash
# Backend logs
cd backend && npm run dev

# Frontend logs
cd frontend && npm run dev
```

### View Database
```bash
psql shopup
\dt           # List tables
\d products   # Describe table
SELECT * FROM products LIMIT 5;
```

## 📦 Project Structure

```
shopup-ecommerce/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Auth, validation
│   │   ├── config/      # Database, Redis
│   │   └── index.js     # Server entry
│   ├── package.json
│   └── .env.example
├── frontend/            # Next.js customer app
│   ├── app/             # Pages
│   ├── components/      # React components
│   ├── store/           # Redux store
│   ├── lib/             # Utilities
│   └── package.json
├── admin/               # Next.js admin dashboard
│   ├── app/             # Admin pages
│   ├── components/      # Admin components
│   ├── store/           # Redux store
│   └── package.json
├── database/            # Database setup
│   └── init.sql         # Schema
├── docs/                # Documentation
├── docker-compose.yml
└── README.md
```

## 🔗 Useful Links

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Guide](./docs/SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing](./CONTRIBUTING.md)

## 💡 Next Steps

1. ✅ Start the application
2. ✅ Test login/registration
3. ✅ Browse products
4. ✅ Add items to cart
5. ✅ Create an order
6. ✅ Check admin dashboard
7. ✅ Update order status

## 🚨 Troubleshooting

**Port already in use?**
```bash
lsof -i :5000  # Find process
kill -9 <PID>  # Kill it
```

**Database connection error?**
```bash
psql -U shopup -d shopup -h localhost
# Check if DB exists and is running
```

**Redis not connecting?**
```bash
redis-cli ping
# Should return PONG
```

## 📧 Support

Have questions? 
- Check the docs in `/docs`
- Open an issue on GitHub
- Email: dev@shopup.ke

---

**Happy coding! 🎉**
