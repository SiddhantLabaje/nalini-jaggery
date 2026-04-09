# Nalini Jaggery - MERN Stack Application

## Project Structure

```
/client   → React frontend (Vite + React Router)
/server   → Node.js + Express backend
/frontend → Original HTML/CSS/JS (reference only)
/backend  → Original backend (reference only)
```

## Setup

### 1. Server

```bash
cd server
cp .env.example .env
# Edit .env and add your MONGO_URI
npm install
npm run dev
```

Server runs on http://localhost:5000

### 2. Client

```bash
cd client
npm install
npm run dev
```

Client runs on http://localhost:5173 (proxies /api to port 5000)

## API Endpoints

| Method | Endpoint     | Description          |
|--------|-------------|----------------------|
| POST   | /api/leads  | Save product enquiry |
| GET    | /api/leads  | Get all leads        |
| POST   | /api/quotes | Save quote request   |
| GET    | /api/quotes | Get all quotes       |

## Pages

| Route              | Component       |
|--------------------|-----------------|
| /                  | Home            |
| /products          | Products        |
| /products/:name    | ProductDetail   |
| /about             | About           |
| /contact           | Contact         |
| /quote             | Quote           |
