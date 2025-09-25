import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import GitHubCallback from "./pages/GitHubCallBack";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PageProvider } from "./context/PageContext";
import { ProjectProvider } from "./context/ProjectContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <PageProvider>
                    <ProjectProvider>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="/github/callback" element={<GitHubCallback />} />
                            <Route path="/login" element={<AuthRedirect />} />
                            <Route path="/register" element={<AuthRedirect />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ProjectProvider>
                </PageProvider>
            </Router>
        </AuthProvider>
    );
};

const AuthRedirect = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />;
};

export default App;
