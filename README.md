# Investment API

Fully functional REST API for managing investment assets, user portfolios, and price alerts.

## Tech stack

- Node.js and Express
- PostgreSQL
- Prisma ORM
- JWT authentication
- bcrypt password hashing
- Swagger/OpenAPI documentation

## Local setup

1. Make sure PostgreSQL is running locally on port `5433`.
2. Create the database:

```bash
createdb -h localhost -p 5433 -U jordanwise-smith investment_db
```

3. Install dependencies:

```bash
npm install
```

4. Run migrations:

```bash
npx prisma migrate dev --name init
```

5. Seed data:

```bash
npm run seed
```

6. Start the API:

```bash
npm run dev
```

Swagger UI is available at `http://localhost:3000/api-docs`.

## Seed accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `stkadmin@email.com` | `Admin123!` |
| User | `stkuser@email.com` | `User123!` |

## Render deployment

Set these environment variables in Render:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`

Recommended Render build command:

```bash
npm install && npm run render-build
```

Recommended Render start command:

```bash
npm start
```

The `render-build` script generates Prisma Client, applies migrations, and seeds the database.

## Testing plan

Use `TESTING_PLAN.md` for the complete Swagger UI grading walkthrough, including credentials, access control, success cases, and expected error responses.

## Submission checklist

Your Canvas PDF should include:

- Public GitHub repository link
- Live Render API URL
- Live Render Swagger documentation URL
- Testing plan from `TESTING_PLAN.md`
