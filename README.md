# 🏠 Texas RealEstate Pro

> A comprehensive subscription-based platform for analyzing and investing in Texas single-family and 1-4 unit properties

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-purple)](https://stripe.com/)

## 🎯 Overview

Texas RealEstate Pro is a full-featured investment platform designed to help both beginner and experienced investors analyze, compare, and purchase rental properties across Texas. Unlike general real estate platforms like Zillow or Redfin, we provide **deep financial analysis** and **Texas-specific insights** that matter to investors.

### Key Differentiators

✅ **Texas-Focused**: Property tax calculations, county-specific rates, windstorm insurance, flood zones  
✅ **Deal Analysis**: Complete financial modeling with CAP rates, cash-on-cash returns, DSCR  
✅ **Vetted Listings**: "Deal Coach Approved" properties screened for investment quality  
✅ **Service Ecosystem**: Integrated mortgage lenders, property managers, contractors, and title companies  
✅ **Education Platform**: Guided learning paths for first-time investors  
✅ **Portfolio Tracking**: Multi-property management and performance analytics

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier works)
- Stripe account (test mode initially)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/dvenkatarao/TexasRePro.git
cd TexasRePro

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your credentials
# (See Environment Variables section below)

# Run database migrations
# Go to Supabase Dashboard → SQL Editor
# Run the schema from supabase/migrations/001_initial_schema.sql

# Seed the database with sample properties
# Run the seed data script from supabase/migrations/002_seed_data.sql

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

Create a `.env.local` file with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Mapbox (for maps)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-token
```

---

## 📁 Project Structure

```
TexasRePro/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # API routes
│   │   │   ├── properties/    # Property CRUD
│   │   │   ├── deal-analysis/ # Deal analysis endpoints
│   │   │   ├── favorites/     # User favorites
│   │   │   └── stripe/        # Stripe integration
│   │   ├── listings/          # Property listings page
│   │   ├── analysis/          # Deal analysis calculator
│   │   ├── dashboard/         # User dashboard
│   │   ├── upgrade/           # Subscription plans
│   │   └── auth/              # Authentication pages
│   ├── components/
│   │   ├── properties/        # Property components
│   │   ├── analysis/          # Analysis components
│   │   ├── dashboard/         # Dashboard widgets
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── supabase/          # Supabase clients
│   │   ├── stripe/            # Stripe utilities
│   │   └── utils.ts           # Helper functions
│   └── contexts/              # React contexts
├── supabase/
│   └── migrations/            # Database migrations
├── public/                    # Static assets
└── package.json
```

---

## 🎨 Features

### 1. Property Listings & Search
- **Advanced Filtering**: City, county, price range, property type, bedrooms
- **Deal Coach Approved**: Curated properties with high investment potential
- **Real-time Data**: Direct integration with database
- **Map View**: Visual property search (coming soon)

### 2. Deal Analysis Calculator
- **Texas-Specific Calculations**:
  - County property tax rates
  - Windstorm insurance estimates
  - Closing costs (2% Texas average)
- **Investment Metrics**:
  - CAP Rate
  - Cash-on-Cash Return
  - DSCR (Debt Service Coverage Ratio)
  - Break-even occupancy
- **Strategy Types**:
  - Buy & Hold
  - BRRRR (Buy, Rehab, Rent, Refinance, Repeat)
  - House Flipping
  - Live-In Investment

### 3. Subscription Tiers

| Feature | Free | Basic ($49/mo) | Professional ($79/mo) | Enterprise ($149/mo) |
|---------|------|----------------|----------------------|---------------------|
| Property Listings | ✅ | ✅ | ✅ | ✅ |
| Basic Analysis | ✅ | ✅ | ✅ | ✅ |
| Saved Searches | 3 | 5 | Unlimited | Unlimited |
| Deal Coach Approved | ❌ | ✅ | ✅ | ✅ |
| Advanced Calculators | ❌ | ❌ | ✅ | ✅ |
| Service Providers | ❌ | ✅ | ✅ | ✅ |
| Portfolio Tracking | ❌ | ❌ | ✅ | ✅ |
| Team Access | ❌ | ❌ | ❌ | ✅ (3 users) |
| Priority Support | ❌ | ❌ | ✅ | ✅ |

### 4. Service Provider Marketplace
- **Mortgage Lenders**: DSCR and portfolio loans
- **Property Managers**: Vetted local managers with performance metrics
- **Insurance Providers**: Texas-specific landlord policies
- **Title Companies**: Investor-friendly closing services
- **Contractors**: Trusted renovation specialists

### 5. Education Platform
- **Beginner Path**: Texas real estate basics, financing, analysis
- **Intermediate**: Tax strategies, portfolio management, BRRRR method
- **Advanced**: 1031 exchanges, syndications, market timing
- **Progress Tracking**: Badges, completion certificates, confidence scores

---

## 🗄️ Database Schema

### Core Tables

**profiles**: User accounts and subscription data  
**properties**: Property listings with Texas-specific fields  
**deal_analyses**: User-created financial analyses  
**favorites**: Saved properties  
**service_providers**: Vetted service providers  
**education_modules**: Learning content  
**activity_log**: User activity tracking  

See full schema in `supabase/migrations/001_initial_schema.sql`

---

## 🔐 Authentication

Uses Supabase Auth with:
- Email/Password authentication
- Magic link sign-in
- OAuth providers (Google - configured)
- Row Level Security (RLS) for data protection

---

## 💳 Stripe Integration

### Setup Checklist

1. **Create Products in Stripe Dashboard**:
   - Basic Plan: $49/month
   - Professional Plan: $79/month
   - Enterprise Plan: $149/month

2. **Configure Webhook**:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`

