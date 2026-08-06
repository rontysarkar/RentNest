# 🏠 BashaRent — Backend

**Find & List Rental Properties with Ease**

BashaRent is a backend REST API for a rental property marketplace, where **Landlords** can list properties and manage rental requests, **Tenants** can browse listings, submit rental requests, and make payments, and **Admins** oversee the entire platform.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-Framework-black?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel" alt="Vercel" />
</p>

---

## 🚀 Live Links

| Resource                          | Link                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------- |
| 🔗 **Backend Live API**           | [basharent-backend-mocha.vercel.app](https://basharent-backend-mocha.vercel.app/)                 |
| 🌐 **Frontend Live Application**  | [basharent-frontend-nine.vercel.app](https://basharent-frontend-nine.vercel.app/) |
| 💻 **Frontend GitHub Repository** | [BashaRent-Frontend](https://github.com/rontysarkar/BashaRent-Frontend)       |


---

## 🛠️ Tech Stack

**Node.js, Express, TypeScript, PostgreSQL, Prisma, JWT, Bcrypt, Zod, Stripe**

---

## 👥 Roles & Permissions

| Role         | Key Permissions                                                                           |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Tenant**   | Browse listings, submit rental requests, make payments, leave reviews, manage own profile |
| **Landlord** | Create/manage listings, approve/reject requests, view tenant history                      |
| **Admin**    | Manage all users (ban/unban), oversee all listings & requests, manage categories          |

> Users select their role during registration (tenant or landlord). The admin account is seeded directly.

---

## 📡 Core Endpoints

| Module              | Base Route                           |
| ------------------- | ------------------------------------ |
| Auth                | `/api/auth`                          |
| Properties (public) | `/api/properties`, `/api/categories` |
| Landlord            | `/api/landlord`                      |
| Rental Requests     | `/api/rentals`                       |
| Payments            | `/api/payments`                      |
| Reviews             | `/api/reviews`                       |
| Admin               | `/api/admin`                         |

---

## 🗄️ Database Overview

```
Users ──┬── (landlordId) ──> Properties
        ├── (tenantId)   ──> RentalRequests
        └── (tenantId)   ──> Reviews

Categories ── (categoryId) ──> Properties

Properties ──┬── (propertyId) ──> RentalRequests
             └── (propertyId) ──> Reviews

RentalRequests ── (rentalRequestId) ──> Payments
```

---

## 📬 Response Format

**Success Response**

```json
{
  "success": true,
  "status_code": 200,
  "message": "Property Retrieve Successfully",
  "Data": {}
}
```

**Error Response**

```json
{
  "success": false,
  "status_code": 400,
  "message": "Status must be either APPROVED or REJECTED",
  "errorDetails": { "status": ["Status must be either APPROVED or REJECTED"] }
}
```

---

## 💳 Payment Integration

Uses **Stripe Checkout** (one-time payments, dynamic `price_data` since each property has a landlord-set price).

**Flow:** Approved request → Create Checkout Session → Tenant pays → Stripe webhook confirms → Payment status updated to `completed`.

---

## 🔑 Demo Credentials

**Admin**

```
Email    : admin@gmail.com
Password : 123456
```

**Landlord**

```
Email    : landlord@gmail.com
Password : 123456
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PORT=5000
```

---
