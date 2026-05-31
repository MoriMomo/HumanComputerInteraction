# SatSet Card Holder Website

Premium card holder product showcase with 3D visualization, built with Next.js, React Three Fiber, and GSAP animations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (or SQLite for local dev)

### Development Setup

**One-command setup:**
```bash
npm run setup:dev
```

Or step-by-step:

```bash
# 1. Install dependencies
npm install

# 2. Set up database
npm run prisma:push

# 3. Seed demo users
npm run seed

# 4. Start dev server
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/satset"
# For SQLite (local dev): DATABASE_URL="file:./prisma/dev.db"

# Auth (REQUIRED FOR PRODUCTION)
AUTH_SESSION_SECRET="your-random-secret-32-bytes-hex"

# Node environment
NODE_ENV="development"
```

Never commit `.env.local` — add it to `.gitignore`.

---

## 📊 Database

### View and Manage Data

```
# Open Prisma Studio (visual DB browser)
npm run prisma:studio
```

### API routes

POST /api/auth/signup — Create a new user

POST /api/auth/login — Login user

POST /api/auth/logout — Logout (clear session)

GET /api/auth/me — Get current user

---

## 📈 Build & Deploy

```bash
npm run build
npm start
```

### Vercel Deployment (Recommended)

```
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 🔍 Code Quality

```bash
# Check for issues
npm run lint
npm run typecheck

# Auto-fix lint issues
npm run lint:fix
```

---

## 🧪 Testing

Unit tests: `npm test`
E2E tests: `npm run test:e2e`

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Run tests: `npm run test:ci && npm run e2e`
3. Commit and open a PR

---

Last updated: 2026-06-01
