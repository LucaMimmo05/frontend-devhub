import { useState } from "react";
import "../styles/login.css";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            login(data.accessToken, data.refreshToken);
            console.log("Login successful", data);
            navigate("/");
        } else {
            console.error("Login failed", data);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img src="src/assets/DevHub-logo.svg" alt="" height={30} width={120} />
                <div className="form-cont">
                    <h1>Welcome Back!</h1>
                    <form action="" className="login-form" onSubmit={handleSubmit}>
                        <InputField
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <InputField
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign in</button>
                        <p onClick={() => navigate("/register")}>
                            Don&apos;t have an account? <span>Sign Up</span>
                        </p>
                    </form>
                </div>
            </div>
            <div className="login-right">
                <h1 className="typing typing-1">Code, build, repeat.</h1>
                <h1 className="typing typing-2">DevHub is where ideas come to life.</h1>
            </div>
        </div>
    );
};

export default Login;
