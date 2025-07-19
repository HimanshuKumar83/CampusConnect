# VS Code Setup Instructions for Brainstorm Club Website

## Step-by-Step Setup Guide

### 1. Open Project in VS Code
```bash
# Open VS Code
code .

# Or open the folder through VS Code File menu
File → Open Folder → Select your project directory
```

### 2. Install Required Extensions
In VS Code, press `Ctrl+Shift+X` to open Extensions panel and install:
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Prettier - Code formatter** - Automatic code formatting
- **Auto Rename Tag** - Rename HTML/JSX tags
- **Thunder Client** - API testing (alternative to Postman)
- **MongoDB for VS Code** - MongoDB connection and queries

### 3. Configure VS Code Settings
Create `.vscode/settings.json` in your project root:
```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.associations": {
    "*.js": "javascriptreact"
  }
}
```

### 4. Set Up Terminal Configuration
1. Open VS Code terminal: `Ctrl+` ` (backtick)
2. You can split terminal: `Ctrl+Shift+5`
3. Or create new terminal: `Ctrl+Shift+` ` 

### 5. Running the Application

#### Terminal Setup (Recommended)
**Split your terminal into two panes:**

**Left Terminal - Backend:**
```bash
cd server
node server.js
```

**Right Terminal - Frontend:**
```bash
cd client
npm start
```

#### Alternative: Use VS Code Tasks
Create `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "node",
      "args": ["server.js"],
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "npm",
      "args": ["start"],
      "options": {
        "cwd": "${workspaceFolder}/client"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Start Both",
      "dependsOrder": "parallel",
      "dependsOn": ["Start Backend", "Start Frontend"]
    }
  ]
}
```

Then run: `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Both"

### 6. Debugging Setup
Create `.vscode/launch.json` for debugging:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server/server.js",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "restart": true,
      "runtimeExecutable": "node"
    }
  ]
}
```

### 7. Environment Variables
Make sure your `.env` file is in the project root:
```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-jwt-secret-key
PORT=5000
NODE_ENV=development
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 8. File Structure in VS Code
Your explorer should look like:
```
📁 brainstorm-club-website/
├── 📁 .vscode/
│   ├── settings.json
│   ├── tasks.json
│   └── launch.json
├── 📁 client/
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── 📁 context/
│   │   └── 📁 services/
│   └── package.json
├── 📁 server/
│   ├── 📁 models/
│   ├── 📁 routes/
│   ├── 📁 middleware/
│   ├── 📁 uploads/
│   └── server.js
├── .env
├── package.json
└── README.md
```

### 9. Testing API with Thunder Client (VS Code)
1. Install Thunder Client extension
2. Click Thunder Client icon in sidebar
3. Create new request
4. Set URL: `http://localhost:5000/api/test`
5. Click Send

### 10. Git Integration (Optional)
If using Git:
```bash
git init
git add .
git commit -m "Initial commit"
```

VS Code will show Git changes in the Source Control panel (`Ctrl+Shift+G`).

### 11. Useful VS Code Shortcuts
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+P` - Command palette
- `Ctrl+` ` - Toggle terminal
- `Ctrl+Shift+E` - Explorer panel
- `Ctrl+/` - Comment/uncomment
- `Alt+Shift+F` - Format document
- `F5` - Start debugging

### 12. Package Management
Install dependencies:
```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies  
cd ../client
npm install
```

### 13. Live Development
- Backend: Uses nodemon for auto-restart (if installed)
- Frontend: React development server with hot reload
- Both will automatically refresh when you save files

### 14. Port Configuration
Default ports:
- Frontend: 3000
- Backend: 5000

If ports are busy, you can change them:
- Backend: Update PORT in .env
- Frontend: It will prompt for alternative port

### 15. MongoDB Atlas Connection
1. Go to MongoDB Atlas dashboard
2. Create cluster
3. Create database user
4. Get connection string
5. Replace in .env file
6. Restart backend server

## Common VS Code Commands

### Terminal Commands:
```bash
# Backend
cd server && node server.js

# Frontend
cd client && npm start

# Install packages
npm install package-name

# Check running processes
lsof -i :5000  # Check port 5000
lsof -i :3000  # Check port 3000
```

### VS Code Integrated Terminal Tips:
- Split terminal: `Ctrl+Shift+5`
- New terminal: `Ctrl+Shift+` `
- Switch between terminals: `Ctrl+PageUp/PageDown`
- Kill terminal: `Ctrl+C` then close

This setup gives you a complete development environment in VS Code with debugging, API testing, and efficient workflow management.