import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GitHubCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("GitHubCallback mounted");

        // eslint-disable-next-line no-undef
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        console.log("Code from URL:", code);

        if (code) {
            const data = localStorage.getItem("userData");
            const userData = JSON.parse(data);

            const userId = parseInt(userData.id, 10);

            const payload = { code, userId };

            console.log("Payload: ", payload);

            axios
                .post("http://localhost:8080/github/callback", payload)
                .then(res => {
                    console.log("Backend response:", res.data);
                    localStorage.setItem("githubToken", res.data.accessToken);
                    // eslint-disable-next-line no-undef
                    window.dispatchEvent(new Event("githubLogin"));
                    navigate("/");
                })
                .catch(err => {
                    console.error("GitHub OAuth error:", err);
                    navigate("/");
                });
        } else {
            console.error("Nessun code trovato nell'URL");
        }
    }, [navigate]);

    return <div>Logging in with GitHub...</div>;
};

export default GitHubCallback;
