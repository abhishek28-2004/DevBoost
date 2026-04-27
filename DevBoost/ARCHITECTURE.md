# Project Overview

## 📦 What's Included

✅ **Complete full-stack application ready to deploy**
✅ **All backend routes implemented and connected**
✅ **React frontend with all 6 features**
✅ **MongoDB schema design with proper indexing**
✅ **JWT authentication with bcryptjs hashing**
✅ **Environment configuration examples**
✅ **Comprehensive documentation**

---

## 📂 File Count & Structure

```
Web Dev/
├── 📄 README.md                    (Complete setup guide - read FIRST)
├── 📄 QUICK_START.md              (5-minute quick start)
├── 📄 FEATURES.md                 (Interview talking points)
├── 📄 ARCHITECTURE.md             (This file)
├── 📄 .gitignore
├── 📄 package.json                (Root - optional)
│
├── 📁 backend/                    (Node.js + Express)
│   ├── 📄 server.js               (Main entry point)
│   ├── 📄 package.json
│   ├── 📄 .env.example            (Copy to .env)
│   │
│   ├── 📁 models/                 (5 Mongoose schemas)
│   │   ├── User.js                (Auth + profile)
│   │   ├── Goal.js                (Daily goals)
│   │   ├── Snippet.js             (Code vault)
│   │   ├── PomodoroSession.js      (Timer history)
│   │   └── EnergyLog.js            (Mood + focus)
│   │
│   ├── 📁 routes/                 (6 API route files)
│   │   ├── auth.js                (Register, login, me)
│   │   ├── github.js              (GitHub API integration)
│   │   ├── pomodoro.js            (Timer CRUD + stats)
│   │   ├── goals.js               (Goals CRUD + tracking)
│   │   ├── snippets.js            (Snippet CRUD + search)
│   │   └── energy.js              (Energy log CRUD)
│   │
│   ├── 📁 middleware/
│   │   └── auth.js                (JWT verification)
│   │
│   ├── 📁 controllers/            (Placeholder for expansion)
│   └── 📁 utils/                  (Placeholder for expansion)
│
└── 📁 frontend/                   (React + Tailwind)
    ├── 📁 public/
    │   └── index.html             (HTML entry point)
    │
    ├── 📁 src/
    │   ├── 📄 App.js              (Main router + auth logic)
    │   ├── 📄 api.js              (Axios instance with auth)
    │   ├── 📄 index.js            (React entry)
    │   ├── 📄 index.css           (Tailwind imports)
    │   │
    │   ├── 📁 pages/              (3 full pages)
    │   │   ├── Login.js           (Auth form)
    │   │   ├── Register.js        (Auth form)
    │   │   └── Dashboard.js       (Main app)
    │   │
    │   └── 📁 components/         (6 feature components)
    │       ├── Navbar.js          (Top nav)
    │       ├── GitHubStats.js      (GitHub integration)
    │       ├── PomodoroTimer.js    (Pomodoro feature)
    │       ├── GoalTracker.js      (Daily goals)
    │       ├── EnergyLog.js        (Mood/focus tracker)
    │       └── SnippetVault.js    (Code snippets)
    │
    └── 📄 package.json
```

---

## 🔗 Component Data Flow

```
App.js (Router)
├─ Login ─────────────────────────────────┐
├─ Register───────────────────────────────┤
│                                         │ JWT Token → localStorage
└─ Dashboard (Protected Route) ◄──────────┘
   │
   ├─ Navbar (User + Logout)
   │
   └─ Feature Tabs
      ├─ Overview (All 4 side-by-side)
      │  ├─ GitHubStats ──→ GET /api/github/stats
      │  ├─ PomodoroTimer ─→ GET/POST /api/pomodoro/*
      │  ├─ GoalTracker ──→ GET/POST /api/goals/*
      │  └─ EnergyLog ────→ GET/POST /api/energy/*
      │
      ├─ GitHub Tab
      ├─ Pomodoro Tab
      ├─ Goals Tab
      ├─ Energy Tab
      └─ Snippets Tab ───→ GET/POST /api/snippets/*
```

