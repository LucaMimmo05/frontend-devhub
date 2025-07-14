import { useState } from "react";
import InputField from "../../components/InputField";
import "./register.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        const response = await axios.post("http://localhost:8080/api/auth/register", {
            name: name,
            surname: surname,
            email: email,
            password: password,
        });

        if (response.status === 201) {
            const data = await response.data;

            login(data.accessToken, data.refreshToken);
            navigate("/");
        }
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <img src="src/assets/devHub-logo-white.svg" alt="" height={30} width={120} className="register-logo" />
                <h1 className="typing typing-1">Code, build, repeat.</h1>
                <h1 className="typing typing-2">DevHub is where ideas come to life.</h1>
            </div>
            <div className="register-right">
                <div className="form-cont">
                    <h1>Welcome to DevHub!</h1>
                    <form className="register-cont" onSubmit={handleSubmit}>
                        <InputField
                            type={"text"}
                            placeholder={"Name"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <InputField
                            type={"text"}
                            placeholder={"Surname"}
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                        <InputField
                            type={"email"}
                            placeholder={"Email"}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <InputField
                            type={"password"}
                            placeholder={"Password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="submit">Register</button>
                        <p onClick={() => navigate("/login")}>
                            Already registered? <span>Sign In</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
