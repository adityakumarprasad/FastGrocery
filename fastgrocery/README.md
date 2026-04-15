# FastGroc

FastGroc is a full-stack grocery delivery platform built with `Next.js`, `MongoDB`, `NextAuth`, `Stripe`, and `Socket.IO`.

The project supports three roles inside one app:

- `user`: browse groceries, add to cart, checkout, track orders
- `admin`: add/manage groceries, monitor and update orders
- `delivery_boy`: accept assignments, update live location, verify delivery with OTP

This repo also includes a separate realtime `socketServer` used for live location updates, delivery chat, and order notifications.

## Features

- Role-based dashboard after login
- Email/password login plus Google login
- Grocery listing, search, cart, and checkout flow
- Cash on Delivery and Stripe online payment support
- Live order tracking with map/location updates
- Admin grocery and order management
- Delivery partner assignment flow
- OTP-based delivery verification
- Realtime chat between customer and delivery partner
- AI-powered quick reply suggestions for chat

## Project Structure

```text
fastgroc/
|-- fastgrocery/   # main app
`-- socketServer/  # realtime server
```

## Tech Stack

### Frontend

- Next.js App Router
- React
- Tailwind CSS
- Redux Toolkit
- Framer Motion
- Leaflet / React Leaflet

### Backend

- Next.js API routes
- MongoDB + Mongoose
- NextAuth
- Socket.IO
- Nodemailer
- Stripe

## Main Modules

### User Side

- Login / register
- Search groceries by name or category
- Add to cart
- Checkout with map-based address selection
- COD or Stripe payment
- Order history
- Live order tracking

### Admin Side

- Add grocery items
- Edit / delete grocery items
- View all groceries
- View incoming orders
- Update order workflow

### Delivery Side

- See available assignments
- Accept delivery assignment
- Share live location
- Chat with customer
- Send and verify OTP on delivery

## Run Locally

### 1. Install dependencies

```bash
cd fastgrocery
npm install
```

```bash
cd ../socketServer
npm install
```

### 2. Add env files

Create `fastgrocery/.env`

```env
MONGODB_URL=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_SERVER=http://localhost:4000
GEMINI_API_KEY=
EMAIL=
PASS=
```

Create `socketServer/.env`

```env
PORT=4000
NEXT_BASE_URL=http://localhost:3000
```

### 3. Start both servers

Terminal 1:

```bash
cd fastgrocery
npm run dev
```

Terminal 2:

```bash
cd socketServer
npm run dev
```

Open `http://localhost:3000`

## Deploy

### Frontend

Deploy `fastgrocery` on `Vercel`.

Root directory:

```text
fastgroc/fastgrocery
```

Production env:

```env
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXT_BASE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_SOCKET_SERVER=https://your-socket-server-url.com
```

### Socket Server

Deploy `socketServer` on `Render` or `Railway`.

Root directory:

```text
fastgroc/socketServer
```

Start command:

```bash
node index.js
```

Env:

```env
NEXT_BASE_URL=https://your-vercel-domain.vercel.app
PORT=4000
```

## Important

- Update Google OAuth callback URL before production
- Add Stripe webhook URL: `https://your-vercel-domain.vercel.app/api/user/stripe/webhook`
- Do not push real secrets to GitHub
