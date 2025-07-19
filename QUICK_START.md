# 🚀 Quick Start Guide for VS Code

## 1. Open in VS Code
```bash
code .
```

## 2. Install Dependencies
Open VS Code terminal (`Ctrl+` `) and run:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies  
cd ../client
npm install
```

## 3. Configure MongoDB Atlas
Update `.env` file in the project root:
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mongodb.net/college-club?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

## 4. Start the Application

### Method 1: Split Terminal (Recommended)
In VS Code, split your terminal (`Ctrl+Shift+5`):

**Terminal 1 - Backend:**
```bash
cd server
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Method 2: Use VS Code Tasks
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select "Start Both (Backend + Frontend)"

## 5. Access Your Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Test Endpoint**: http://localhost:5000/api/test

## 6. Test with Postman/Thunder Client
Import these endpoints for testing:

**Base URL:** `http://localhost:5000/api`

**Test Endpoints:**
- GET `/test` - API health check
- POST `/auth/register` - User registration
- POST `/auth/login` - User login
- GET `/announcements` - Get announcements
- GET `/events` - Get events
- GET `/activities` - Get activities
- GET `/leadership` - Get leadership

## That's it! Your College Club website is now running! 🎉