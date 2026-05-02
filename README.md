# Super Mega Game MMO

This is the boilerplate foundation for an expansive, browser-based, Next.js, WebGL/Three.js, NestJS/Express, and WebSocket multiplayer RPG. It integrates directly with a live Supabase PostgreSQL database for persistent, real-time multi-world capabilities.

## Architecture

*   **Frontend**: Next.js (App Router), React, TailwindCSS, Zustand for state management, and React Three Fiber / Drei for 3D rendering.
*   **Backend**: Node.js + Express with Socket.io for handling realtime game state and chat syncing.
*   **Database**: Supabase (PostgreSQL) loaded with a massive schema encompassing Users, Guilds, Characters, Economy, Lands, Quests, Bosses, Trades, and more.
*   **Infrastructure**: Fully Dockerized utilizing `docker-compose` integrating a Redis server for message passing and pub/sub capabilities to allow the NodeJS server to scale horizontally later.

## Setup Instructions

1.  Make sure you have Docker and Docker Compose installed.
2.  Set your environment variables.
    You need a `.env` file in the root `game-project` directory (or you can pass them into docker) with:
    ```
    SUPABASE_URL=<your-supabase-url>
    SUPABASE_ANON_KEY=<your-supabase-anon-key>
    ```
3.  Run `docker-compose up --build` from the `game-project` directory.
4.  Navigate to `http://localhost:3000` to play the game client. The backend server runs at `http://localhost:3001`.

## Local Development (Without Docker)

### Frontend
`cd frontend`
`npm install`
`npm start`

### Backend
`cd backend`
`npm install`
`npm start`

## Features Complete

*   Fully integrated Supabase Schema for MMO game systems.
*   A Next.js frontend with an initialized React-Three-Fiber context ready for massive WebGL worlds.
*   Zustand stores set up for tracking Player data and Chat system.
*   Node.js Server running Websockets to sync real-time player states, locations, health, and chat messages.
*   Docker container setup and ready for easy scalable deployment.

## Next Steps for the AAA Experience

*   Implement procedural terrain generation using Three.js and worker threads.
*   Connect Cannon.js/Rapier physics to React-Three-Fiber entities.
*   Build the Next.js API Routes to handle authentication via Supabase.
*   Incorporate Babylon.js / WebGPU rendering passes to handle high fidelity Post-Processing.
*   Create distinct modules for the NestJS/Express Backend for Combat, Inventory, and Questing logic.

## Deploying on Vercel

The frontend application is ready to be deployed on Vercel. Because the Next.js app is located in the `frontend` subdirectory, you need to configure the Vercel project correctly:

### Steps to Deploy:

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New...** > **Project**.
3. Import your repository.
4. In the "Configure Project" screen, expand the **"Build and Output Settings"** section (or the **"Root Directory"** setting).
5. Set the **Root Directory** to `frontend`.
6. Add the following **Environment Variables**:
   * `SUPABASE_URL`: Your Supabase project URL.
   * `SUPABASE_ANON_KEY`: Your Supabase anonymous key.
   * *(Note: When you deploy the backend elsewhere, you might also want to pass `NEXT_PUBLIC_BACKEND_URL` so the frontend knows where to connect to the Socket.io server).*
7. Click **Deploy**. Vercel will automatically detect that it's a Next.js app inside the `frontend` folder and run `npm run build` from that directory.

### Backend Hosting Note
Vercel's serverless architecture does not support the long-lived WebSockets required by the backend Socket.io server. You should deploy the `backend` folder to a service like [Render](https://render.com), [Railway](https://railway.app), or [Fly.io](https://fly.io) which support persistent instances for WebSocket connections.
