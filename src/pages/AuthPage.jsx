import { useState } from "react";
import "../styles/authpage.css";
import InputField from "../components/InputField";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import { validateEmail, validatePassword, validateRequired, validateLength, parseBackendErrors } from "../utility/validation";

const AuthPage = () => {
    const location = useLocation();
    const [isLoginMode, setIsLoginMode] = useState(location.pathname === "/login");
    const [isAnimating, setIsAnimating] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginErrors, setLoginErrors] = useState({});

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerErrors, setRegisterErrors] = useState({});

    const navigate = useNavigate();
    const { login } = useAuth();
    const { showSuccess, showError, showInfo } = useToast();

    const toggleMode = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        window.setTimeout(() => {
            const newMode = !isLoginMode;

            setIsLoginMode(newMode);
            navigate(newMode ? "/login" : "/register", { replace: true });
            window.setTimeout(() => {
                setIsAnimating(false);
            }, 50);
        }, 300);
    };

    const handleLoginSubmit = async e => {
        e.preventDefault();
        
        // Client-side validation
        const errors = {};
        const emailError = validateEmail(loginEmail);
        const passwordError = validatePassword(loginPassword);
        
        if (emailError) errors.email = emailError;
        if (passwordError) errors.password = passwordError;
        
        if (Object.keys(errors).length > 0) {
            setLoginErrors(errors);
            showError("Please fix the validation errors");
            return;
        }
        
        setLoginErrors({});
        
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email: loginEmail,
                password: loginPassword,
            });

            if (response.status === 200) {
                const data = response.data;

                login(data.accessToken, data.refreshToken);
                console.log("Login successful", data);
                showSuccess("Login successful! Welcome back.");
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error);
            
            // Parse backend validation errors
            const backendErrors = parseBackendErrors(error);
            if (Object.keys(backendErrors).length > 0) {
                setLoginErrors(backendErrors);
            }
            
            if (error.response) {
                console.error("Error status:", error.response.status);
                console.error("Error data:", error.response.data);
                if (error.response.status === 401) {
                    showError("Invalid email or password. Please try again.");
                } else {
                    showError(`Login error: ${error.response.data.message || "Unknown error"}`);
                }
            } else {
                showError("Connection error. Please try again later.");
            }
        }
    };

    const handleRegisterSubmit = async e => {
        e.preventDefault();
        
        // Client-side validation
        const errors = {};
        const nameError = validateRequired(name, "Name") || validateLength(name, 2, 50, "Name");
        const surnameError = validateRequired(surname, "Surname") || validateLength(surname, 2, 50, "Surname");
        const emailError = validateEmail(registerEmail);
        const passwordError = validatePassword(registerPassword);
        
        if (nameError) errors.name = nameError;
        if (surnameError) errors.surname = surnameError;
        if (emailError) errors.email = emailError;
        if (passwordError) errors.password = passwordError;
        
        if (Object.keys(errors).length > 0) {
            setRegisterErrors(errors);
            showError("Please fix the validation errors");
            return;
        }
        
        setRegisterErrors({});

        const registerData = {
            name: name,
            surname: surname,
            email: registerEmail,
            password: registerPassword,
        };

        console.log("Attempting registration with data:", registerData);

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", registerData);

            console.log("Registration response:", response);

            // Controlla se la registrazione è avvenuta con successo (201 o 200)
            if (response.status === 201 || response.status === 200) {
                const data = response.data;

                if (data.accessToken && data.refreshToken) {
                    login(data.accessToken, data.refreshToken);
                    showSuccess("Registration successful! Welcome to DevHub.");
                    navigate("/");
                } else {
                    // Se non ci sono i token, probabilmente l'utente è stato creato ma dobbiamo fare login
                    showSuccess("Registration complete! You can now log in.");
                    setIsLoginMode(true);
                    navigate("/login", { replace: true });
                }
            }
        } catch (error) {
            console.error("Register failed", error);
            
            // Parse backend validation errors
            const backendErrors = parseBackendErrors(error);
            if (Object.keys(backendErrors).length > 0) {
                setRegisterErrors(backendErrors);
            }
            
            if (error.response) {
                console.error("Error status:", error.response.status);
                console.error("Error data:", error.response.data);
                console.error("Full error response:", error.response);

                const errorMessage = error.response.data?.message || error.response.data?.error || "Unknown error";

                if (error.response.status === 409) {
                    // Se l'errore è 409 ma l'utente è stato comunque creato, suggeriamo di fare login
                    showInfo("User may already exist. Try logging in with these credentials.");
                    setIsLoginMode(true);
                    navigate("/login", { replace: true });
                    // Copia l'email nel campo login per comodità
                    setLoginEmail(registerEmail);
                } else if (error.response.status === 400) {
                    showError(`Invalid data: ${errorMessage}`);
                } else {
                    showError(`Registration error (${error.response.status}): ${errorMessage}`);
                }
            } else {
                showError("Connection error. Please try again later.");
            }
        }
    };

    return (
        <div className="auth-container">
            <div
                className={`auth-main ${
                    isLoginMode ? "login-mode" : "register-mode"
                } ${isAnimating ? "animating" : ""}`}
            >
                <div className="auth-left-section">
                    {isLoginMode ? (
                        <div className="form-container">
                            <img src="src/assets/devHub-logo.svg" alt="" height={30} width={120} />
                            <div className="form-cont">
                                <h1>Welcome Back!</h1>
                                <form className="auth-form" onSubmit={handleLoginSubmit}>
                                    <InputField
                                        type="email"
                                        placeholder="Email"
                                        value={loginEmail}
                                        onChange={e => setLoginEmail(e.target.value)}
                                        error={!!loginErrors.email}
                                        errorMessage={loginErrors.email}
                                        required
                                    />
                                    <InputField
                                        type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={e => setLoginPassword(e.target.value)}
                                        error={!!loginErrors.password}
                                        errorMessage={loginErrors.password}
                                        required
                                        minLength={6}
                                    />
                                    <button type="submit">Sign in</button>
                                    <p onClick={toggleMode}>
                                        Don&apos;t have an account? <span>Sign Up</span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="blue-section">
                            <img
                                src="src/assets/devHub-logo-white.svg"
                                alt=""
                                height={30}
                                width={120}
                                className="register-logo"
                            />
                            <h1 className="typing typing-1">Code, build, repeat.</h1>
                            <h1 className="typing typing-2">DevHub is where ideas come to life.</h1>
                        </div>
                    )}
                </div>

                <div className="auth-right-section">
                    {isLoginMode ? (
                        <div className="blue-section">
                            <h1 className="typing typing-1">Code, build, repeat.</h1>
                            <h1 className="typing typing-2">DevHub is where ideas come to life.</h1>
                        </div>
                    ) : (
                        <div className="form-container">
                            <div className="form-cont">
                                <h1>Welcome to DevHub!</h1>
                                <form className="auth-form register-form" onSubmit={handleRegisterSubmit}>
                                    <InputField
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        error={!!registerErrors.name}
                                        errorMessage={registerErrors.name}
                                        required
                                        minLength={2}
                                        maxLength={50}
                                    />
                                    <InputField
                                        type="text"
                                        placeholder="Surname"
                                        value={surname}
                                        onChange={e => setSurname(e.target.value)}
                                        error={!!registerErrors.surname}
                                        errorMessage={registerErrors.surname}
                                        required
                                        minLength={2}
                                        maxLength={50}
                                    />
                                    <InputField
                                        type="email"
                                        placeholder="Email"
                                        value={registerEmail}
                                        onChange={e => setRegisterEmail(e.target.value)}
                                        error={!!registerErrors.email}
                                        errorMessage={registerErrors.email}
                                        required
                                    />
                                    <InputField
                                        type="password"
                                        placeholder="Password"
                                        value={registerPassword}
                                        onChange={e => setRegisterPassword(e.target.value)}
                                        error={!!registerErrors.password}
                                        errorMessage={registerErrors.password}
                                        required
                                        minLength={6}
                                    />
                                    <button type="submit">Register</button>
                                    <p onClick={toggleMode}>
                                        Already registered? <span>Sign In</span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
