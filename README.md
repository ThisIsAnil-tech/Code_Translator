# Smart Code Translator 🚀

An AI-powered full-stack application that translates code between programming languages, analyzes complexity, optimizes performance, and explains code in beginner-friendly terms — powered by Google Gemini AI.

---

## ✨ Features

| Category | Features |
|---|---|
| **Authentication** | Email/password registration & login, Google SSO, JWT sessions (7-day), protected routes |
| **Code Operations** | Translate, analyze complexity, optimize, explain code with Monaco Editor |
| **History** | Auto-save operations, paginated browsing, detail view, delete & clear all |
| **UX** | Toast notifications, loading states, dark theme, responsive layout |

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, React Router, Axios, Monaco Editor, `@react-oauth/google`, React Hot Toast

**Backend:** Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, Google Auth Library, Gemini AI (`gemini-2.0-flash`)

---

## 📋 Prerequisites

- Node.js v18+
- MongoDB (Atlas free tier or local)
- Google Cloud account (for OAuth + Gemini API key)

---

## 🚀 Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/smart-code-translator.git
cd smart-code-translator

# 2. Install backend dependencies
cd server && npm install

# 3. Install frontend dependencies
cd ../client && npm install
```

---

## ⚙️ Environment Setup

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**`server/.env`**
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id_here
GEMINI_API_KEY=your_gemini_api_key_here
```

<details>
<summary><strong>How to get each credential</strong></summary>

**Google OAuth Client ID**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → APIs & Services → Credentials → OAuth Client ID (Web)
3. Add `http://localhost:5173` to Authorized JavaScript origins

**MongoDB URI**
- **Atlas:** Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas) → Connect → Drivers
- **Local:** `mongodb://localhost:27017/smart_code_translator`

**JWT Secret** — generate a strong key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Gemini API Key** — get it at [aistudio.google.com](https://aistudio.google.com/)

</details>

---

## ▶️ Running the App

```bash
# Terminal 1 — Backend
cd server && npm run dev
# → MongoDB Connected | Server running on port 5000

# Terminal 2 — Frontend
cd client && npm run dev
# → Local: http://localhost:5173
```

---

## 📡 API Reference

All code and history endpoints require `Authorization: Bearer <token>`.

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register with name, email, password |
| POST | `/api/auth/login` | Login with email, password |
| POST | `/api/auth/google` | Login with Google ID token |
| GET | `/api/auth/me` | Get current user info |
| POST | `/api/auth/logout` | Logout |

### Code Operations
| Method | Endpoint | Body |
|---|---|---|
| POST | `/api/code/translate` | `{ code, sourceLanguage, targetLanguage }` |
| POST | `/api/code/analyze` | `{ code, language }` |
| POST | `/api/code/optimize` | `{ code, language }` |
| POST | `/api/code/explain` | `{ code, language }` |

### History
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/history?page=1&limit=8` | Get paginated history |
| GET | `/api/history/:id` | Get single entry |
| DELETE | `/api/history/:id` | Delete single entry |
| DELETE | `/api/history/clear` | Clear all history |

---

## 🗂️ Project Structure

```
smart-code-translator/
├── client/
│   └── src/
│       ├── components/       # CodeEditor, Navbar, OutputPanel, etc.
│       ├── context/          # AuthContext
│       ├── pages/            # LoginPage, HomePage, HistoryPage
│       ├── services/         # Axios API wrappers
│       ├── constants/        # Languages, starter code
│       └── styles/           # CSS files
└── server/
    └── src/
        ├── config/           # DB, Google OAuth, Gemini setup
        ├── controllers/      # Auth, code, history handlers
        ├── middleware/        # JWT auth, error handling
        ├── models/           # User, History schemas
        ├── routes/           # Route definitions
        ├── services/         # Business logic + Gemini integration
        └── utils/            # JWT helpers, response parsers
```

---

## 🗄️ Database Schema

**User**
```js
{ googleId, email, name, password, picture, lastLogin, createdAt }
```

**History**
```js
{ userId, type, inputCode, sourceLanguage, targetLanguage, output, createdAt }
// type: "translate" | "analyze" | "optimize" | "explain"
```

---

## 🔐 Auth Flow

1. **Email/Password** — bcrypt hashing → JWT generation → token stored in `localStorage`
2. **Google SSO** — Google ID token → verified by `google-auth-library` → upsert user → JWT
3. **Protected routes** — `ProtectedRoute` component checks `AuthContext`; backend middleware verifies JWT on every request

---

## 🤖 AI Features

All operations are powered by `gemini-2.0-flash`. Prompts enforce structured output:

- **Translate** — Preserves logic, uses idiomatic patterns, includes imports
- **Analyze** — Returns `{ timeComplexity, spaceComplexity, explanation }` as JSON
- **Optimize** — Returns `{ optimizedCode, suggestions }` as JSON
- **Explain** — Returns beginner-friendly `{ explanation }` as JSON

---

## 🚢 Deployment

| Service | Platform |
|---|---|
| Backend | [Render.com](https://render.com) — Root: `server`, Start: `npm start` |
| Frontend | [Netlify](https://netlify.com) or [Vercel](https://vercel.com) — Root: `client`, Build: `npm run build` |
| Database | MongoDB Atlas (add `0.0.0.0/0` to Network Access for Render) |

> **Netlify note:** Add a `_redirects` file with `/* /index.html 200` to support React Router on page refresh.

---

## 🔧 Troubleshooting

| Problem | Solution |
|---|---|
| MongoDB connection error | Check `MONGODB_URI`; whitelist your IP in Atlas |
| CORS error | Ensure `CLIENT_URL` in server `.env` matches frontend URL exactly |
| JWT invalid | Clear `localStorage`, re-login; verify `JWT_SECRET` is consistent |
| Google login fails | Check `GOOGLE_CLIENT_ID` matches in both `.env` files; verify authorized origins |
| Gemini empty response | Validate `GEMINI_API_KEY`; check token limits |
| 404 on page refresh (deployed) | Add `_redirects` file for Netlify; Vercel handles this automatically |

---

## 🗺️ Roadmap

- [ ] More languages: Go, Rust, TypeScript, Swift, Kotlin
- [ ] Dark/light theme toggle
- [ ] Download translated code as file
- [ ] Side-by-side diff for optimization
- [ ] Batch translation
- [ ] VS Code extension

---

## 📄 License

MIT — free for personal and commercial use.

---

*Built with ❤️ using React, Express, MongoDB, and Google Gemini AI.*
