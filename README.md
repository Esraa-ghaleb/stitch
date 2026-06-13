# Stitch — Luxury Beauty Salon (Full Stack)

Stitch is a full-stack luxury beauty salon web application with a **Next.js** frontend and **Express + MongoDB** backend.

## Project Structure

```
stitch/
├── backend/          # Express API (auth, bookings, services, cart, contact)
├── stitch-main/      # Next.js 16 frontend
└── README.md
```

## Prerequisites

- **Node.js** 18+
- **MongoDB** running locally or a MongoDB Atlas connection string

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set MONGODB_URI and JWT_SECRET

npm install
npm run seed    # Seed services, editorial posts, and reviews
npm run dev     # Starts API on http://localhost:5000
```

### 2. Frontend

```bash
cd stitch-main
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000

npm install
npm run dev     # Starts app on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | API port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry (default: 7d) |
| `CLIENT_URL` | Frontend URL for CORS (default: http://localhost:3000) |

### Frontend (`stitch-main/.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL (default: http://localhost:5000) |

## API Endpoints

### Auth
- `POST /api/auth/register` — Register (name, email, password)
- `POST /api/auth/login` — Login (sets httpOnly JWT cookie)
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Current user (protected)

### Services
- `GET /api/services` — List services (`?category=&sort=`)
- `GET /api/services/category/:category` — Services by category
- `GET /api/services/:id` — Service details + reviews

### Bookings
- `POST /api/bookings` — Create booking
- `GET /api/bookings/:id` — Get booking
- `PATCH /api/bookings/:id` — Update booking (discount, quantity, customer info)
- `POST /api/bookings/:id/confirm` — Confirm after deposit
- `GET /api/bookings/me` — User bookings (protected)

### Other
- `POST /api/contact` — Submit contact form
- `GET /api/cart` — Get cart (protected)
- `POST /api/cart` — Add to cart (protected)
- `GET /api/editorial` — Editorial posts

## Features

- Bilingual UI (English / Arabic) with RTL support
- JWT authentication via secure httpOnly cookies
- Full booking flow persisted to MongoDB
- Contact form submissions saved to database
- Shopping cart for logged-in users
- Services, treatments, and editorial content from database

## Discount Codes (Booking Summary)

- `STITCH10` — $10 off deposit
- `WELCOME15` — $15 off deposit

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| backend | `npm run dev` | Start API with hot reload |
| backend | `npm run seed` | Seed database |
| stitch-main | `npm run dev` | Start Next.js dev server |
| stitch-main | `npm run build` | Production build |

## License

Private project — © Stitch Luxury Salon
