client/start.md
markdown
# Smart Code Translator - Client Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on port 5000

## Installation

### 1. Install Dependencies

```bash
cd client
npm install
2. Environment Setup
Create a .env file in the client directory:

## .env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
3. Get Google OAuth Client ID
Go to Google Cloud Console

Create a new project or select existing one

Go to APIs & Services → Credentials

Click Create Credentials → OAuth 2.0 Client IDs

Choose application type: Web application

Add authorized JavaScript origins:

http://localhost:5173

Add authorized redirect URIs:

http://localhost:5173

Copy the Client ID and paste in .env file

4. Run Development Server
bash
npm run dev
The app will be available at: http://localhost:5173

Build for Production
bash
npm run build
The build output will be in the dist folder.

Preview Production Build
bash
npm run preview
Project Commands
Command	Description
npm run dev	Start development server
npm run build	Create production build
npm run preview	Preview production build locally
Folder Structure
text
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context (Auth)
│   ├── pages/          # Page components
│   ├── services/       # API service functions
│   ├── constants/      # Static data (languages)
│   └── styles/         # CSS files
├── .env                # Environment variables
├── index.html          # Entry HTML
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
Troubleshooting
CORS Issues
Make sure the backend is running on http://localhost:5000 and has CORS configured correctly.

Google Login Not Working
Verify VITE_GOOGLE_CLIENT_ID is correct

Ensure Google OAuth is properly configured in Cloud Console

Check that http://localhost:5173 is in authorized origins

API Connection Failed
Confirm backend is running

Check VITE_API_URL points to correct backend URL

Verify no firewall is blocking port 5000

Default Login Flow
Register → Name, Email, Password

Login → Email, Password

Google SSO → One-click sign in

After successful login, you'll be redirected to the code translator workspace.

Features Implemented
✅ User Registration

✅ Email/Password Login

✅ Google Sign-In

✅ Protected Routes

✅ JWT Authentication

✅ Code Editor (Monaco)

✅ Code Translation

✅ Complexity Analysis

✅ Code Optimization

✅ Code Explanation

✅ Operation History

text

---

**Now ready for `server` files! Give me the next folder.**