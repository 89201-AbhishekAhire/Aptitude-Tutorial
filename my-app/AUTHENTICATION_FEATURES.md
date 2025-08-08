# Authentication Features

## Overview
The application now includes a comprehensive authentication system that maintains user and admin session state across navigation and displays personalized information on visited pages.

## Key Features

### 1. Persistent Session Management
- User and admin login sessions are stored in localStorage
- Sessions persist across page refreshes and browser restarts
- Automatic session restoration on app startup

### 2. Dynamic Navigation Bar
- **When not logged in**: Shows Login, Register, and Admin links
- **When user is logged in**: Shows welcome message, Dashboard link, and Logout button
- **When admin is logged in**: Shows admin welcome message, Admin Dashboard link, and Logout button

### 3. Personalized Page Content
- **Home Page**: Displays welcome message with user/admin name when logged in
- **Quiz Page**: Shows personalized messages during quiz taking
- **Topic Page**: Displays user-specific guidance for topic selection

### 4. Authentication Context
- Centralized state management using React Context
- Provides authentication state to all components
- Handles login/logout operations with localStorage persistence

## Test Credentials

### Regular Users
- **Email**: alice@example.com
- **Password**: password123

### Admin Users
- **Email**: admin@aptitude.com
- **Password**: admin123

## How It Works

1. **Login Flow**:
   - User enters credentials
   - System validates against users.json or adminUsers.json
   - On success, user data is stored in localStorage and context
   - User is redirected to appropriate dashboard

2. **Session Persistence**:
   - User data is automatically loaded from localStorage on app startup
   - No need to re-login after page refresh

3. **Navigation**:
   - Users can navigate between Home, Topic, and Quiz pages without losing session
   - Navbar adapts to show appropriate options based on authentication status

4. **Logout**:
   - Clears session data from localStorage and context
   - Redirects to appropriate login page

## Technical Implementation

- **AuthContext**: Manages global authentication state
- **localStorage**: Persists session data
- **useAuth Hook**: Provides authentication state to components
- **Conditional Rendering**: Shows different content based on authentication status

## Security Notes

- Passwords are stored in plain text (for demo purposes)
- In production, implement proper password hashing
- Consider implementing JWT tokens for better security
- Add session timeout functionality for enhanced security 