import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import GitHubCallback from "./pages/GitHubCallBack";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import BurgerMenu from "./components/BurgerMenu";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PageProvider } from "./context/PageContext";
import { ProjectProvider } from "./context/ProjectContext";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
import { TaskProvider } from "./context/TaskContext";
import TasksArchive from "./pages/TasksArchive";
import Github from "./pages/Github";
import Notes from "./pages/Notes";
import Commands from "./pages/Commands";
import Settings from "./pages/Settings";
import Loader from "./components/Loader";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ToastContainer";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <Loader color="#4A90E2" size={110} />;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AuthRedirect = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <Loader color="#4A90E2" size={110} />;

    return isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />;
};

const AppLayout = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const noSidebarRoutes = ["/login", "/register", "/github/callback"];

    return (
        <div
            className={`app-container ${
                isAuthenticated && !noSidebarRoutes.includes(location.pathname) ? "app-padding" : ""
            }`}
            style={{ display: "flex" }}
        >
            {isAuthenticated && !noSidebarRoutes.includes(location.pathname) && <Sidebar />}
            <div className="main-content" style={{ flex: 1 }}>
                {children}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <PageProvider>
                        <ProjectProvider>
                            <TaskProvider>
                                <AppLayout>
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={
                                                <ProtectedRoute>
                                                    <Home />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/projects"
                                            element={
                                                <ProtectedRoute>
                                                    <Projects />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/projects/:id"
                                            element={
                                                <ProtectedRoute>
                                                    <ProjectDetail />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/tasks"
                                            element={
                                                <ProtectedRoute>
                                                    <Tasks />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/tasks/archive"
                                            element={
                                                <ProtectedRoute>
                                                    <TasksArchive />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/github"
                                            element={
                                                <ProtectedRoute>
                                                    <Github />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/notes"
                                            element={
                                                <ProtectedRoute>
                                                    <Notes />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/commands"
                                            element={
                                                <ProtectedRoute>
                                                    <Commands />
                                                </ProtectedRoute>
                                            }
                                        />

                                        <Route
                                            path="/settings"
                                            element={
                                                <ProtectedRoute>
                                                    <Settings />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route path="/github/callback" element={<GitHubCallback />} />
                                        <Route path="/login" element={<AuthRedirect />} />
                                        <Route path="/register" element={<AuthRedirect />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </AppLayout>
                                <ToastContainer />
                            </TaskProvider>
                        </ProjectProvider>
                    </PageProvider>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
};

export default App;
