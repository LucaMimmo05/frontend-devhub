import { useEffect } from "react";
import "../styles/github.css";
import { getGithubUserInfo, getRecentActivities, getRepos } from "../service";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddButton from "../components/AddButton";
import { ClipLoader } from "react-spinners";
import { getImageFromLanguage } from "../utility/getimagefromlanguage";
import RecentActivity from "../components/RecentActivity";

const Github = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchAllGithubData = async () => {
            const token = localStorage.getItem(`githubToken_${user?.id}`);

            if (!token || !user?.id) {
                setLoading(false);

                return;
            }

            setLoading(true);

            try {
                // Esegui tutte le chiamate API in parallelo
                const [userInfoResponse, reposResponse, activitiesResponse] = await Promise.all([
                    getGithubUserInfo(user.id, token).catch(error => {
                        console.error("Error fetching GitHub user info:", error);

                        return null;
                    }),
                    getRepos(user.id, "updated", 3).catch(error => {
                        console.error("Error fetching GitHub repositories:", error);

                        return [];
                    }),
                    getRecentActivities(user.id, token, 3).catch(error => {
                        console.error("Error fetching recent activities:", error);

                        return [];
                    }),
                ]);

                // Aggiorna tutti gli stati dopo che tutte le chiamate sono completate
                setUserInfo(userInfoResponse);
                setRepos(reposResponse);
                setActivities(activitiesResponse);
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllGithubData();
    }, [user?.id]);

    return (
        <div className="github">
            {loading ? (
                <div className="github-loader">
                    <ClipLoader color="#4A90E2" size={60} />
                </div>
            ) : (
                <>
                    <div className="github-left">
                        <div className="title">
                            <h1>Github</h1>
                            <p>Stay connected with your GitHub activity.</p>
                        </div>
                        <div className="top-repositories">
                            <h2>Top Repositories</h2>
                            <div className="repository-cont">
                                {repos && repos.length > 0 ? (
                                    repos.map(repo => (
                                        <div className="repository box" key={repo.id}>
                                            <div className="repo-left">
                                                <div className="repository-language">
                                                    <img src={getImageFromLanguage(repo.language)} alt="" />
                                                </div>
                                                <div className="repo-info">
                                                    <h3>{repo.name}</h3>
                                                    <p>{repo.description || "No description available."}</p>
                                                </div>
                                            </div>
                                            <AddButton
                                                type={"View Repo"}
                                                onClick={() => window.open(repo.html_url, "_blank")}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No GitHub account connected.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="github-right">
                        <div className="github-profile box">
                            {userInfo ? (
                                <>
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
                                    <AddButton
                                        type={"View Profile"}
                                        onClick={() => window.open(userInfo?.htmlUrl, "_blank")}
                                    />
                                </>
                            ) : (
                                <p>No GitHub account connected.</p>
                            )}
                        </div>
                        <div className="github-recent-activities">
                            <h2>Recent Activities</h2>
                            <div className="github-recent-activities-cont">
                                {activities && activities.length > 0 ? (
                                    activities.map((activity, index) => (
                                        <RecentActivity key={index} activity={activity} />
                                    ))
                                ) : (
                                    <p>No recent activities.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Github;
