import { useEffect } from "react";
import "../styles/github.css";
import { getGithubUserInfo } from "../service";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddButton from "../components/AddButton";

const Github = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem(`githubToken_${user?.id}`);

            if (!token) return;
            try {
                const response = await getGithubUserInfo(user?.id, token);

                setUserInfo(response);
            } catch (error) {
                console.error("Error fetching GitHub user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="github">
            <div className="github-left">
                <div className="title">
                    <h1>Github</h1>
                    <p>Stay connected with your GitHub activity.</p>
                </div>
            </div>

            <div className="github-right">
                <div className="github-profile box">
                    <img src={userInfo?.avatarUrl} alt={userInfo?.login} width={50} height={50} />
                    <div className="github-name">
                        <h2>{userInfo?.name}</h2>
                        <h3>@{userInfo?.login}</h3>
                    </div>
                    <div className="github-stats">
                        <div className="github-stat">
                            <h4>{userInfo?.followers}</h4>
                            <p>Followers</p>
                        </div>
                        <hr />
                        <div className="github-stat">
                            <h4>{Number(userInfo?.publicRepos + userInfo?.ownedPrivateRepos)}</h4>
                            <p>Repos</p>
                        </div>
                        <hr />
                        <div className="github-stat">
                            <h4>{userInfo?.following}</h4>
                            <p>Following</p>
                        </div>
                    </div>
                    <AddButton type={"View Profile"} onClick={() => window.open(userInfo?.htmlUrl, "_blank")} />
                </div>
            </div>
        </div>
    );
};

export default Github;
