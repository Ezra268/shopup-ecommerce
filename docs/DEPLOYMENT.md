# Deployment Guide

## Deployment Platforms

### Frontend (Vercel - Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
- Visit https://vercel.com/new
- Select your repository
- Configure environment variables
- Deploy

3. **Environment Variables on Vercel**
```
NEXT_PUBLIC_API_URL=https://api.shopup.ke
NEXT_PUBLIC_STRIPE_KEY=pk_live_your_key
NEXT_PUBLIC_APP_URL=https://shopup.ke
```

### Admin (Vercel)

Same as Frontend, but deploy from the `admin/` directory

### Backend (AWS EC2)

1. **Launch EC2 Instance**
```bash
# Ubuntu 22.04 LTS recommended
# Instance type: t3.medium or larger
# Security groups: Allow 80, 443, 5000
```

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install -y nodejs npm postgresql postgresql-contrib redis-server nginx
```

3. **Clone Repository**
```bash
git clone https://github.com/Ezra268/shopup-ecommerce.git
cd shopup-ecommerce/backend
```

4. **Setup Environment**
```bash
cp .env.example .env
# Edit .env with production values
npm install
npm run build
```

5. **Setup PM2 (Process Manager)**
```bash
sudo npm install -g pm2
pm2 start src/index.js --name "shopup-api"
pm2 startup
pm2 save
```

6. **Setup Nginx (Reverse Proxy)**
```bash
sudo nano /etc/nginx/sites-available/shopup-api
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name api.shopup.ke;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/shopup-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Setup SSL (Let's Encrypt)**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.shopup.ke
```

### Database (AWS RDS)

1. **Create RDS Instance**
- Engine: PostgreSQL 14
- Multi-AZ: Yes (for production)
- Storage: 100 GB
- Backup retention: 30 days

2. **Update Environment Variable**
```
DATABASE_URL=postgresql://user:password@your-rds-endpoint:5432/shopup
```

3. **Run Migrations**
```bash
psql $DATABASE_URL < database/init.sql
```

### Redis (AWS ElastiCache)

1. **Create ElastiCache Cluster**
- Engine: Redis 7
- Node type: cache.t3.micro

2. **Update Environment Variable**
```
REDIS_URL=redis://your-elasticache-endpoint:6379
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install && npm test
      - run: cd frontend && npm install && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel (Frontend)
        run: npm run deploy:frontend
      - name: Deploy to AWS (Backend)
        run: npm run deploy:backend
```

## Monitoring & Logging

### CloudWatch
```bash
# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
```

### Sentry (Error Tracking)
```bash
npm install @sentry/node
```

In `backend/src/index.js`:
```javascript
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(Sentry.Handlers.errorHandler());
```

## Performance Optimization

1. **Enable Gzip Compression**
```bash
sudo nano /etc/nginx/nginx.conf
# Add: gzip on;
```

2. **Setup CDN (CloudFront)**
- Create CloudFront distribution
- Point to S3 for static assets
- Cache images and CSS

3. **Database Optimization**
- Enable query caching
- Setup connection pooling
- Regular VACUUM and ANALYZE

## Backup Strategy

1. **Database Backups**
```bash
# Automated RDS backups (enabled by default)
# Manual backup
aws rds create-db-snapshot --db-instance-identifier shopup --db-snapshot-identifier shopup-backup-$(date +%Y%m%d)
```

2. **S3 Backups**
```bash
aws s3 sync /var/backups s3://shopup-backups/
```

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set strong passwords
- [ ] Enable database backups
- [ ] Configure security groups
- [ ] Enable AWS WAF
- [ ] Setup CloudTrail logging
- [ ] Regular security updates
- [ ] Setup DDoS protection
- [ ] Enable database encryption
- [ ] Setup API rate limiting