3. **Test Mode**:
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Project Settings → Environment Variables
```

### Post-Deployment

1. Update Supabase auth URLs
2. Configure Stripe webhook with production URL
3. Update NEXT_PUBLIC_SITE_URL to production domain
4. Test all features in production

---

## 📊 Key Components

### Property Card Component
```typescript
import PropertyCard from '@/components/properties/PropertyCard';

<PropertyCard 
  property={property}
  onFavorite={handleFavorite}
  isFavorited={isFavorited}
/>
```

### Deal Analysis Calculator
```typescript
import DealAnalysisCalculator from '@/components/analysis/DealAnalysisCalculator';

<DealAnalysisCalculator propertyId={propertyId} />
```

### Subscription Gate
```typescript
import { useAuth } from '@/contexts/auth-context';

const { profile } = useAuth();
const hasAccess = ['professional', 'enterprise'].includes(profile?.subscription_tier);
```

---

## 🧪 Testing

```bash
# Run tests (setup required)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

---

## 📈 Analytics & Monitoring

Track these key metrics:
- User sign-ups and conversions
- Properties viewed
- Analyses created
- Subscription upgrades
- Feature adoption rates
- User retention

Recommended tools:
- Vercel Analytics (built-in)
- PostHog (product analytics)
- Sentry (error tracking)

---

## 🛣️ Roadmap

### Phase 1 (Current) ✅
- Core property listings
- Deal analysis calculator
- User authentication
- Subscription system

### Phase 2 (Q2 2025)
- Map-based search
- Advanced filters
- Saved searches with alerts
- Mobile app (React Native)

### Phase 3 (Q3 2025)
- AI Deal Coach
- Portfolio performance tracking
- MLS integration
- Service provider booking

### Phase 4 (Q4 2025)
- Market trend predictions
- Neighborhood analysis
- Investment community forums
- Referral program

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🆘 Support

- **Documentation**: See `/docs` folder
- **Issues**: Create a GitHub issue
- **Email**: support@texasrealstatepro.com (configure)

---

## 🏆 Credits

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Database & Auth
- [Stripe](https://stripe.com/) - Payments
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icons

---

## 📸 Screenshots

### Property Listings
![Listings](docs/screenshots/listings.png)

### Deal Analysis
![Analysis](docs/screenshots/analysis.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

---

**Made with ❤️ in Texas**