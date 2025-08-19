import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

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
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<AuthRedirect />} />
                    <Route path="/register" element={<AuthRedirect />} />
                </Routes>
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
