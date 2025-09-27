import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import GitHubCallback from "./pages/GitHubCallBack";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar"; // Assumendo tu abbia un componente Sidebar
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PageProvider } from "./context/PageContext";
import { ProjectProvider } from "./context/ProjectContext";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetails";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AuthRedirect = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />;
};

const AppLayout = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    // Pagine in cui non vogliamo la Sidebar
    const noSidebarRoutes = ["/login", "/register"];

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
        <AuthProvider>
            <Router>
                <PageProvider>
                    <ProjectProvider>
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

                                <Route path="/github/callback" element={<GitHubCallback />} />
                                <Route path="/login" element={<AuthRedirect />} />
                                <Route path="/register" element={<AuthRedirect />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </AppLayout>
                    </ProjectProvider>
                </PageProvider>
            </Router>
        </AuthProvider>
    );
};

export default App;
