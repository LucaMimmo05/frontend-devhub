# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server on port 5173 with auto-open
- `npm run build` - Build for production using Vite
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint all JS/JSX files in src/ using ESLint
- `npm run format` - Format code using Prettier

### Package Manager
This project uses **npm** (not pnpm despite README mentioning it). Use npm commands.

### Backend Connection
The frontend connects to a backend API running on `http://localhost:8080`. Ensure the backend is running before testing API functionality. Key endpoints include:
- `/api/auth` - Authentication (login, refresh, verify)
- `/api/project` - Project CRUD operations
- `/api/task` - Task management
- `/github` - GitHub integration

## Architecture Overview

### State Management Architecture
The application uses **React Context API** for centralized state management with four main contexts:

1. **AuthContext** (`src/context/AuthContext.jsx`)
   - JWT token management (access & refresh tokens)
   - User authentication state
   - Automatic token refresh with Axios interceptors
   - User data extraction from JWT payload

2. **ProjectContext** (`src/context/ProjectContext.jsx`)
   - Project data fetching and state management
   - Current project selection

3. **TaskContext** (`src/context/TaskContext.jsx`) 
   - Task data management and state

4. **PageContext** (`src/context/PageContext.jsx`)
   - Page/navigation state management

### API Layer Structure
Centralized API layer in `src/service/`:
- `config.js` - Axios base configuration and interceptors
- `api.js` - Main API exports barrel file
- `projectApi.js` - Project CRUD operations
- `taskApi.js` - Task management API calls  
- `githubApi.js` - GitHub integration API
- `commandApi.js` - Custom commands API

All API calls use Bearer token authentication with automatic token refresh.

### Routing Architecture
Uses **React Router v6** with:
- Protected routes via `ProtectedRoute` component
- Authentication redirects via `AuthRedirect` component
- Layout wrapper `AppLayout` that conditionally renders sidebar
- Routes include: Home, Projects, Project Details, Tasks, Tasks Archive, GitHub, Notes, Commands

### Component Structure
- `src/components/` - Reusable UI components (Button, Calendar, Modal components, etc.)
- `src/pages/` - Route-level page components
- `src/utility/` - Helper functions (color utilities, date formatting, image mapping)

### Key Features
- **Project Management**: Full CRUD with color-coded organization and tags
- **Task Management**: Task creation, archiving, priority system
- **GitHub Integration**: OAuth integration with repository management
- **Authentication**: JWT-based auth with automatic token refresh
- **Responsive Design**: Mobile-optimized interface

## Code Style & Standards

### ESLint Configuration
The project uses a comprehensive ESLint setup with:
- Double quotes enforced
- 4-space indentation
- Max line length of 120 characters
- Arrow function preference
- Automatic Prettier integration
- React/JSX best practices

### File Naming
- Components use PascalCase (e.g., `AuthPage.jsx`)
- Utilities use camelCase (e.g., `dateformatter.js`)
- API files use camelCase with "Api" suffix (e.g., `projectApi.js`)

## Environment Configuration

### Required Environment Variables (.env)
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_REDIRECT_URI=http://localhost:5173/github/callback
VITE_APP_NAME=DevHub
```

### Development Prerequisites  
- Node.js 16.x or higher
- npm package manager
- Backend API server running on port 8080

## Working with the Codebase

### Adding New Features
1. Create components in appropriate directories (`components/` for reusable, `pages/` for routes)
2. Add API functions to relevant service files
3. Update context providers if new global state is needed
4. Follow existing authentication patterns for protected features

### API Integration Patterns
All API calls should:
- Use functions from `src/service/` modules
- Handle authentication automatically via Axios interceptors  
- Follow the established error handling patterns
- Return promises that components can await

### Authentication Flow
- JWT tokens stored in localStorage
- Automatic refresh via context and interceptors
- User data extracted from JWT payload and cached
- GitHub token management for repository integration

The authentication system automatically handles token expiration and refresh, so components can focus on business logic rather than auth state management.