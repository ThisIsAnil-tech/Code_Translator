================================================================================
                    SMART CODE TRANSLATOR - COMPLETE DOCUMENTATION
================================================================================

A full-stack AI-powered application that helps developers translate code between 
programming languages, analyze complexity, optimize performance, and get 
beginner-friendly explanations - all powered by Google Gemini AI.

================================================================================
                              TABLE OF CONTENTS
================================================================================

1.  Project Overview
2.  Features
3.  Technology Stack
4.  Architecture Diagram
5.  Prerequisites
6.  Installation Guide
7.  Environment Setup
8.  Running the Application
9.  API Documentation
10. Project Structure
11. Database Schema
12. Authentication Flow
13. AI Features Explained
14. Testing Guide
15. Deployment Guide
16. Troubleshooting
17. Future Enhancements
18. Support & Contact

================================================================================
                           1. PROJECT OVERVIEW
================================================================================

Smart Code Translator is a production-ready full-stack application that solves 
the problem of跨语言开发 (cross-language development). It allows developers to:

- Translate code between 5+ programming languages
- Analyze time and space complexity with Big-O notation
- Get AI-powered optimization suggestions
- Receive beginner-friendly code explanations
- Save and browse operation history

The application uses Google Gemini AI (gemini-2.0-flash) for intelligent code 
processing, JWT for secure authentication, MongoDB for data persistence, and 
Monaco Editor (the editor behind VS Code) for professional code editing.

================================================================================
                              2. FEATURES
================================================================================

Authentication (Part 1):
------------------------
✓ User Registration - Create account with name, email, password
✓ Email/Password Login - Secure authentication with bcrypt hashing
✓ Google SSO - One-click sign-in using Google OAuth 2.0
✓ JWT Sessions - Stateless authentication with 7-day expiry
✓ Protected Routes - Only logged-in users can access translator
✓ Auto-login - Stay logged in across page refreshes

Code Operations (Part 2):
-------------------------
✓ Code Translation - Convert between C, C++, C#, Java, Python
✓ Complexity Analysis - Get time & space complexity with explanations
✓ Code Optimization - Receive improved code with suggestions
✓ Code Explanation - Understand code in beginner-friendly plain English
✓ Monaco Editor - Professional code editor with syntax highlighting
✓ Swap Languages - One-click swap between source and target languages
✓ Copy Output - Copy translation/optimization results to clipboard

History Management:
-------------------
✓ Auto-save - Every operation automatically saved to database
✓ Paginated History - Browse past operations (8 items per page)
✓ Detail View - See full input code and output for any entry
✓ Delete Entry - Remove individual history entries
✓ Clear All - Delete entire history with confirmation
✓ Type Filtering - View by operation type (translate, analyze, etc.)

User Experience:
----------------
✓ Toast Notifications - Success/error messages with react-hot-toast
✓ Loading States - Spinners during API calls
✓ Responsive Layout - Works on different screen sizes
✓ Dark Theme - Easy on eyes for long coding sessions
✓ Keyboard Friendly - Tab navigation, copy shortcuts

================================================================================
                           3. TECHNOLOGY STACK
================================================================================

