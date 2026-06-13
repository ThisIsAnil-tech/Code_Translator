================================================================================
                    SMART CODE TRANSLATOR - ENVIRONMENT SETUP GUIDE
================================================================================

This guide will help you collect all required API keys and credentials for both
Client and Server .env files.

================================================================================
                            PART 1: CLIENT .env FILE
================================================================================

File Location: client/.env

Required Variables:
------------------
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here


STEP 1.1: Get Google OAuth Client ID
-------------------------------------

1. Go to https://console.cloud.google.com/
2. Sign in with your Google account
3. Create a new project OR select existing project:
   - Click project dropdown at top
   - Click "New Project"
   - Name it "Smart Code Translator"
   - Click "Create"

4. Enable Google+ API (required for sign-in):
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

5. Configure OAuth Consent Screen:
   - Go to "APIs & Services" → "OAuth consent screen"
   - User Type: Select "External" → Click "Create"
   - App name: "Smart Code Translator"
   - User support email: Your email
   - Developer contact: Your email
   - Click "Save and Continue"
   - Skip scopes (click "Save and Continue")
   - Add test users: Add your email
   - Click "Save and Continue"

6. Create OAuth Client ID:
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Smart Code Translator Client"
   - Authorized JavaScript origins: 
     - http://localhost:5173
   - Authorized redirect URIs:
     - http://localhost:5173
   - Click "CREATE"

7. Copy Your Client ID:
   - A popup will show your Client ID
   - Copy it (looks like: xxxxxxxxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com)
   - Paste it in VITE_GOOGLE_CLIENT_ID

Your client/.env file should look like:
----------------------------------------
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com


================================================================================
                            PART 2: SERVER .env FILE
================================================================================

File Location: server/.env

Required Variables:
------------------
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id_here
GEMINI_API_KEY=your_gemini_api_key_here


STEP 2.1: Get MongoDB Connection String
----------------------------------------

Option A: MongoDB Atlas (Cloud - Recommended)
-----------------------------------------------
1. Go to https://www.mongodb.com/atlas
2. Sign up / Sign in
3. Create a new cluster (Free tier is fine)
4. Wait for cluster creation (1-3 minutes)
5. Click "Connect" on your cluster
6. Select "Drivers"
7. Copy the connection string (looks like: mongodb+srv://username:password@cluster.mongodb.net/)
8. Replace <password> with your database user password
9. Add database name at the end: /smart_code_translator

Example: mongodb+srv://admin:myPassword123@cluster0.abcde.mongodb.net/smart_code_translator

Option B: Local MongoDB
-----------------------
1. Install MongoDB locally from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Connection string: mongodb://localhost:27017/smart_code_translator


STEP 2.2: Generate JWT Secret
------------------------------

Option A: Generate Random Strong Secret (Recommended)
-------------------------------------------------------
Open terminal and run one of these commands:

For Windows PowerShell:
    -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

For Mac/Linux Terminal:
    openssl rand -base64 32

OR use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Option B: Create Your Own
--------------------------
Create a long, complex string with:
- Uppercase & lowercase letters
- Numbers
- Special characters
Minimum 32 characters

Example: 8xK!pLqR2mN9vWz5cF7jH3tY1bG6dA4eC


STEP 2.3: Get Google Client ID (Same as Step 1.1)
--------------------------------------------------
Use the same Google Client ID you created for the client.
Paste it in GOOGLE_CLIENT_ID


STEP 2.4: Get Gemini API Key
----------------------------

1. Go to https://aistudio.google.com/
2. Sign in with your Google account
3. Click "Get API Key" button
4. Click "Create API Key"
5. Select or create a project
6. Copy the generated API key (looks like: AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxx)
7. Paste it in GEMINI_API_KEY

Important: Gemini API is free with usage limits. For production, check pricing.


================================================================================
                    FINAL .env FILES - COMPLETE EXAMPLES
================================================================================

CLIENT .env (client/.env):
================================================================================
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
================================================================================


SERVER .env (server/.env):
================================================================================
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://admin:myPassword123@cluster0.abcde.mongodb.net/smart_code_translator
JWT_SECRET=8xK!pLqR2mN9vWz5cF7jH3tY1bG6dA4eC
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
================================================================================


================================================================================
                        VERIFICATION CHECKLIST
================================================================================

Before running the application, verify:

□ Client .env file created in client/ folder
□ VITE_API_URL points to correct backend URL
□ VITE_GOOGLE_CLIENT_ID is copied correctly (no extra spaces)

□ Server .env file created in server/ folder
□ MongoDB is running (Atlas or local)
□ MONGODB_URI has correct username and password
□ JWT_SECRET is strong (32+ characters)
□ GOOGLE_CLIENT_ID matches client's Google Client ID
□ GEMINI_API_KEY is valid and active

================================================================================
                        TROUBLESHOOTING
================================================================================

Issue: "MongoDB connection error"
Solution: Check MONGODB_URI format. If using Atlas, ensure network access allows
         your IP address (Add 0.0.0.0/0 in Network Access section)

Issue: "Invalid Google token"
Solution: Ensure GOOGLE_CLIENT_ID in server matches VITE_GOOGLE_CLIENT_ID in client

Issue: "Gemini API failed"
Solution: Check if API key is valid at https://aistudio.google.com/
          Check if billing is enabled if using paid tier

Issue: "JWT secret error"
Solution: Ensure JWT_SECRET is at least 32 characters long
          Remove any quotes around the secret

Issue: CORS error in browser
Solution: Check CLIENT_URL in server .env matches your frontend URL (port 5173)
          Restart server after changing .env

================================================================================
                            QUICK START COMMANDS
================================================================================

After setting up .env files:

Terminal 1 (Backend):
---------------------
cd server
npm install
npm run dev

Terminal 2 (Frontend):
---------------------
cd client
npm install
npm run dev

Open browser: http://localhost:5173

================================================================================