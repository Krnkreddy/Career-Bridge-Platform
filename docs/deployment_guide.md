
# Production Deployment Guide

Since the CLIs require interactive login, the most robust way to deploy is via **GitHub Integrations**. This ensures your ecosystem updates automatically when you push code.

## 1. Database (Neon)
*   **Status**: Ready.
*   **Connection String**: You already have `DATABASE_URL`. Ensure this is available for the API.

## 2. Service: API (Railway)
**Goal**: Deploy the NestJS backend (`services/api`) as a Docker container.

1.  **Login**: Go to [railway.app](https://railway.app) and login with GitHub.
2.  **New Project**: Click "New Project" -> "Deploy from GitHub repo".
3.  **Select Repo**: Choose `Career-Bridge-Platform`.
4.  **Configure Service**:
    *   Railway will detect the `Dockerfile` in `services/api/Dockerfile`? 
    *   *Correction*: It might try to build from root. You need to tell it where to look.
    *   **Settings** -> **General** -> **Root Directory**: Set to `/` (Root is correct because Dockerfile copies packages from root).
    *   **Settings** -> **Service** -> **Docker file Path**: `services/api/Dockerfile`
5.  **Environment Variables**:
    *   `DATABASE_URL`: (Paste your Neon URL)
    *   `CLERK_ISSUER_URL`: `https://your-clerk-issuer.clerk.accounts.dev` (from .env)
    *   `PORT`: `3001` (Railway usually sets PORT, but our Dockerfile exposes 3001. Best to use Railway's provided variable or map it).
    *   *Tip*: Update `main.ts` to use `process.env.PORT || 3001`.
6.  **Domain**: Railway will generate a domain (e.g., `api-production.up.railway.app`). **Copy this URL**.

## 3. Frontend: Student Web (Vercel)
**Goal**: Deploy `apps/web-student`.

1.  **Login**: Go to [vercel.com](https://vercel.com) -> Add New -> Project.
2.  **Select Repo**: `Career-Bridge-Platform`.
3.  **Project Name**: `career-bridge-student`.
4.  **Framework Preset**: Next.js.
5.  **Root Directory**: Click "Edit" and select `apps/web-student`.
6.  **Build Settings** (Monorepo handling):
    *   Vercel usually auto-detects Turbo. If not:
    *   **Build Command**: `cd ../.. && npx turbo run build --filter=web-student...`
    *   **Output Directory**: `.next`
7.  **Environment Variables**:
    *   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: (From Clerk)
    *   `CLERK_SECRET_KEY`: (From Clerk)
    *   `NEXT_PUBLIC_API_URL`: `https://api-production.up.railway.app` (The Railway URL from Step 2)
8.  **Deploy**.

## 4. Frontend: Recruiter Web (Vercel)
**Goal**: Deploy `apps/web-recruiter`.

1.  Repeat steps above but select `apps/web-recruiter` as root directory.
2.  **Project Name**: `career-bridge-recruiter`.
3.  **Env Vars**: Same keys, plus `NEXT_PUBLIC_API_URL`.

## 5. Verification
1.  Open Student URL.
2.  Login via Clerk (Prod instance needs to be configured in Clerk Dashboard to allow the new domains!).
    *   **Clerk Dashboard** -> **Development/Production** -> **API Keys** / **Domains**.
    *   Ensure Vercel domains are allowed.
3.  Jobs should load (if DB connected).
4.  Search for a job.