Frontend (client/):
-------------------
Framework:     React 18.3.1
Build Tool:    Vite 5.3.4
Routing:       React Router DOM 6.26.0
HTTP Client:   Axios 1.7.2
UI Components: Custom CSS (no external UI libraries)
Code Editor:   Monaco Editor 4.6.0 (VS Code's editor)
Auth:          @react-oauth/google 0.12.1
Notifications: React Hot Toast 2.4.1

Backend (server/):
------------------
Runtime:       Node.js (v18+)
Framework:     Express 4.19.2
Database:      MongoDB with Mongoose 8.5.1
Auth:          JWT (jsonwebtoken 9.0.2) + bcryptjs 2.4.3
OAuth:         Google Auth Library 9.11.0
AI:            Google Gemini AI 0.2.0 (gemini-2.0-flash)
Security:      CORS, Helmet (implied), Environment variables

DevOps:
--------
Version Control: Git
Environment:     dotenv 16.4.5
Dev Server:      Nodemon 3.1.4 (auto-restart on changes)

================================================================================
                          4. ARCHITECTURE DIAGRAM
================================================================================

┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (React + Vite)                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  LoginPage  │  │  HomePage   │  │ HistoryPage │  │   Navbar    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                │                 │
│         └────────────────┼────────────────┼────────────────┘                 │
│                          │                │                                   │
│                   ┌──────▼────────────────▼──────┐                           │
│                   │      AuthContext (Context)    │                           │
│                   │    (user, login, logout)      │                           │
│                   └──────┬────────────────┬──────┘                           │
│                          │                │                                   │
│                   ┌──────▼────────────────▼──────┐                           │
│                   │      Axios Interceptor        │                           │
│                   │   (Auto-attach JWT token)     │                           │
│                   └──────┬────────────────┬──────┘                           │
│                          │                │                                   │
└──────────────────────────┼────────────────┼───────────────────────────────────┘
                           │                │
                    HTTP Requests      HTTP Responses
                    (with JWT token)   (JSON)
                           │                │
┌──────────────────────────┼────────────────┼───────────────────────────────────┐
│                          ▼                │                                   │
│                         SERVER (Express + MongoDB)                            │
│                          │                │                                   │
│                   ┌──────▼────────────────▼──────┐                           │
│                   │      Auth Middleware          │                           │
│                   │   (Verify JWT token)          │                           │
│                   └──────┬────────────────┬──────┘                           │
│                          │                │                                   │
│         ┌────────────────┼────────────────┼────────────────┐                 │
│         │                │                │                │                 │
│    ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐     ┌────▼────┐           │
│    │  Auth   │      │   Code    │     │  History  │     │  Error  │           │
│    │Routes   │      │  Routes   │     │  Routes   │     │ Handler │           │
│    └────┬────┘      └─────┬─────┘     └─────┬─────┘     └────────┘           │
│         │                  │                 │                                │
│    ┌────▼────┐        ┌─────▼─────┐     ┌─────▼─────┐                         │
│    │ Controllers │    │Controllers│     │Controllers│                         │
│    └────┬────┘        └─────┬─────┘     └─────┬─────┘                         │
│         │                    │                 │                               │
│    ┌────▼────┐          ┌─────▼─────┐     ┌─────▼─────┐                        │
│    │Services │          │ Services  │     │ Services  │                        │
│    └────┬────┘          └─────┬─────┘     └─────┬─────┘                        │
│         │                      │                 │                              │
│    ┌────▼────┐            ┌─────▼─────┐          │                              │
│    │  User   │            │  Gemini   │          │                              │
│    │ Model   │            │    AI     │          │                              │
│    └────┬────┘            └─────┬─────┘          │                              │
│         │                        │                │                              │
│    ┌────▼────┐              ┌─────▼─────┐    ┌─────▼─────┐                       │
│    │ MongoDB │              │  Google   │    │  History  │                       │
│    │Database │              │  Gemini   │    │  Model    │                       │
│    └────────┘              └───────────┘    └───────────┘                       │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘

Data Flow for Code Translation:
-------------------------------
1. User writes code in Monaco Editor
2. Selects source language (Python) and target language (Java)
3. Clicks "Run" button
4. Frontend makes POST /api/code/translate with JWT token
5. Auth middleware verifies token, attaches user to request
6. Code controller validates input
7. Translation service builds prompt and calls Gemini AI
8. Gemini returns translated code
9. History service saves operation to MongoDB (fire and forget)
10. Response sent back to frontend
11. OutputPanel renders translated code in read-only editor

================================================================================
                           5. PREREQUISITES
================================================================================

Before installing, ensure you have:

Software Requirements:
---------------------
- Node.js (v18 or higher) - https://nodejs.org/
- npm (v9 or higher) or yarn - Comes with Node.js
- MongoDB - Either:
  * MongoDB Atlas (Cloud - Free tier)
  * MongoDB Community (Local installation)
- Git - https://git-scm.com/
- A code editor (VS Code recommended)

Account Requirements:
---------------------
- Google Account (for OAuth and Gemini API)
- MongoDB Account (if using Atlas)
- GitHub Account (optional, for version control)

Knowledge Requirements:
-----------------------
- Basic JavaScript/React knowledge
- Understanding of REST APIs
- Familiarity with environment variables

================================================================================
                           6. INSTALLATION GUIDE
================================================================================

Step 1: Clone the Repository
----------------------------
```bash
git clone https://github.com/yourusername/smart-code-translator.git
cd smart-code-translator
```

Step 2: Install Backend Dependencies
------------------------------------
```bash
cd server
npm install
```

This installs:
- express, cors, dotenv - Web framework
- mongoose - MongoDB ODM
- bcryptjs, jsonwebtoken - Authentication
- google-auth-library - Google OAuth
- @google/genai - Gemini AI integration

Step 3: Install Frontend Dependencies
-------------------------------------
```bash
cd ../client
npm install
```

This installs:
- react, react-dom - Core React
- react-router-dom - Routing
- axios - HTTP requests
- @monaco-editor/react - Code editor
- @react-oauth/google - Google sign-in
- react-hot-toast - Notifications

Step 4: Set Up Environment Variables
------------------------------------
Create .env files as shown in Section 7.

Step 5: Verify Installation
---------------------------
```bash
# In server directory
npm run dev
# Should show: "Server is running on port 5000" and "MongoDB Connected"

# In client directory (new terminal)
npm run dev
# Should show: "VITE v5.3.4 ready in xxx ms" and "Local: http://localhost:5173/"
```

================================================================================
                           7. ENVIRONMENT SETUP
================================================================================

Creating .env Files:

Client .env (client/.env):
--------------------------
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Server .env (server/.env):
--------------------------
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id_here
GEMINI_API_KEY=your_gemini_api_key_here
```

Getting Each Credential:

1. Google OAuth Client ID:
   - Go to https://console.cloud.google.com/
   - Create new project → "Smart Code Translator"
   - APIs & Services → Credentials → Create Credentials
   - OAuth Client ID → Web application
   - Authorized origins: http://localhost:5173
   - Copy the Client ID (use same for both client and server)

2. MongoDB Connection String:
   Option A (Atlas):
   - Go to https://www.mongodb.com/atlas
   - Create cluster (free tier)
   - Click "Connect" → "Drivers"
   - Copy connection string: mongodb+srv://username:password@cluster.mongodb.net/dbname
   
   Option B (Local):
   - Install MongoDB Community
   - Connection string: mongodb://localhost:27017/smart_code_translator

3. JWT Secret:
   Generate a strong secret (32+ characters):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. Gemini API Key:
   - Go to https://aistudio.google.com/
   - Click "Get API Key"
   - Create API key in Google Cloud
   - Copy the key (starts with AIza)

================================================================================
                        8. RUNNING THE APPLICATION
================================================================================

Development Mode:

Terminal 1 (Backend):
--------------------
```bash
cd server
npm run dev
```
Expected output:
```
MongoDB Connected: cluster0.abcde.mongodb.net
Server is running on port 5000
```

Terminal 2 (Frontend):
---------------------
```bash
cd client
npm run dev
```
Expected output:
```
VITE v5.3.4 ready in 234 ms
➜ Local: http://localhost:5173/
➜ Network: use --host to expose
```

Open browser to: http://localhost:5173

Production Build:

Backend:
--------
```bash
cd server
npm start
```

Frontend:
---------
```bash
cd client
npm run build
# Serve the dist folder with any static server
npx serve dist
```

Default Ports:
--------------
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017 (local)

================================================================================
                           9. API DOCUMENTATION
================================================================================

Base URL: http://localhost:5000/api

Authentication Endpoints (Public):
----------------------------------

POST /api/auth/register
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "60d5ec9f1c2d4c3a5c8e9f7a",
      "email": "john@example.com",
      "name": "John Doe",
      "picture": ""
    }
  }
}

POST /api/auth/login
Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}
Response: Same as register

POST /api/auth/google
Request Body:
{
  "credential": "google_id_token_string"
}
Response: Same as register

GET /api/auth/me (Protected)
Headers: Authorization: Bearer <token>
Response:
{
  "success": true,
  "data": {
    "id": "60d5ec9f1c2d4c3a5c8e9f7a",
    "email": "john@example.com",
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastLogin": "2024-01-15T12:00:00.000Z"
  }
}

POST /api/auth/logout (Protected)
Response:
{
  "success": true,
  "data": { "message": "Logged out successfully" }
}

Code Operations Endpoints (All Protected):
------------------------------------------

POST /api/code/translate
Headers: Authorization: Bearer <token>
Request Body:
{
  "code": "print('Hello World')",
  "sourceLanguage": "python",
  "targetLanguage": "java"
}
Response:
{
  "success": true,
  "data": {
    "translatedCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
    "sourceLanguage": "python",
    "targetLanguage": "java"
  }
}

POST /api/code/analyze
Headers: Authorization: Bearer <token>
Request Body:
{
  "code": "function sum(arr) { let total = 0; for(let i=0; i<arr.length; i++) total += arr[i]; return total; }",
  "language": "javascript"
}
Response:
{
  "success": true,
  "data": {
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "The function iterates through the array once, making time linear to input size. Only a single variable is used for storage."
  }
}

POST /api/code/optimize
Headers: Authorization: Bearer <token>
Request Body:
{
  "code": "function findMax(arr) { let max = arr[0]; for(let i=1; i<arr.length; i++) { if(arr[i] > max) max = arr[i]; } return max; }",
  "language": "javascript"
}
Response:
{
  "success": true,
  "data": {
    "optimizedCode": "function findMax(arr) { return Math.max(...arr); }",
    "suggestions": "• Used built-in Math.max() which is optimized\n• Reduced loop overhead\n• More readable and concise"
  }
}

POST /api/code/explain
Headers: Authorization: Bearer <token>
Request Body:
{
  "code": "const doubled = numbers.map(n => n * 2);",
  "language": "javascript"
}
Response:
{
  "success": true,
  "data": {
    "explanation": "This code uses the map() method which creates a new array by applying a function to each element. For every number in the original array, it multiplies it by 2 and stores the result in a new array called 'doubled'."
  }
}

History Endpoints (All Protected):
----------------------------------

GET /api/history?page=1&limit=8
Headers: Authorization: Bearer <token>
Response:
{
  "success": true,
  "data": {
    "entries": [...],
    "totalEntries": 25,
    "totalPages": 4,
    "currentPage": 1
  }
}

GET /api/history/:id
Headers: Authorization: Bearer <token>
Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "type": "translate",
    "inputCode": "print('Hello')",
    "sourceLanguage": "python",
    "targetLanguage": "java",
    "output": { "translatedCode": "..." },
    "createdAt": "2024-01-15T12:00:00.000Z"
  }
}

DELETE /api/history/:id
Headers: Authorization: Bearer <token>
Response:
{
  "success": true,
  "data": { "message": "History entry deleted" }
}

DELETE /api/history/clear
Headers: Authorization: Bearer <token>
Response:
{
  "success": true,
  "data": {
    "message": "All history cleared",
    "deletedCount": 25
  }
}

Error Response Format:
---------------------
{
  "success": false,
  "message": "Error description here"
}

HTTP Status Codes:
-----------------
200 - Success
201 - Created (resource created)
400 - Bad Request (missing/invalid fields)
401 - Unauthorized (invalid/missing token)
404 - Not Found (route or resource not found)
409 - Conflict (email already exists)
500 - Internal Server Error

================================================================================
                           10. PROJECT STRUCTURE
================================================================================

smart-code-translator/
│
├── client/                          # Frontend Application
│   ├── .env                         # Environment variables
│   ├── .gitignore                   # Git ignore rules
│   ├── index.html                   # Entry HTML
│   ├── package.json                 # Dependencies
│   ├── vite.config.js               # Vite configuration
│   │
│   └── src/
│       ├── main.jsx                 # Entry point (providers)
│       ├── App.jsx                  # Routes setup
│       ├── index.css                # Global styles
│       │
│       ├── components/              # Reusable UI components
│       │   ├── CodeEditor.jsx       # Monaco editor wrapper
│       │   ├── LanguageSelector.jsx # Language dropdown
│       │   ├── OutputPanel.jsx      # Renders results by type
│       │   ├── ProtectedRoute.jsx   # Auth guard for routes
│       │   ├── HistoryList.jsx      # Paginated history list
│       │   └── Navbar.jsx           # Navigation bar
│       │
│       ├── context/                 # React Context
│       │   └── AuthContext.jsx      # Global auth state
│       │
│       ├── pages/                   # Page components
│       │   ├── LoginPage.jsx        # Login/Register + Google
│       │   ├── HomePage.jsx         # Code editor workspace
│       │   └── HistoryPage.jsx      # History browser
│       │
│       ├── services/                # API service functions
│       │   ├── api.js               # Axios instance + interceptor
│       │   ├── authService.js       # Auth API calls
│       │   ├── codeService.js       # Code operations API
│       │   └── historyService.js    # History API calls
│       │
│       ├── constants/               # Static data
│       │   └── languages.js         # Languages, starter code
│       │
│       └── styles/                  # CSS files
│           ├── components.css       # Shared component styles
│           ├── login.css            # Login page styles
│           ├── home.css             # Editor workspace
│           ├── history.css          # History page
│           ├── navbar.css           # Navigation bar
│           └── output.css           # Output panel styles
│
└── server/                          # Backend Application
    ├── .env                         # Environment variables
    ├── .gitignore                   # Git ignore rules
    ├── package.json                 # Dependencies
    ├── server.js                    # Entry point
    │
    └── src/
        ├── app.js                   # Express app setup
        │
        ├── config/                  # Configuration files
        │   ├── db.config.js         # MongoDB connection
        │   ├── google.config.js     # Google OAuth setup
        │   └── gemini.config.js     # Gemini AI setup
        │
        ├── constants/               # Static data
        │   ├── languages.js         # Supported languages
        │   └── prompts.js           # AI prompt templates
        │
        ├── controllers/             # Request handlers
        │   ├── auth.controller.js   # Auth endpoints
        │   ├── code.controller.js   # Code operations
        │   └── history.controller.js # History endpoints
        │
        ├── middleware/              # Express middleware
        │   ├── auth.middleware.js   # JWT verification
        │   └── error.middleware.js  # Global error handling
        │
        ├── models/                  # Mongoose schemas
        │   ├── User.model.js        # User schema
        │   └── History.model.js     # History schema
        │
        ├── routes/                  # API route definitions
        │   ├── index.js             # Route registry
        │   ├── auth.routes.js       # Auth routes
        │   ├── code.routes.js       # Code operation routes
        │   └── history.routes.js    # History routes
        │
        ├── services/                # Business logic
        │   ├── gemini.service.js    # Gemini API wrapper
        │   ├── auth.service.js      # Authentication logic
        │   ├── translation.service.js # Translation logic
        │   ├── complexity.service.js  # Complexity analysis
        │   ├── optimization.service.js # Optimization logic
        │   ├── explanation.service.js  # Explanation logic
        │   └── history.service.js   # History CRUD
        │
        └── utils/                   # Helper functions
            ├── jwt.utils.js         # JWT generation/verification
            └── prompts.utils.js     # Parse/clean AI responses

================================================================================
                           11. DATABASE SCHEMA
================================================================================

User Collection (Users):
------------------------
{
  "_id": ObjectId("60d5ec9f1c2d4c3a5c8e9f7a"),
  "googleId": "1234567890",           // Only for Google SSO users
  "email": "john@example.com",        // Unique, required
  "name": "John Doe",                 // Required
  "password": "$2a$10$X7r8kS...",    // Hashed (only for email/password)
  "picture": "https://...",           // Profile picture URL
  "lastLogin": ISODate("2024-01-15T12:00:00Z"),
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-15T12:00:00Z"),
  "__v": 0
}

Indexes:
- email: unique
- googleId: unique, sparse

History Collection:
-------------------
{
  "_id": ObjectId("60d5ec9f1c2d4c3a5c8e9f7b"),
  "userId": ObjectId("60d5ec9f1c2d4c3a5c8e9f7a"),  // Reference to User
  "type": "translate",                // enum: translate, analyze, optimize, explain
  "inputCode": "print('Hello')",
  "sourceLanguage": "python",
  "targetLanguage": "java",           // Only for translate
  "output": {                         // Mixed type - varies by operation
    "translatedCode": "System.out.println('Hello');"
  },
  "createdAt": ISODate("2024-01-15T12:00:00Z"),
  "updatedAt": ISODate("2024-01-15T12:00:00Z"),
  "__v": 0
}

Indexes:
- userId: indexed (for faster queries)

Output Shapes by Operation:
---------------------------
Translate: 
  { "translatedCode": "string" }

Analyze: 
  { 
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "explanation": "string"
  }

Optimize: 
  {
    "optimizedCode": "string",
    "suggestions": "string"
  }

Explain: 
  { "explanation": "string" }

================================================================================
                          12. AUTHENTICATION FLOW
================================================================================

Email/Password Registration Flow:
--------------------------------
1. User submits name, email, password
2. Server checks if email already exists
3. bcrypt hashes password (10 salt rounds)
4. User document created in MongoDB
5. JWT token generated with user id and email (expires in 7 days)
6. Token and user info returned to frontend
7. Frontend stores token in localStorage
8. AuthContext updates user state
9. User redirected to home page

Email/Password Login Flow:
-------------------------
1. User submits email and password
2. Server finds user by email
3. Checks if user has password (not Google-only)
4. bcrypt compares password with stored hash
5. Updates lastLogin timestamp
6. Generates new JWT token
7. Returns token and user info
8. Frontend stores token and updates state

Google SSO Flow:
---------------
1. User clicks "Continue with Google" button
2. Google OAuth popup appears
3. User selects Google account
4. Google returns ID token (credential)
5. Frontend sends credential to backend
6. Backend verifies token using google-auth-library
7. Extracts user info (googleId, email, name, picture)
8. findOneAndUpdate with upsert: true (creates or updates user)
9. Generates JWT token
10. Returns token and user info
11. Frontend stores token and updates state

JWT Token Structure:
-------------------
Header: { "alg": "HS256", "typ": "JWT" }
Payload: { 
  "id": "60d5ec9f1c2d4c3a5c8e9f7a",
  "email": "john@example.com",
  "iat": 1705315200,
  "exp": 1705920000
}
Signature: HMACSHA256(base64(header) + "." + base64(payload), JWT_SECRET)

Protected Route Flow:
--------------------
1. User navigates to protected route (/ or /history)
2. ProtectedRoute component checks AuthContext
3. If loading, shows spinner
4. If no user, redirects to /login
5. If user exists, renders children with Navbar

Auth Middleware Flow (Backend):
------------------------------
1. Request arrives at protected endpoint
2. authenticate middleware extracts Authorization header
3. Splits "Bearer <token>" to get token
4. verifyToken decodes and validates JWT
5. Finds user in database by id from token
6. Attaches user object to req.user
7. Calls next() to proceed to route handler

================================================================================
                          13. AI FEATURES EXPLAINED
================================================================================

How Gemini AI Integration Works:
-------------------------------
1. Service builds prompt using template from constants/prompts.js
2. Prompt includes rules for output format (plain code or JSON)
3. askGemini() sends prompt to gemini-2.0-flash model
4. Gemini returns text response
5. Response is cleaned using prompts.utils.js:
   - parseGeminiJSON() - Removes markdown, parses JSON
   - cleanCodeResponse() - Removes markdown, returns plain code
6. Structured result returned to controller

Translation Feature:
-------------------
Input: Python code → "def greet(): print('Hello')"
Prompt includes:
- Source language, target language
- Rules: preserve logic, use idiomatic patterns
- Include necessary imports
- No markdown wrapping

Output: Java code
```java
public class Main {
    public static void greet() {
        System.out.println("Hello");
    }
}
```

Complexity Analysis:
-------------------
Input: Any code
Prompt asks for JSON with:
- timeComplexity (Big-O notation)
- spaceComplexity (Big-O notation)
- explanation (under 200 words)

Output Example:
```json
{
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "explanation": "The algorithm iterates through the array once, making time linear to input size. Only a constant amount of extra space is used for variables."
}
```

Optimization Feature:
--------------------
Input: Suboptimal code
Prompt asks for JSON with:
- optimizedCode (improved version)
- suggestions (bullet points of improvements)

Output Example:
```json
{
  "optimizedCode": "const doubled = numbers.map(n => n * 2);",
  "suggestions": "• Used map() instead of for loop for clarity\n• Eliminated manual index tracking\n• More functional and readable"
}
```

Explanation Feature:
-------------------
Input: Any code
Prompt asks for JSON with:
- explanation (beginner-friendly, simple language)

Output Example:
```json
{
  "explanation": "This code uses the map() method which creates a new array by applying a function to each element. For every number in the array, it doubles it and stores the result in a new array."
}
```

================================================================================
                            14. TESTING GUIDE
================================================================================

Manual Testing Checklist:

Authentication Testing:
-----------------------
□ Register new user with valid data
□ Register with existing email (should fail)
□ Register with password < 6 chars (should fail)
□ Login with correct credentials
□ Login with wrong password (should fail)
□ Login with non-existent email (should fail)
□ Google Sign-In with valid Google account
□ Google Sign-In with cancelled popup
□ Access protected route without token (redirect to login)
□ Logout (token removed, redirect to login)
□ Refresh page - stays logged in

Code Translation Testing:
-------------------------
□ Translate Python to Java
□ Translate C to Python
□ Translate with invalid language (should error)
□ Translate empty code (should error)
□ Swap languages button works
□ Copy translated code works
□ Translation saved to history

Complexity Analysis Testing:
----------------------------
□ Analyze simple loop (should show O(n))
□ Analyze nested loops (should show O(n²))
□ Analyze recursive function
□ Empty code analysis (should error)
□ Result shows time, space, explanation
□ Analysis saved to history

Optimization Testing:
---------------------
□ Optimize inefficient code
□ Check suggestions are helpful
□ Optimized code is functional
□ Compare original vs optimized
□ Optimization saved to history

Explanation Testing:
--------------------
□ Explain simple function
□ Explain complex algorithm
□ Explanation is beginner-friendly
□ No technical jargon overload
□ Explanation saved to history

History Testing:
----------------
□ Operations appear in history list
□ Pagination works (prev/next buttons)
□ Click entry shows details
□ Delete entry removes from list
□ Clear all removes everything
□ Detail view shows input code correctly
□ Detail view shows output correctly by type

Edge Cases:
-----------
□ Very long code (5000+ lines)
□ Special characters in code
□ Empty strings
□ Network disconnection during API call
□ Expired JWT token
□ Concurrent operations

API Testing with cURL:
----------------------
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Translate (use token from login response)
curl -X POST http://localhost:5000/api/code/translate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"code":"print(\"Hello\")","sourceLanguage":"python","targetLanguage":"java"}'
```

================================================================================
                           15. DEPLOYMENT GUIDE
================================================================================

Deploying Backend to Render.com (Free Tier):
--------------------------------------------

1. Push code to GitHub repository

2. Sign up at https://render.com

3. Create new Web Service:
   - Connect GitHub repository
   - Name: smart-code-translator-api
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   - Root Directory: server

4. Add Environment Variables in Render Dashboard:
   - PORT: 5000 (Render will override)
   - CLIENT_URL: https://your-frontend-url.onrender.com
   - MONGODB_URI: Your MongoDB Atlas connection string
   - JWT_SECRET: Your secret key
   - JWT_EXPIRES_IN: 7d
   - GOOGLE_CLIENT_ID: Your Google Client ID
   - GEMINI_API_KEY: Your Gemini API key

5. Deploy

Deploying Frontend to Netlify/Vercel:
------------------------------------

Option A: Netlify
-----------------
1. Push code to GitHub

2. Sign up at https://netlify.com

3. Create new site:
   - Connect GitHub repository
   - Base directory: client
   - Build command: npm run build
   - Publish directory: client/dist

4. Add Environment Variables:
   - VITE_API_URL: https://your-backend-url.onrender.com/api
   - VITE_GOOGLE_CLIENT_ID: Your Google Client ID

5. Deploy

Option B: Vercel
----------------
1. Install Vercel CLI: npm i -g vercel

2. In client directory:
   ```bash
   vercel
   ```

3. Follow prompts to link project

4. Add environment variables in Vercel dashboard

Deploying MongoDB to Atlas (Cloud):
----------------------------------
1. Create MongoDB Atlas account
2. Create cluster (free tier)
3. Configure Network Access:
   - Add 0.0.0.0/0 (allow all IPs for Render)
   - Or add Render's IP range
4. Create database user
5. Get connection string

Google OAuth Production Setup:
-----------------------------
1. Go to Google Cloud Console
2. Add production URLs to Authorized JavaScript origins:
   - https://your-frontend-url.com
3. Add production redirect URIs:
   - https://your-frontend-url.com
4. Go to OAuth consent screen
5. Change publishing status to "In production"

Production Checklist:
--------------------
□ All environment variables set in production
□ MongoDB Atlas has proper IP whitelist
□ Google OAuth URLs updated for production
□ CORS configured with production frontend URL
□ JWT_SECRET is strong (not default)
□ API rate limiting implemented (recommended)
□ Error logging set up
□ Database backups configured
□ SSL enabled (automatic on Render/Netlify)

================================================================================
                           16. TROUBLESHOOTING
================================================================================

Common Issues and Solutions:

Issue 1: MongoDB Connection Error
---------------------------------
Error: "MongooseServerSelectionError: Could not connect to MongoDB"
Solution:
- Check MONGODB_URI in .env
- If using Atlas, check Network Access → Add 0.0.0.0/0
- Check username/password (no special characters that need encoding)
- Verify MongoDB service is running (for local)

Issue 2: CORS Error in Browser
-----------------------------
Error: "Access-Control-Allow-Origin" error
Solution:
- Check CLIENT_URL in server .env matches frontend URL
- Restart server after changing .env
- For production, ensure CORS allows your frontend domain

Issue 3: JWT Token Invalid
-------------------------
Error: "Invalid or expired token"
Solution:
- Clear localStorage and login again
- Check JWT_SECRET is same across all instances
- Verify JWT_EXPIRES_IN is valid format (e.g., "7d")
- Check system time is correct (token validation uses timestamps)

Issue 4: Google Login Fails
--------------------------
Error: "Invalid Google token" or popup doesn't close
Solution:
- Verify GOOGLE_CLIENT_ID matches in client and server
- Check Authorized JavaScript origins includes your URL
- For localhost: Ensure http://localhost:5173 is added
- Clear browser cache and cookies

Issue 5: Gemini API Returns Empty Response
-----------------------------------------
Error: "Gemini returned an empty response" or "Failed to parse AI response"
Solution:
- Check GEMINI_API_KEY is valid
- Verify API key has billing enabled (if beyond free tier)
- Check prompt is not too long (token limits)
- Try simpler code to test

Issue 6: Translation Returns Markdown Wrapped Code
-------------------------------------------------
Problem: Response includes ```python ... ```
Solution: Update prompts.js to include "Do NOT wrap in markdown code blocks"
The utility function cleanCodeResponse() should strip these

Issue 7: History Not Saving
--------------------------
Problem: Operations work but history is empty
Solution:
- Check user is authenticated (req.user exists)
- Verify History model is properly imported
- Check MongoDB connection (history collection should appear)
- Look for "Failed to save history" console errors

Issue 8: React Router Not Working on Refresh
-------------------------------------------
Problem: 404 error when refreshing page on deployed site
Solution: Configure server to redirect all routes to index.html
- For Netlify: Create _redirects file with "/* /index.html 200"
- For Vercel: This is handled automatically

Issue 9: Monaco Editor Not Loading
---------------------------------
Problem: Editor shows blank or "Loading editor..."
Solution:
- Check internet connection (Monaco loads from CDN)
- Verify @monaco-editor/react is installed
- Check for console errors about missing resources

Issue 10: Performance Issues with Large Code
-------------------------------------------
Problem: App slows down with 5000+ line code
Solution:
- Monaco Editor handles large files, but consider adding:
  - Debounced onChange events
  - Virtual scrolling for history list
  - Pagination for history (already implemented)

Debugging Commands:
------------------
```bash
# Check MongoDB connection
mongosh "your_connection_string"

# Test Gemini API directly
curl -X POST https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: YOUR_API_KEY" \
  -d '{"contents":[{"parts":[{"text":"Say hello"}]}]}'

# View logs (Render)
# Go to dashboard → Logs tab

# Clear localStorage (browser console)
localStorage.removeItem('token')
```

================================================================================
                         17. FUTURE ENHANCEMENTS
================================================================================

Planned Features for Future Versions:

Short Term (Next Release):
--------------------------
□ Add more languages (Go, Rust, TypeScript, Swift, Kotlin)
□ Dark/Light theme toggle
□ Code formatting (Prettier integration)
□ Download translated code as file
□ Share translation via link
□ Keyboard shortcuts (Ctrl+Enter to run)

Medium Term:
------------
□ Compare original vs optimized code side-by-side
□ Syntax error detection before sending to AI
□ Custom AI prompt customization
□ Batch translation (multiple files)
□ Export history as JSON/CSV
□ User settings page (default languages, theme)
□ Rate limiting per user

Long Term:
----------
□ Team collaboration (shared translations)
□ Version control for code snippets
□ AI model selection (Gemini Pro, Claude, GPT-4)
□ Code explanation in multiple languages
□ Voice input for code dictation
□ VS Code extension
□ Mobile app (React Native)
□ API key management for enterprise users
□ Custom prompt templates library

Community Suggestions:
---------------------
Feel free to contribute! Submit pull requests for:
- Bug fixes
- New features
- Documentation improvements
- Performance optimizations

================================================================================
                          18. SUPPORT & CONTACT
================================================================================

Getting Help:

Documentation:
-------------
- Read this README thoroughly
- Check comments in source code
- Review API documentation section

GitHub Issues:
-------------
- Report bugs at: https://github.com/yourusername/smart-code-translator/issues
- Feature requests welcome
- Provide steps to reproduce bugs

Common Resources:
----------------
- React Documentation: https://react.dev
- Express Documentation: https://expressjs.com
- MongoDB Documentation: https://docs.mongodb.com
- Gemini API Docs: https://ai.google.dev/gemini-api/docs
- JWT Documentation: https://jwt.io/introduction

License:
--------
MIT License - Free for personal and commercial use

Acknowledgments:
---------------
- Google for Gemini AI and OAuth
- MongoDB for database
- Microsoft for Monaco Editor
- React team for framework
- Express.js community

================================================================================
                    THANK YOU FOR USING SMART CODE TRANSLATOR!
================================================================================

If you find this project helpful, please star the repository and share with 
fellow developers. Happy coding! 🚀

================================================================================
```