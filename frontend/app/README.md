# Frontend - DSA Learning Platform

## Project Overview

This is the frontend application for a DSA (Data Structures & Algorithms) learning platform. It provides an interactive interface for users to learn, practice, and track their progress on DSA topics.

---

## Tech Stack

### Core Framework & Libraries

- **React** (v19.2.5) - UI library for building interactive components
- **React DOM** (v19.2.5) - React rendering library for web
- **React Router DOM** (v7.9.5) - Client-side routing for navigation between pages
- **Vite** (v8.0.10) - Fast build tool and development server

### HTTP Client

- **Axios** (v1.16.0) - HTTP client for API requests to backend

### Build & Development Tools

- **@vitejs/plugin-react** (v6.0.1) - Vite plugin for React Fast Refresh
- **Babel** (v7.29.0) - JavaScript compiler for JSX transformation
- **babel-plugin-react-compiler** (v1.0.0) - Compiler optimization plugin

### Code Quality & Linting

- **ESLint** (v10.2.1) - JavaScript linter
- **eslint-plugin-react-hooks** (v7.1.1) - React hooks linting rules
- **eslint-plugin-react-refresh** (v0.5.2) - React refresh linting
- **@eslint/js** (v10.0.1) - ESLint JavaScript configurations

### Type Support (Development)

- **@types/react** (v19.2.14) - TypeScript types for React
- **@types/react-dom** (v19.2.3) - TypeScript types for React DOM
- **globals** (v17.5.0) - Global type definitions

---

## Project Structure

```
frontend/app/
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
│
├── public/                      # Static assets
│
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Main app component with routing
│   ├── App.css                  # Global app styles
│   ├── index.css                # Global styles
│   │
│   ├── components/
│   │   └── ProblemCard.jsx      # Reusable problem card component
│   │
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # User registration page
│   │   ├── Dashboard.jsx        # Main dashboard with DSA topics
│   │   ├── Profile.jsx          # User profile page
│   │   └── Progress.jsx         # User progress tracking page
│   │
│   ├── assets/                  # Images, fonts, etc.
│   │
│   └── services/
│       └── api.js               # Axios instance and API calls
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

1. **Navigate to frontend directory:**

   ```bash
   cd frontend/app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The application will run on `http://localhost:5173` (Vite default)

---

## Pages & Components

### Pages

#### **Login Page** (`Login.jsx`)

- User login interface
- Email/username and password input
- Link to registration page
- Redirects to dashboard on successful login

#### **Register Page** (`Register.jsx`)

- User registration form
- Collects username, email, and password
- Password confirmation
- Validation and error handling
- Redirects to login after registration

#### **Dashboard** (`Dashboard.jsx`)

- Main page showing all DSA topics
- Grid/list view of problems
- Problem filtering and sorting
- Uses `ProblemCard` component to display topics

#### **Profile Page** (`Profile.jsx`)

- User profile information
- Display user stats
- Edit profile details
- Logout functionality

#### **Progress Page** (`Progress.jsx`)

- Track learning progress
- Statistics of solved problems
- Category-wise breakdown
- Visual charts/progress bars

### Components

#### **ProblemCard** (`ProblemCard.jsx`)

- Reusable card component for displaying DSA problems
- Shows problem title, difficulty, category
- "Start/Continue" button for problem action
- Solved status indicator

---

## Routing Structure

The app uses React Router with the following routes:

```
/                    → Login page (public)
/register            → Register page (public)
/topics              → Dashboard page (private - requires auth)
/profile             → Profile page (private - requires auth)
/progress            → Progress page (private - requires auth)
```

**Private Routes**: Protected by `PrivateRoute` component that checks for JWT token in localStorage.

---

## API Integration

### Axios Instance (`services/api.js`)

- Configured base URL: `http://localhost:5000/api`
- Automatically includes JWT token in Authorization header
- Handles request/response interceptors
- Centralized API call management

### Key API Calls

```javascript
// Authentication
POST /auth/register       // Register new user
POST /auth/login          // Login user
GET  /auth/profile        // Get user profile

// Problems
GET  /problem             // Get all problems
GET  /problem/:id         // Get specific problem
POST /problem             // Create problem (admin)
```

---

## Local Storage

- **token** - JWT authentication token (stored on login)
- Used for authenticating subsequent API requests
- Cleared on logout

---

## Styling

- **App.css** - Application-wide styles
- **index.css** - Global styles and CSS resets
- Component-specific styling can be added as needed
- Responsive design for mobile and desktop

---

## Key Dependencies

| Package              | Version | Purpose           |
| -------------------- | ------- | ----------------- |
| react                | ^19.2.5 | UI library        |
| react-dom            | ^19.2.5 | React rendering   |
| react-router-dom     | ^7.9.5  | Routing           |
| axios                | ^1.16.0 | HTTP requests     |
| vite                 | ^8.0.10 | Build tool        |
| @vitejs/plugin-react | ^6.0.1  | Vite React plugin |
| eslint               | ^10.2.1 | Code linting      |

---

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Authentication Flow

1. User enters credentials on Login page
2. Frontend sends request to `/api/auth/login`
3. Backend returns JWT token
4. Token stored in localStorage
5. Token sent in `Authorization: Bearer <token>` header for protected requests
6. `PrivateRoute` component checks for token before rendering protected pages
7. On logout, token is removed from localStorage

---

## Features

- ✅ User authentication (Login/Register)
- ✅ Dashboard with DSA topics
- ✅ Problem cards with difficulty levels
- ✅ User profile management
- ✅ Progress tracking
- ✅ Protected routes (requires authentication)
- ✅ Responsive UI
- ✅ Real-time API integration

---

## Component Hierarchy

```
App
├── Routes
│   ├── Login (public)
│   ├── Register (public)
│   ├── PrivateRoute
│   │   ├── Dashboard
│   │   │   └── ProblemCard (multiple)
│   │   ├── Profile
│   │   └── Progress
```

---

## Configuration Files

### `vite.config.js`

- Vite build configuration
- React plugin setup
- Development server settings

### `eslint.config.js`

- ESLint rules configuration
- React-specific linting rules
- Code quality standards

### `.gitignore`

- Excludes `node_modules/`, `dist/`, etc.

---

## Build & Deployment

### Production Build

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

### Preview

```bash
npm run preview
```

Preview production build locally.

---

## Troubleshooting

### Port Already in Use

- Vite default port: 5173
- Change port: `npm run dev -- --port 3000`

### API Connection Issues

- Verify backend is running on port 5000
- Check network tab in browser dev tools
- Ensure CORS is enabled on backend

### Auth Issues

- Clear localStorage and login again
- Check token expiration
- Verify JWT secret matches backend

### Build Errors

- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Clear `.vite/` cache

---

## Best Practices

- Use `api.js` for all API calls (centralized management)
- Store auth token only in localStorage (consider HttpOnly cookies for security)
- Use `PrivateRoute` for protected pages
- Import CSS files in component files
- Use descriptive component names
- Keep components small and reusable

---

## Backend Integration

Frontend connects to backend at:

```
http://localhost:5000/api
```

Ensure backend is running before starting frontend development.

---

## Support

For issues or questions, contact the development team.

---

## 📦 Project Dependencies Summary

### Production Dependencies (4)

- react
- react-dom
- react-router-dom
- axios

### Dev Dependencies (13)

- Vite & plugins
- Babel & compiler
- ESLint & plugins
- TypeScript types

**Total**: 17 packages for a modern, performant React application.
