# Fullstack Todo List (Next.js + NestJS + Prisma)

Fullstack app to register/login and manage user-scoped tasks. Frontend is **Next.js (TypeScript + Tailwind)**. Backend is **NestJS (TypeScript)** with **JWT auth**, **Prisma**, and **PostgreSQL**.

## Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind
- **Backend:** NestJS, JWT (passport-jwt), Prisma
- **DB:** PostgreSQL (Docker)
- **Tests (backend):** Jest with Prisma/JWT mocks
- **CI:** GitHub Actions (build front + run backend unit tests)

---

## Demo
### Login
<p>
  <img src="./public/login-lg.png" width="500" alt="Login Page Desktop" />
  <img src="./public/login-sm.png" height="400" alt="Login Page Mobile" />
</p>

### Register
<p>
  <img src="./public/register-lg.png" width="500" alt="Register Page Desktop" />
  <img src="./public/register-sm.png" height="400" alt="Register Page Mobile" />
</p>

### Task List
<p>
  <img src="./public/task-lg.png" width="500" alt="Task List Page Desktop" />
  <img src="./public/task-sm.png" height="400" alt="Task List Page Mobile" />
</p>

## 🚀 Running the project locally

### Clone the repository
bash
git clone https://github.com/brunacborgesm/todo-list-with-login.git
cd todo-list-with-login

### Environment variables
Create a .env file inside the API folder (api/) based on .env.example:
cp api/.env.example api/.env

Example:
DATABASE_URL="postgresql://user:password@localhost:5432/todo"
JWT_SECRET="your-secret-key"

### Start Docker
Start the database (Docker)
docker compose up -d

### Run Prisma migrations and generate the client
cd api
npx prisma migrate dev
npx prisma generate

### Start the backend
npm install
npm run start:dev

API available at http://localhost:3001

### Start the frontend

npm install
npm run dev

App available at http://localhost:3000

### Test the app

Register a new user
Log in
Create, edit and delete tasks
The JWT token is automatically stored in localStorage

# What I researched vs. what I knew

I coded the Next.js forms/pages and the Nest structure as I normally do. For Prisma specifics (client generation, DATABASE_URL setup) and Nest testing with provider overrides/mocks, I researched quickly (ChatGPT + official docs) to set up lightweight unit tests for Auth and Tasks without hitting a real DB.