---

## 🛢️ Database Schema

### User

```javascript
{
  _id: ObjectId;
  name: String;
  email: String(unique);
  password: String(hashed);
  githubUsername: String;
  createdAt: Date;
}
```

### Goal

```javascript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  date: Date (unique per user)
  goals: [{
    text: String,
    completed: Boolean,
    completedAt: Date
  }]
  createdAt: Date
}
```

### PomodoroSession

```javascript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  duration: Number (minutes)
  task: String
  completed: Boolean
  startedAt: Date
  completedAt: Date
  createdAt: Date
}
```

### Snippet

```javascript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  title: String
  code: String
  language: String
  tags: [String] (searchable)
  description: String
  createdAt: Date
}
```

### EnergyLog

```javascript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  date: Date (unique per user)
  focusLevel: Number (1-10)
  mood: Number (1-10)
  notes: String
  createdAt: Date
}
```

---

## 🔑 Key APIs

| Endpoint                | Method              | Auth | Purpose         |
| ----------------------- | ------------------- | ---- | --------------- |
| `/auth/register`        | POST                | ❌   | Create account  |
| `/auth/login`           | POST                | ❌   | Get JWT token   |
| `/auth/me`              | GET                 | ✅   | Current user    |
| `/github/stats`         | GET                 | ✅   | GitHub profile  |
| `/github/repos`         | GET                 | ✅   | Recent repos    |
| `/pomodoro/start`       | POST                | ✅   | Start session   |
| `/pomodoro/stats/today` | GET                 | ✅   | Daily stats     |
| `/goals/today`          | GET/POST            | ✅   | Today's goals   |
| `/goals/:id/toggle`     | PUT                 | ✅   | Mark complete   |
| `/snippets`             | GET/POST/PUT/DELETE | ✅   | Manage snippets |
| `/energy/today`         | GET/POST            | ✅   | Energy log      |

---

## 🚀 Tech Stack Summary

| Layer             | Technology               | Why                          |
| ----------------- | ------------------------ | ---------------------------- |
| **Frontend**      | React 18 + Tailwind      | Fast dev, beautiful UI       |
| **Backend**       | Express.js + Node.js     | Lightweight, non-blocking    |
| **Database**      | MongoDB                  | Flexible schema, TTL indexes |
| **Auth**          | JWT + bcryptjs           | Stateless, secure            |
| **External APIs** | GitHub REST API          | Real data, impressive demo   |
| **UI Components** | react-syntax-highlighter | Beautiful code display       |
| **Charting**      | Recharts (future)        | Professional graphs          |

---

## 📋 Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random_secret_key
GITHUB_TOKEN=ghp_...
GITHUB_USERNAME=your_github
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 From Zero to Hero Timeline

- **5 mins** — Install deps, configure `.env`
- **2 mins** — Start backend + frontend
- **1 min** — Register account
- **3 mins** — Add GitHub username, set goals
- **Demo ready!**

---

## 📚 Documentation Files

- **README.md** — Complete guide (deployment, troubleshooting)
- **QUICK_START.md** — 5-minute setup
- **FEATURES.md** — Interview talking points + architecture decisions
- **ARCHITECTURE.md** — This file (structure overview)

---

## ✅ Quality Checklist

- ✅ Full auth system (register, login, JWT)
- ✅ GitHub API integration (real data)
- ✅ 5 core features fully functional
- ✅ Responsive design (Tailwind)
- ✅ Error handling throughout
- ✅ Clean code structure
- ✅ No hardcoded secrets
- ✅ Scalable architecture
- ✅ Production-ready deployment config
- ✅ Comprehensive documentation

---

Ready to ship! 🚀

For setup, see [QUICK_START.md](./QUICK_START.md).
For interviews, see [FEATURES.md](./FEATURES.md).
For deployment, see [README.md](./README.md).
