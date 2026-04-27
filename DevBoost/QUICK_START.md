# ⚡ Quick Start Guide

Get DevBoard running in 5 minutes!

## 1️⃣ Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend** (in new terminal):

```bash
cd frontend
npm install
```

---

## 2️⃣ Configure Environment

**Backend Setup:**

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/devboard
JWT_SECRET=your_random_secret_key_at_least_32_chars
GITHUB_TOKEN=ghp_your_github_token_here
GITHUB_USERNAME=your_github_username
```

**How to get values:**

- **MongoDB URI**: [mongodb.com/cloud](https://mongodb.com/cloud) → Create cluster → Copy connection string
- **GitHub Token**: [github.com/settings/tokens](https://github.com/settings/tokens) → Generate new token
- **JWT Secret**: Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 3️⃣ Run the Project

**Terminal 1 — Start Backend:**

```bash
cd backend
npm run dev
```

✅ Backend ready at `http://localhost:5000`

**Terminal 2 — Start Frontend:**

```bash
cd frontend
npm start
```

✅ Frontend opens at `http://localhost:3000`

---

## 4️⃣ First Steps in App

1. **Register** → Create an account
2. **Login** → Access dashboard
3. **Add GitHub username** → Stats auto-load
4. **Set today's goals**
5. **Start a Pomodoro session**
6. **Log your energy level**
7. **Save code snippets**

---

## 🆘 Quick Fixes

**Backend port in use:**

```bash
lsof -ti:5000 | xargs kill -9
```

**MongoDB connection error:**

- ✅ Check username/password in `.env`
- ✅ In MongoDB Atlas, add IP `0.0.0.0/0` to whitelist
- ✅ Restart backend server

**Frontend can't reach backend:**

- ✅ Ensure backend is running on port 5000
- ✅ Check `FRONTEND_URL` in `.env` matches frontend URL

---

## 📚 Full Documentation

See [README.md](./README.md) for complete setup, API docs, and deployment instructions.

---

**You're all set! Happy coding! 🚀**
