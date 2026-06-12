# Nalini Jaggery — Full Stack Web App

React + Node.js/Express + MongoDB

---

## Local Development

### 1. Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment
```bash
# server/.env
MONGO_URI=mongodb://127.0.0.1:27017/nalinijaggery
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=yourpassword
JWT_SECRET=your-secret-key
ADMIN_SECRET=your-admin-secret
```
No `client/.env` needed for local dev — Vite proxy handles API calls.

### 3. Seed the database (first time only)
```bash
cd server && npm run seed
```

### 4. Run both servers
```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```
Frontend: http://localhost:5173  
Backend:  http://localhost:5000

---

## Production Deployment

### Architecture
```
Vercel  →  React frontend  (nalinijaggery.vercel.app or custom domain)
Render  →  Node/Express API (your-app.onrender.com)
Atlas   →  MongoDB database
```

---

### Step 1 — MongoDB Atlas
1. [mongodb.com/atlas](https://mongodb.com/atlas) → free M0 cluster
2. Create DB user → Network Access → Allow `0.0.0.0/0`
3. Get connection string:
   ```
   mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/nalinijaggery
   ```

---

### Step 2 — Deploy Backend on Render
1. [render.com](https://render.com) → New → **Web Service**
2. Connect your GitHub repo
3. Settings:
   ```
   Root Directory:   server
   Build Command:    npm install
   Start Command:    node server.js
   ```
4. Environment Variables:
   ```
   MONGO_URI      = mongodb+srv://...
   PORT           = 5000
   CLIENT_URL     = https://nalinijaggery.vercel.app
   ADMIN_USERNAME = admin
   ADMIN_PASSWORD = (strong password)
   JWT_SECRET     = (long random string — 32+ chars)
   ADMIN_SECRET   = (long random string)
   NODE_ENV       = production
   ```
5. After deploy, copy your Render URL e.g. `https://nalini-api.onrender.com`
6. Seed the DB (one time):
   Go to Render → Shell tab → run `node seed.js`

---

### Step 3 — Deploy Frontend on Vercel
1. [vercel.com](https://vercel.com) → New Project → import GitHub repo
2. Settings:
   ```
   Root Directory:   client
   Build Command:    npm run build
   Output Directory: dist
   ```
3. Environment Variables:
   ```
   VITE_API_URL = https://nalini-api.onrender.com
   ```
4. Deploy → copy your Vercel URL

---

### Step 4 — Update Render CORS
Go back to Render → Environment Variables → update:
```
CLIENT_URL = https://nalinijaggery.vercel.app
```
(use your actual Vercel URL)

---

### Step 5 — Custom Domain (optional)
**Vercel:** Project Settings → Domains → add `nalinijaggery.com`  
**DNS at registrar:**
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

---

## Project Structure
```
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── admin/   # Protected admin panel
│   │   ├── pages/   # Public pages
│   │   ├── components/
│   │   ├── api/     # Axios API client
│   │   └── data/    # Static product data (fallback)
│   ├── public/
│   │   └── images/  # favicon.png, og-image.jpg
│   └── vercel.json  # React Router SPA rewrites
│
└── server/          # Node.js + Express backend
    ├── routes/      # API route definitions
    ├── controllers/ # Business logic
    ├── models/      # Mongoose schemas
    ├── middleware/  # JWT auth
    └── config/      # MongoDB connection
```

## Admin Panel
- URL: `/admin-secret`
- Keyboard shortcut: `Ctrl+Shift+A`
- Manage products, view orders, export CSV
