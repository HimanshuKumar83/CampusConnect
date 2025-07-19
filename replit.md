# Brainstorm Club Website

## Project Overview
A comprehensive College Club Website for "Brainstorm Club/Project Club" featuring a modern, professional design with React frontend and Express/Node.js backend using MongoDB Atlas for data persistence.

## Architecture
- **Frontend**: React 18 with Bootstrap 5, React Router, Axios
- **Backend**: Express.js with MongoDB/Mongoose, JWT authentication, file uploads
- **Database**: MongoDB Atlas (user configurable)
- **Authentication**: JWT-based with role management (admin, member, moderator)

## Key Features
- ✅ Homepage with leadership photos and club information
- ✅ Announcements section with CRUD operations
- ✅ Events calendar with image uploads
- ✅ Activities showcase with project management
- ✅ Leadership profiles with social links
- ✅ Contact page with forms and information
- ✅ Admin dashboard for content management
- ✅ User authentication (login/register)
- ✅ File upload functionality for images
- ✅ Responsive design with Bootstrap

## Technical Implementation
- **File Structure**: Separate client and server directories
- **API Design**: RESTful endpoints with proper error handling
- **Security**: JWT tokens, password hashing with bcrypt
- **File Uploads**: Multer for handling images
- **Styling**: Bootstrap 5 with custom CSS for modern aesthetics

## Current Status
- ✅ Complete backend API with all CRUD operations
- ✅ All frontend pages and components created
- ✅ Authentication system implemented
- ✅ Admin dashboard with management interfaces
- 🔄 Server running on port 5000
- 🔄 Ready for MongoDB Atlas configuration

## Setup Instructions
1. **MongoDB Atlas**: Update MONGODB_URI in .env with your Atlas connection string
2. **Start Backend**: `cd server && node server.js`
3. **Start Frontend**: `cd client && npm start`
4. **Access Application**: Frontend at http://localhost:3000, API at http://localhost:5000

## Environment Configuration
The project includes:
- Environment variables in .env file
- Placeholder MongoDB URI (needs real Atlas credentials)
- JWT secret configuration
- Email settings for contact forms

## User Preferences
- File extensions: .jsx and .js as requested
- MongoDB Atlas for database
- Postman-testable API endpoints
- VS Code compatible structure

## Recent Changes
- ✅ Converted ES modules to CommonJS for Node.js compatibility
- ✅ Created all React components and pages
- ✅ Implemented complete backend API
- ✅ Added comprehensive admin dashboard
- ✅ Configured file upload functionality
- ✅ Set up authentication middleware

## Next Steps
1. Configure real MongoDB Atlas connection
2. Test all CRUD operations with Postman
3. Add sample data for demonstration
4. Deploy the application