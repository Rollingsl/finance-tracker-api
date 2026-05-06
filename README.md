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
