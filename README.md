# 🚀 DevBoard — Developer Productivity OS

A personal command center for developers that aggregates **GitHub activity, LeetCode stats, daily goals, Pomodoro timer, code snippet vault, and mood/energy tracker** — all in one sleek real-time dashboard.

Built with **React + Tailwind** (frontend), **Node.js + Express** (backend), and **MongoDB** (database).

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

---

## ✨ Features

| Feature                | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| **GitHub Integration** | Real-time GitHub stats, followers, repos, and activity |
| **Pomodoro Timer**     | 25-minute focused work sessions with history tracking  |
| **Daily Goal Tracker** | Set 3 goals each morning, track completion rate        |
| **Snippet Vault**      | Save, search, and organize reusable code snippets      |
| **Energy Log**         | Rate your daily focus and mood (1-10 scale)            |
| **Authentication**     | JWT-based secure login/register with bcrypt encryption |

---

## 🛠️ Tech Stack

```
Frontend    → React 18 + Tailwind CSS + Recharts
Backend     → Node.js + Express.js
Database    → MongoDB (Atlas recommended)
Auth        → JWT + bcryptjs
APIs        → GitHub REST API, custom REST endpoints
Deployment  → Vercel (frontend) + Render/Railway (backend)
```

---

## 📁 Project Structure

```
Web Dev/
├── backend/
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   ├── Goal.js
│   │   ├── Snippet.js
│   │   ├── PomodoroSession.js
│   │   └── EnergyLog.js
│   ├── routes/              # API endpoints
│   │   ├── auth.js
│   │   ├── github.js
│   │   ├── pomodoro.js
│   │   ├── goals.js
│   │   ├── snippets.js
│   │   └── energy.js
│   ├── middleware/          # Auth middleware
│   │   └── auth.js
│   ├── controllers/         # Business logic (optional expansion)
│   ├── utils/               # Helper functions (optional expansion)
│   ├── server.js            # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/           # React pages
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── GitHubStats.js
│   │   │   ├── PomodoroTimer.js
│   │   │   ├── GoalTracker.js
│   │   │   ├── EnergyLog.js
│   │   │   └── SnippetVault.js
│   │   ├── App.js
│   │   ├── api.js           # Axios instance with auth
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── README.md                # This file
└── .gitignore
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14+) and **npm** (v6+)  
  → Download: [nodejs.org](https://nodejs.org)
- **MongoDB Atlas** account (free tier available)  
  → Sign up: [mongodb.com/cloud](https://mongodb.com/cloud)
- **GitHub Personal Access Token** (for GitHub integration)  
  → Generate: [github.com/settings/tokens](https://github.com/settings/tokens)

Check versions:

```bash
node --version
npm --version
```

---

## 🔧 Setup Instructions

### Step 1: Navigate to Web Dev Folder

```bash
cd "C:\Users\Abhishek Yadav\DevBoost"
```

### Step 2: Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devboard
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**How to get these values:**

- **MONGODB_URI**:
  1. Go to [MongoDB Atlas](https://mongodb.com/cloud)
  2. Create a cluster (free tier)
  3. Click "Connect" → "Drivers" → Copy connection string
  4. Replace `<username>:<password>` with your credentials

- **GITHUB_TOKEN**:
  1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
  2. Click "Generate New Token"
  3. Select scopes: `repo`, `user`
  4. Copy and paste the token

- **JWT_SECRET**: Generate a random string (min 32 characters)
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### Step 3: Frontend Setup

Navigate to the frontend directory (from Web Dev folder):

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file (optional, for API configuration):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Project

### Option A: Run Both in Separate Terminals (Recommended for Development)

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

Backend will start on `http://localhost:5000`

**Terminal 2 — Frontend:**

```bash
cd frontend
npm start
```

Frontend will open at `http://localhost:3000`

### Option B: Run with npm scripts (from root Web Dev folder)

```bash
npm run dev-backend
npm run dev-frontend  # In another terminal
```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable          | Required | Description               | Example                       |
| ----------------- | -------- | ------------------------- | ----------------------------- |
| `PORT`            | ✅       | Server port               | `5000`                        |
| `MONGODB_URI`     | ✅       | MongoDB connection string | `mongodb+srv://...`           |
| `JWT_SECRET`      | ✅       | JWT signing key           | Random 32+ char string        |
| `GITHUB_TOKEN`    | ✅       | GitHub API token          | `ghp_...`                     |
| `GITHUB_USERNAME` | ✅       | Your GitHub username      | `your_github_user`            |
| `NODE_ENV`        | ✅       | Environment               | `development` or `production` |
| `FRONTEND_URL`    | ✅       | Frontend origin (CORS)    | `http://localhost:3000`       |

