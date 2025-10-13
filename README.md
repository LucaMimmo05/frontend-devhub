# DevHub Frontend 🚀

A modern web application for project and task management with GitHub integration for developers.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Project Management**: Create, edit, and organize your development projects
- **Task Management**: Complete task management system with states and priorities
- **GitHub Integration**: Connect your repositories and monitor activity
- **Interactive Dashboard**: View statistics and recent activities
- **Calendar**: Plan and track project deadlines
- **Task Archive**: Archiving system for completed tasks
- **Authentication**: Secure login and registration system
- **Responsive Design**: Optimized interface for all devices
- **Tags System**: Organize projects and tasks with custom labels

## 🛠 Technologies

### Core

- **React 18.2.0** - UI Library
- **Vite 6.3.5** - Build tool and dev server
- **React Router DOM 6.20.0** - Routing and navigation

### Libraries

- **Axios 1.6.2** - HTTP client for API calls
- **React Spinners 0.17.0** - Loading indicators

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PropTypes** - Type checking for props

## 📦 Prerequisites

Before starting, make sure you have installed:

- **Node.js** (version 16.x or higher)
- **pnpm** (recommended package manager)
- **Git** (for version control)

Verify installation:

```bash
node --version
pnpm --version
git --version
```

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/LucaMimmo05/frontend-devhub.git
cd frontend-devhub
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

```bash
# Create a .env file in the project root
# See Configuration section for details
```

4. **Start the development server**

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# API Backend URL
VITE_API_BASE_URL=http://localhost:3000/api

# GitHub OAuth
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_REDIRECT_URI=http://localhost:5173/github/callback

# Other settings
VITE_APP_NAME=DevHub
```

### Backend Configuration

Make sure the backend is running and configured correctly. The frontend connects to the following APIs:

- `/api/auth` - Authentication
- `/api/projects` - Project management
- `/api/tasks` - Task management
- `/api/github` - GitHub integration
- `/api/commands` - Custom commands

## 🎯 Usage

### Login/Registration

1. Access the login page
2. Create a new account or login
3. You will be redirected to the dashboard

### Project Management

1. Click on "Projects" in the sidebar
2. Use the "+" button to create a new project
3. Fill in the details: name, description, color, tags
4. Manage your projects from the Projects view

### Task Management

1. Navigate to the "Tasks" section
2. Create new tasks with priorities and deadlines
3. Organize tasks by project
4. Archive completed tasks

### GitHub Integration

1. Go to the GitHub section
2. Connect your GitHub account
3. View and manage your repositories
4. Monitor development activity

## 📁 Project Structure

```
frontend-devhub/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and resources
│   │   ├── language/      # Programming language icons
│   │   └── sidebar/       # Sidebar icons
│   ├── components/        # Reusable React components
│   │   ├── AddButton.jsx
│   │   ├── Calendar.jsx
│   │   ├── ConnectGitHub.jsx
│   │   ├── InputField.jsx
│   │   ├── Project.jsx
│   │   ├── ProjectsModal.jsx
│   │   ├── RecentActivity.jsx
│   │   ├── RepositoryItem.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Task.jsx
│   │   ├── TasksModal.jsx
│   │   └── TasksTable.jsx
│   ├── context/           # Context API for state management
│   │   ├── AuthContext.jsx
│   │   ├── PageContext.jsx
│   │   ├── ProjectContext.jsx
│   │   └── TaskContext.jsx
│   ├── pages/             # Application pages/routes
│   │   ├── AuthPage.jsx
│   │   ├── Github.jsx
│   │   ├── GitHubCallBack.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProjectDetails.jsx
│   │   ├── Projects.jsx
│   │   ├── Tasks.jsx
│   │   └── TasksArchive.jsx
│   ├── service/           # API clients and configuration
│   │   ├── api.js
│   │   ├── commandApi.js
│   │   ├── config.js
│   │   ├── githubApi.js
│   │   ├── projectApi.js
│   │   └── taskApi.js
│   ├── styles/            # CSS modules/stylesheets
│   ├── utility/           # Helper functions
│   │   ├── darkencolor.js
│   │   ├── dateformatter.js
│   │   ├── getimagefromlanguage.js
│   │   └── rendercolor.js
│   ├── App.jsx            # Root component
│   ├── App.css
│   ├── main.jsx           # Entry point
│   └── index.css
├── eslint.config.js       # ESLint configuration
├── vite.config.js         # Vite configuration
├── package.json
└── README.md
```

## 📜 Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code with Prettier
pnpm format
```

## 🔌 API Integration

The application uses Axios for API calls. Configuration is centralized in `src/service/config.js`.

### API Modules

- **api.js** - Base HTTP client
- **projectApi.js** - Project CRUD operations
- **taskApi.js** - Task CRUD operations
- **githubApi.js** - GitHub integration
- **commandApi.js** - Custom commands

### Usage Example

```javascript
import { getProjects, createProject } from "./service/projectApi";

// Fetch projects
const projects = await getProjects();

// Create new project
const newProject = await createProject({
    name: "My Project",
    description: "Project description",
    color: "#FF5733",
});
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines

- Follow existing code conventions
- Write clear and descriptive commit messages
- Test changes before committing
- Update documentation if necessary

## 📝 License

This project is distributed under the MIT License. See the `LICENSE` file for more details.

## 👨‍💻 Author

**Luca Mimmo**

- GitHub: [@LucaMimmo05](https://github.com/LucaMimmo05)

## 🙏 Acknowledgments

- React Team for the excellent framework
- Vite for the blazing fast build tool
- All open source contributors

---

⭐️ If this project was helpful to you, leave a star on GitHub!

