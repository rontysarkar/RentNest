# RentNest 🏠

**Find & List Rental Properties with Ease**

RentNest is a backend REST API for a rental property marketplace, where **Landlords** can list properties and manage rental requests, **Tenants** can browse listings, submit rental requests, and make payments, and **Admins** oversee the entire platform.

**Live API:** https://rent-nest-mocha.vercel.app/

---

## Tech Stack

Node.js, Express, TypeScript, PostgreSQL, Prisma, JWT, Bcrypt, Zod, Stripe

## Roles & Permissions

| Role         | Key Permissions                                                                           |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Tenant**   | Browse listings, submit rental requests, make payments, leave reviews, manage own profile |
| **Landlord** | Create/manage listings, approve/reject requests, view tenant history                      |
| **Admin**    | Manage all users (ban/unban), oversee all listings & requests, manage categories          |

> Users select their role during registration (`tenant` or `landlord`). Admin account is seeded directly.

## Core Endpoints

| Module              | Base Route                           |
| ------------------- | ------------------------------------ |
| Auth                | `/api/auth`                          |
| Properties (public) | `/api/properties`, `/api/categories` |
| Landlord            | `/api/landlord`                      |
| Rental Requests     | `/api/rentals`                       |
| Payments            | `/api/payments`                      |
| Reviews             | `/api/reviews`                       |
| Admin               | `/api/admin`                         |

## Database Overview

```
Users ──┬── (landlordId) ──> Properties
        ├── (tenantId)   ──> RentalRequests
        └── (tenantId)   ──> Reviews

Categories ── (categoryId) ──> Properties
Properties ──┬── (propertyId) ──> RentalRequests
             └── (propertyId) ──> Reviews
RentalRequests ── (rentalRequestId) ──> Payments
```

## Success Response Format

```json
{
  "success": true,
  "status_code": 200,
  "message": "Property Retrieve Successfully",
  "Data": {}
}
```

## Error Response Format

```json
{
  "success": false,
  "status_code": 400,
  "message": "Status must be either APPROVED or REJECTED",
  "errorDetails": { "status": ["Status must be either APPROVED or REJECTED"] }
}
```

## Payment Integration

Uses **Stripe Checkout** (one-time payments, dynamic `price_data` since each property has a landlord-set price). Flow: approved request → create Checkout Session → tenant pays → Stripe webhook confirms → Payment status updated to `completed`.

## Admin Credentials

```
Email    : admin@gmail.com
Password : 123456
```


## Landlord Credentials

```
Email    : landlord@gmail.com
Password : 123456
```
