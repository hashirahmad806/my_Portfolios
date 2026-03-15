# 🚀 Hashir Ahmad — MERN Stack Portfolio

A premium, production-ready full-stack portfolio website with an obsidian/gold design,
smooth Framer Motion animations, custom cursor, and a real contact form saved to MongoDB.

---

## 📁 Project Structure

```
hashir-portfolio-mern/
├── frontend/                         # React 18 + Vite + Tailwind CSS
│   ├── public/
│   │   ├── favicon.svg
│   │   └── hashir.jpg                ← Your photo
│   ├── src/
│   │   ├── assets/
│   │   │   └── hashir.jpg
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Cursor.jsx        ← Gold custom cursor
│   │   │   │   ├── Loader.jsx        ← Cinematic boot screen
│   │   │   │   ├── Navbar.jsx        ← Fixed glass navbar
│   │   │   │   └── Footer.jsx
│   │   │   └── sections/
│   │   │       ├── Hero.jsx          ← Photo + typewriter + floating badges
│   │   │       ├── About.jsx         ← Bio + feature cards
│   │   │       ├── Skills.jsx        ← Animated skill bars
│   │   │       ├── Projects.jsx      ← Filterable cards (loaded from API)
│   │   │       ├── Experience.jsx    ← Timeline cards
│   │   │       ├── Learning.jsx      ← AI/ML progress section
│   │   │       └── Contact.jsx       ← Form → POST /api/contact
│   │   ├── context/
│   │   │   └── ThemeContext.jsx      ← Dark/light mode
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js   ← Intersection Observer hook
│   │   ├── utils/
│   │   │   └── api.js               ← Axios instance + API helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                ← Tailwind + global styles
│   ├── index.html                   ← SEO meta tags + Google Fonts
│   ├── vite.config.js               ← Dev proxy → localhost:5000
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── package.json
│
├── backend/                          # Node.js + Express + MongoDB
│   ├── config/
│   │   └── db.js                    ← Mongoose connection
│   ├── models/
│   │   ├── Contact.js               ← Contact schema + indexes
│   │   └── Project.js               ← Project schema
│   ├── controllers/
│   │   ├── contactController.js     ← CRUD for messages
│   │   └── projectController.js     ← Projects + seed endpoint
│   ├── routes/
│   │   ├── contact.js               ← POST/GET/PATCH/DELETE
│   │   └── projects.js              ← GET + seed
│   ├── middleware/
│   │   └── errorHandler.js          ← Centralized error handling
│   ├── server.js                    ← Express app entry point
│   ├── render.yaml                  ← Render.com deployment
│   ├── .env.example
│   └── package.json
│
├── package.json                     ← Root convenience scripts
├── .gitignore
└── README.md
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🖱️ Custom Gold Cursor | Dot + lagged ring following mouse |
| ⚙️ Cinematic Loader | Spinning gradient ring + progress bar |
| 🌓 Dark/Light Mode | Persisted in localStorage |
| 🎞️ Framer Motion | Stagger reveals, hover effects, layout animation |
| ⌨️ Typewriter Effect | Cycling roles in the Hero |
| 🖼️ Real Photo | Your actual photo with floating badges |
| 🗂️ Project Filtering | Filter by All / Full Stack / Frontend / Backend |
| 📡 API-driven Projects | Loaded from MongoDB (falls back to static data) |
| 📬 Contact Form | Validated → saved to MongoDB via Express API |
| 🛡️ Rate Limiting | 5 msgs/IP/hour + 200 global req/15min |
| 📱 Fully Responsive | Mobile-first, slide-in mobile nav |
| 🔍 SEO Ready | Meta, OG, Twitter card tags |

---

## 🏁 Run Locally

### 1. Clone & Install

```bash
git clone https://github.com/hashirahmad806/portfolio.git
cd hashir-portfolio-mern

# Install everything
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/hashir_portfolio?retryWrites=true&w=majority
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=change_this_to_a_long_random_string
```

> **Get MongoDB URI:** [mongodb.com/atlas](https://mongodb.com/atlas) → Free Cluster → Connect → Drivers → Copy string

### 3. Start Backend

```bash
cd backend
npm run dev
# ✅  http://localhost:5000
# 🏥  http://localhost:5000/api/health
```

### 4. Seed Projects to MongoDB (optional)

```bash
curl -X POST http://localhost:5000/api/projects/seed
```

### 5. Start Frontend

```bash
cd frontend
npm run dev
# ✅  http://localhost:5173
```

---

## 🌐 Deploy to Production

### Frontend → Vercel

1. Push to GitHub
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. **Root Directory:** `frontend`
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Add env var: `VITE_API_URL=https://your-render-url.onrender.com/api`
7. Deploy ✅

### Backend → Render

1. [render.com](https://render.com) → New Web Service → Connect repo
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `node server.js`
5. Add env vars:
   - `NODE_ENV=production`
   - `MONGO_URI=<your Atlas URI>`
   - `FRONTEND_URL=https://your-vercel-url.vercel.app`
   - `JWT_SECRET=<long random string>`
6. Deploy ✅

---

## 📡 API Reference

### `POST /api/contact`
```json
{ "name": "John", "email": "j@mail.com", "message": "Hello Hashir!" }
```
**Response:** `201` → `{ success: true, message: "...", data: { id, name, createdAt } }`

### `GET /api/projects`
Returns all projects. Filter: `?category=fullstack`

### `POST /api/projects/seed`
Seeds 6 default projects into MongoDB.

### `GET /api/health`
Health check → `{ success: true, message: "Hashir Ahmad Portfolio API 🚀" }`

---

## 📄 License
MIT © Hashir Ahmad
