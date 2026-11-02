# KCSTANCESHOP

KCSTANCESHOP is a vehicle restyling website for the Olathe, Kansas shop. The frontend is a React single-page application built with Vite. A separate Express API handles appointment availability, bookings, and quote request emails.

## Features

- Responsive home, services, gallery, about, and quote pages.
- Gallery filters, project details, and an image lightbox.
- Appointment booking backed by PostgreSQL availability data.
- Quote requests and booking notifications sent through SMTP.
- Page-specific titles, descriptions, canonical URLs, and social preview metadata.
- Local business structured data, `robots.txt`, and `sitemap.xml`.

## Project layout

```text
.
├── backend/                 # Express API and PostgreSQL connection
├── public/                  # Static images, icons, robots.txt, sitemap.xml
├── scripts/                 # Build-time SEO page generation
├── src/
│   ├── components/          # Shared UI, SEO, booking modal, location
│   ├── pages/               # Home, Services, Gallery, About, Quote
│   └── services/            # Frontend API client
├── index.html
├── vercel.json              # Frontend routes and SPA fallback
└── package.json
```

## Requirements

- Node.js and npm
- PostgreSQL database for appointments and availability
- SMTP credentials for sending quote and booking emails

## Run locally

### 1. Start the frontend

From the repository root:

```bash
npm install
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

The frontend uses `http://localhost:5000` as its default API URL. To override it, create a root `.env.local` file:

```dotenv
VITE_API_URL=http://localhost:5000
```

### 2. Configure and start the API

Create `backend/.env`:

```dotenv
PORT=5000
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SHOP_EMAIL=shop@example.com
```

Install backend dependencies and start the API in a second terminal:

```bash
cd backend
npm install
node server.js
```

Keep credentials in environment files or your hosting provider's secret settings. Do not commit `.env` files.

### Database setup

The API expects a PostgreSQL database with the tables used by the booking queries, including `services`, `business_hours`, `appointments`, and `blocked_times`. This repository does not include a schema migration or seed script, so provision the database before using appointment availability and booking endpoints.

To check whether the database connection works, run from `backend/`:

```bash
node test-db.js
```

This checks connectivity; it does not create or migrate tables.

## API routes

The frontend calls these routes on the backend:

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/services` | List active bookable services |
| `GET` | `/api/availability?serviceId=…&date=YYYY-MM-DD` | Return available booking slots |
| `POST` | `/api/appointments` | Create an appointment request |
| `POST` | `/api/quote` | Email a quote request to the shop |

The booking client is in `src/services/bookingApi.js`. The quote form posts directly to `/api/quote`.

## Build and deploy

Build the frontend from the repository root:

```bash
npm run build
```

This runs Vite and then `scripts/generate-seo-pages.mjs`, which writes route-specific HTML metadata for `/services`, `/gallery`, `/about`, and `/quote` into `dist/`. Vercel serves those pages using the rewrites in `vercel.json`; the remaining paths use the SPA fallback.

Deploy the frontend as a Vite project with the repository root as its project root. Deploy `backend/` as a separate Node.js service and configure its environment variables there. Set the frontend's `VITE_API_URL` to the deployed API origin and the API's `FRONTEND_URL` to the deployed website origin.

The sitemap is available at `/sitemap.xml` and the crawler rules at `/robots.txt`. After deploying, submit the sitemap in Google Search Console.

## Available frontend scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the site and generate route-specific SEO HTML |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint on the frontend source |