### Frontend (.env.local)

| Variable            | Optional | Description          | Example                     |
| ------------------- | -------- | -------------------- | --------------------------- |
| `REACT_APP_API_URL` | Optional | Backend API base URL | `http://localhost:5000/api` |

---

## 📡 API Documentation

### Authentication Endpoints

**POST /api/auth/register**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**POST /api/auth/login**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**GET /api/auth/me** (requires JWT token in header)

```
Authorization: Bearer <token>
```

### GitHub Endpoints

**GET /api/github/stats** — Get GitHub profile stats
**GET /api/github/repos** — Get recent repositories
**POST /api/github/username** — Update GitHub username

### Pomodoro Endpoints

**POST /api/pomodoro/start** — Start a session

```json
{
  "task": "Build feature X",
  "duration": 25
}
```

**PUT /api/pomodoro/:id/complete** — Mark session complete
**GET /api/pomodoro** — Get all sessions
**GET /api/pomodoro/stats/today** — Get today's stats

### Goals Endpoints

**POST /api/goals/today** — Set daily goals

```json
{
  "goals": ["Goal 1", "Goal 2", "Goal 3"]
}
```

**GET /api/goals/today** — Get today's goals
**PUT /api/goals/:goalId/toggle** — Toggle goal completion
**GET /api/goals/stats/weekly** — Get weekly completion stats

### Snippets Endpoints

**POST /api/snippets** — Create snippet

```json
{
  "title": "Debounce Function",
  "code": "function debounce(fn, delay) { ... }",
  "language": "javascript",
  "tags": ["utility", "performance"],
  "description": "Debounce implementation"
}
```

**GET /api/snippets** — Get all snippets
**GET /api/snippets/:id** — Get single snippet
**PUT /api/snippets/:id** — Update snippet
**DELETE /api/snippets/:id** — Delete snippet

### Energy Endpoints

**POST /api/energy/today** — Log energy

```json
{
  "focusLevel": 8,
  "mood": 7,
  "notes": "Great day!"
}
```

**GET /api/energy/today** — Get today's log
**GET /api/energy/weekly** — Get weekly history

---

## 📝 Testing the Application

### 1. Register & Login

- Go to `http://localhost:3000`
- Click "Register"
- Create an account
- Log in

### 2. Connect GitHub

- Add your GitHub username in settings
- Stats will auto-populate

### 3. Test Pomodoro

- Click "Pomodoro" tab
- Enter a task
- Click "New Session"
- Start timer

### 4. Add Goals

- Set 3 goals for today
- Check them off as you complete them

### 5. Log Energy

- Rate your focus (1-10)
- Rate your mood (1-10)
- Save log

### 6. Create Snippets

- Save useful code snippets
- Tag them for easy searching

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set environment variables:
   - `REACT_APP_API_URL=https://your-backend-url/api`
5. Deploy

### Backend (Render or Railway)

**Using Render:**

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Set environment variables from `.env`
5. Deploy

**Using Railway:**

1. Go to [railway.app](https://railway.app)
2. New Project → GitHub Repo
3. Add variables
4. Deploy

### MongoDB Atlas

- Already hosted — no deployment needed
- Keep your connection string secure (in `.env` only)

---

## 🐛 Troubleshooting

### Backend won't connect to MongoDB

- Check connection string in `.env`
- Verify IP whitelist in MongoDB Atlas (add `0.0.0.0/0` for dev)
- Ensure username/password don't have special chars (URL encode if needed)

### Frontend can't reach backend

- Verify backend is running on `http://localhost:5000`
- Check CORS settings in `backend/server.js`
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL

### GitHub API errors

- Check token is valid and has right scopes
- Verify `GITHUB_USERNAME` is correct
- Token may have rate limits (60 requests/hour unauthenticated)

### Port already in use

```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

---

## 📚 Additional Resources

- **React**: [react.dev](https://react.dev)
- **Express**: [expressjs.com](https://expressjs.com)
- **MongoDB**: [docs.mongodb.com](https://docs.mongodb.com)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **JWT**: [jwt.io](https://jwt.io)

---

## 🎯 Next Steps / Future Features

- [ ] LeetCode stats integration
- [ ] Weekly analytics dashboard
- [ ] Data export (CSV)
- [ ] Dark/Light theme toggle
- [ ] Mobile responsive improvements
- [ ] Push notifications
- [ ] Calendar view for goals
- [ ] Streak counter

---

## 📄 License

This project is open source. Feel free to use, modify, and share!

---

## 🤝 Contributing

Found a bug or have a feature idea? Create an issue or submit a PR!

---

**Happy coding! 🚀**

Built with ❤️ for developers, by developers.
