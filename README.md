# Finance Tracker API

A RESTful backend API for a personal finance tracking application. Built with Node.js, Express, Prisma ORM, and PostgreSQL.

## Live URL
https://finance-tracker-api-production-50e8.up.railway.app

## Tech Stack
- **Runtime:** Node.js v20
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Auth:** JWT + bcrypt
- **Validation:** Zod
- **Deployment:** Railway

## Features
- User registration and login with JWT authentication
- Create, read, and delete transactions (income & expenses)
- Financial summary (total income, expenses, balance)
- Budget management with spending vs limit tracking
- Protected routes with auth middleware
- Global error handling

## Project Structure
# Finance Tracker UI

A React frontend for the Finance Tracker application. Allows users to track income, expenses, and budgets with a clean dashboard and charts.

## Live URL
https://finance-tracker-ui-mauve.vercel.app

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Charts:** Chart.js + react-chartjs-2
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Deployment:** Vercel

## Features
- User registration with Full Name, Phone, Email and Password
- JWT-based login with persistent session
- Dashboard with income, expenses and balance summary
- Doughnut chart for expenses by category
- Bar chart for last 7 days activity
- Add and delete transactions
- Smart category filter — categories change based on income or expense selection
- Budget tracker with progress bars and over-budget alerts
- Logout confirmation modal
- All amounts displayed in Ugandan Shillings (UGX)

## Project Structure
src/
├── controllers/
│   ├── auth.controller.js
│   ├── transaction.controller.js
│   └── budget.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── routes/
│   ├── auth.routes.js
│   ├── transaction.routes.js
│   └── budget.routes.js
└── app.js
prisma/
└── schema.prisma
server.js

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get JWT token |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/transactions | Create a transaction |
| GET | /api/transactions | Get all transactions |
| GET | /api/transactions/summary | Get income, expenses, balance |
| DELETE | /api/transactions/:id | Delete a transaction |

### Budgets
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/budgets | Create a budget |
| GET | /api/budgets | Get all budgets |
| GET | /api/budgets/check | Check spending vs budget |

## Getting Started

### Prerequisites
- Node.js v20+
- PostgreSQL

### Installation
```bash
# Clone the repository
git clone https://github.com/Rollingsl/finance-tracker-api.git

# Navigate into the project
cd finance-tracker-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your DATABASE_URL and JWT_SECRET

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

### Environment Variables
```env
DATABASE_URL="postgresql://user:password@localhost:5432/finance_tracker"
JWT_SECRET="your_secret_key"
PORT=3000
```

## Database Schema
- **User** — id, fullName, phone, email, password, createdAt
- **Transaction** — id, amount, type, category, note, date, userId
- **Budget** — id, category, limit, month, userId
