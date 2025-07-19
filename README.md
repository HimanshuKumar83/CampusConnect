# Brainstorm Club Website - VS Code Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- VS Code with recommended extensions
- Git (optional)

## Quick Start

### 1. Project Setup
```bash
# Clone or download the project
# Open the project folder in VS Code
code brainstorm-club-website

# Install dependencies for both client and server
cd server
npm install

cd ../client
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/college-club?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Get your connection string
5. Replace the MONGODB_URI in `.env`

### 4. Running the Application

#### Option 1: Using VS Code Terminal (Recommended)
Open two terminals in VS Code:

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

#### Option 2: Using Package Scripts
```bash
# Install concurrently globally
npm install -g concurrently

# Run both server and client simultaneously
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Test**: http://localhost:5000/api/test

## VS Code Recommended Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- MongoDB for VS Code

## Project Structure
```
brainstorm-club-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Main pages
│   │   ├── context/        # Auth context
│   │   ├── services/       # API services
│   │   └── ...
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── uploads/            # File uploads
│   └── server.js
├── .env                    # Environment variables
├── package.json            # Root package file
└── README.md
```

## API Endpoints
### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (admin)
- `PUT /api/announcements/:id` - Update announcement (admin)
- `DELETE /api/announcements/:id` - Delete announcement (admin)

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create activity (admin)
- `PUT /api/activities/:id` - Update activity (admin)
- `DELETE /api/activities/:id` - Delete activity (admin)

### Leadership
- `GET /api/leadership` - Get leadership members
- `POST /api/leadership` - Add member (admin)
- `PUT /api/leadership/:id` - Update member (admin)
- `DELETE /api/leadership/:id` - Delete member (admin)

## Testing with Postman
1. Import the API collection (create one from the endpoints above)
2. Set base URL: `http://localhost:5000/api`
3. For protected routes, include Authorization header: `Bearer <your-jwt-token>`
4. Test file uploads using form-data with image files

## Admin Access
Default admin credentials (create these in your database):
- Email: admin@brainstorm.edu
- Password: admin123
- Role: admin

## Troubleshooting

### Common Issues
1. **Port already in use**: Change PORT in .env or kill existing processes
2. **MongoDB connection failed**: Check your Atlas connection string and network access
3. **Module not found**: Run `npm install` in both client and server directories
4. **CORS errors**: Ensure the backend is running on port 5000

### VS Code Tips
- Use `Ctrl+Shift+P` to open command palette
- Install "Thunder Client" extension for API testing within VS Code
- Use "Live Server" extension for static file serving if needed
- Configure debugger for Node.js backend debugging

## Development Workflow
1. Start backend server first
2. Start frontend development server
3. Make changes and test in browser
4. Use browser dev tools for frontend debugging
5. Use VS Code debugger for backend debugging
6. Test API endpoints with Postman or Thunder Client

## File Upload Configuration
Images are stored in:
- Activities: `server/uploads/activities/`
- Events: `server/uploads/events/`
- Leadership: `server/uploads/leadership/`

Make sure these directories exist and have proper permissions.

## Security Notes
- Change JWT_SECRET in production
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add input validation and sanitization
- Use HTTPS in production

## Next Steps
1. Configure your MongoDB Atlas connection
2. Add sample data for testing
3. Customize the club information and branding
4. Deploy to a hosting service (Heroku, Vercel, etc.)