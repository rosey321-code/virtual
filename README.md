# VirtualTaps — Full Stack Website
### React + Node.js + Express + MongoDB

A premium, animated digital marketing agency website for VirtualTaps.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` (already included):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/virtualtaps
JWT_SECRET=virtualtaps_super_secret_key_2024
CLIENT_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### 3. Create Admin Account

Once backend is running, call this once via terminal or Postman:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@virtualtaps.com","password":"yourpassword"}'
```

Then login at: `http://localhost:5173/login`

---

## 📁 Project Structure

```
virtualtaps/
├── backend/
│   ├── server.js          # Express server
│   ├── models/
│   │   ├── Contact.js     # Lead/contact model
│   │   ├── Portfolio.js   # Portfolio item model
│   │   └── User.js        # Admin user model
│   ├── routes/
│   │   ├── contact.js     # Contact form API
│   │   ├── services.js    # Services API
│   │   ├── portfolio.js   # Portfolio API
│   │   └── auth.js        # Login/register
│   └── middleware/
│       └── auth.js        # JWT protection
│
└── frontend/
    └── src/
        ├── App.jsx            # Router
        ├── index.css          # Global styles
        ├── components/
        │   ├── Cursor.jsx     # Custom cursor
        │   ├── Navbar.jsx     # Navigation
        │   └── Footer.jsx     # Footer
        └── pages/
            ├── Home.jsx       # Landing page
            ├── Services.jsx   # Services page
            ├── Portfolio.jsx  # Work portfolio
            ├── About.jsx      # About & team
            ├── Contact.jsx    # Contact form
            ├── Login.jsx      # Admin login
            └── Admin.jsx      # Admin dashboard
```

---

## ✨ Features

### Frontend
- 🎨 Dark theme with purple/cyan gradient design system
- 🖱️ Custom animated cursor with follower ring
- ✍️ Typewriter animation in hero (react-type-animation)
- 📊 Animated counter stats (react-countup)
- 🎞️ Scroll-triggered reveal animations (framer-motion)
- 🔀 Filtered portfolio with AnimatePresence
- 📱 Fully responsive (mobile + tablet + desktop)
- 🔔 Toast notifications (react-hot-toast)
- ⚡ Marquee ticker animation

### Backend
- 🔐 JWT authentication for admin
- 📬 Contact form with MongoDB storage
- 🏢 Services API
- 🖼️ Portfolio CRUD API
- 👤 Admin user management

### Admin Dashboard
- 📋 View all leads in table
- 🔍 Click lead to see full detail panel
- ✉️ One-click reply via email
- 💬 WhatsApp client directly from dashboard
- 📊 Live stats (total, new, read, replied)
- 🔄 Status update (new → read → replied)

---

## 🌐 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend → Railway / Render
- Set MONGO_URI to MongoDB Atlas connection string
- Set JWT_SECRET to a strong random string
- Set CLIENT_URL to your Vercel frontend URL

---

## 🔧 Customize

- **Colors**: Edit CSS variables in `src/index.css`
- **Services**: Edit `backend/routes/services.js`
- **Team**: Edit `src/pages/About.jsx`
- **Testimonials**: Edit `src/pages/Home.jsx`
- **Contact info**: Edit Footer.jsx and Contact.jsx

---

Built with ❤️ for VirtualTaps | React 18 + Node.js + MongoDB
