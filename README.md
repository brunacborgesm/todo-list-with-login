# Fullstack Todo List (Next.js + NestJS + Prisma)

Small fullstack app to register/login and manage user-scoped tasks. Frontend is **Next.js (TypeScript + Tailwind)**. Backend is **NestJS (TypeScript)** with **JWT auth**, **Prisma**, and **PostgreSQL**.

## Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind
- **Backend:** NestJS, JWT (passport-jwt), Prisma
- **DB:** PostgreSQL (Docker)
- **Tests (backend):** Jest with Prisma/JWT mocks
- **CI:** GitHub Actions (build front + run backend unit tests)

---

## Quick start

### 1) Backend (API)

Create `api/.env` from the example:

bash
cp .env.example api/.env
Fill values — for local dev you can start with:
PORT=
JWT_SECRET=
DATABASE_URL=

Run Postgres via Docker (see Docker section below), then:
cd api
npm ci
npx prisma migrate dev
npm run start:dev
API at http://localhost:3001

## Tests (backend)

Unit tests use mocks (no database required):

cd api
npm test
or watch:
npm run test:watch

## Docker (database only)

Minimal docker-compose.yml for Postgres (place at repo root):

version: "3.9"
services:
  db:
    image: postgres:16-alpine
    container_name: todo-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: todo_db
    ports:
      - "5432:5432"
    volumes:
      - dbdata:/var/lib/postgresql/data
volumes:
  dbdata:

# What I researched vs. what I knew

I coded the Next.js forms/pages and the Nest structure as I normally do. For Prisma specifics (client generation, DATABASE_URL setup) and Nest testing with provider overrides/mocks, I researched quickly (ChatGPT + official docs) to set up lightweight unit tests for Auth and Tasks without hitting a real DB.
