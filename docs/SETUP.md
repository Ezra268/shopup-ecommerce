# Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose (optional)
- Git

## Installation

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/Ezra268/shopup-ecommerce.git
cd shopup-ecommerce
```

2. **Start all services**
```bash
docker-compose up -d
```

3. **Access the applications**
- Frontend: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:5000

### Option 2: Manual Setup

1. **Clone the repository**
```bash
git clone https://github.com/Ezra268/shopup-ecommerce.git
cd shopup-ecommerce
```

2. **Setup PostgreSQL**
```bash
# Create database
createdb shopup

# Run migrations
psql shopup < database/init.sql
```

3. **Setup Redis**
```bash
# Using Docker
docker run -d -p 6379:6379 redis:7-alpine

# Or install locally and run
redis-server
```

4. **Setup Backend**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
npm install
npm run dev
```

5. **Setup Frontend**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

6. **Setup Admin Dashboard**
```bash
cd admin
cp .env.example .env
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://shopup:shopup_password_123@localhost:5432/shopup

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key

# M-Pesa
MPESA_API_KEY=your_mpesa_key
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret

# Email
SENDGRID_API_KEY=your_sendgrid_key

# CORS
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Admin (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Common Issues

### PostgreSQL Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists: `psql -l | grep shopup`

### Redis Connection Error
- Ensure Redis is running: `redis-cli ping`
- Check REDIS_URL in .env

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend
lsof -i :3001  # Admin

# Kill process
kill -9 <PID>
```

## Database Migrations

```bash
# Run migrations
cd backend
npm run migrate

# Undo migrations
npm run migrate:undo

# Seed database
npm run seed
```

## Production Setup

See [DEPLOYMENT.md](./DEPLOYMENT.md)
