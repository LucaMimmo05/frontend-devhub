import { useEffect } from "react";
import "../styles/github.css";
import { getGithubUserInfo, getRecentActivities, getRepos } from "../service";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { ClipLoader } from "react-spinners";
import { getImageFromLanguage } from "../utility/getimagefromlanguage";
import RecentActivity from "../components/RecentActivity";

const Github = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState([]);
    const [allRepos, setAllRepos] = useState([]);
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
                const [userInfoResponse, reposResponse, allReposResponse, activitiesResponse] = await Promise.all([
                    getGithubUserInfo(token).catch(error => {
                        console.error("Error fetching GitHub user info:", error);

                        return null;
                    }),
                    getRepos("updated", 3).catch(error => {
                        console.error("Error fetching GitHub repositories:", error);

                        return [];
                    }),
                    getRepos("updated", 100).catch(error => {
                        console.error("Error fetching all GitHub repositories:", error);

                        return [];
                    }),
                    getRecentActivities(token, 3).catch(error => {
                        console.error("Error fetching recent activities:", error);

                        return [];
                    }),
                ]);

                setUserInfo(userInfoResponse);
                setRepos(reposResponse);
                setAllRepos(allReposResponse);
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
                        <div className="github-left-cont">
                            <div className="top-repositories">
                                <h2>Top Repositories</h2>
                                <div className="repository-cont">
                                    {repos && repos.length > 0 ? (
                                        repos.map(repo => (
                                            <div className="repository box" key={repo.id}>
                                                <div className="repo-left">
                                                    <div className="repository-language">
                                                        <img
                                                            src={getImageFromLanguage(repo.language)}
                                                            alt=""
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </div>
                                                    <div className="repo-info">
                                                        <h3>{repo.name}</h3>
                                                        <p>{repo.description || "No description available."}</p>
                                                    </div>
                                                </div>
                                                <Button
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
                            {allRepos && allRepos.length > 0 && (
                                <div className="repository-insights-content">
                                    <h2>Repository Insights</h2>
                                    <div className="repository-insights box">
                                        <div className="insights-grid">
                                            <div className="insight-card">
                                                <div className="insight-icon">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12
                                                            17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="insight-data">
                                                    <h4>
                                                        {allRepos.reduce(
                                                            (sum, repo) => sum + (repo.stargazers_count || 0),
                                                            0
                                                        )}
                                                    </h4>
                                                    <p>Total Stars</p>
                                                </div>
                                            </div>
                                            <div className="insight-card">
                                                <div className="insight-icon">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M6 3V15M18 9V21M12 3C12 3 12 9 6 9M12 3C12 3 12 9 18 9"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="insight-data">
                                                    <h4>
                                                        {allRepos.reduce(
                                                            (sum, repo) => sum + (repo.forks_count || 0),
                                                            0
                                                        )}
                                                    </h4>
                                                    <p>Total Forks</p>
                                                </div>
                                            </div>
                                            <div className="insight-card">
                                                <div className="insight-icon">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12
                                                            19 20 12 20C5 20 1 12 1 12Z"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="3"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="insight-data">
                                                    <h4>
                                                        {allRepos.reduce(
                                                            (sum, repo) => sum + (repo.watchers_count || 0),
                                                            0
                                                        )}
                                                    </h4>
                                                    <p>Total Watchers</p>
                                                </div>
                                            </div>
                                            <div className="insight-card">
                                                <div className="insight-icon">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4 7V4H20V7"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M9 20H15"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M12 4V20"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8 7L12 11L16 7"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="insight-data">
                                                    <h4>
                                                        {
                                                            [
                                                                ...new Set(
                                                                    allRepos.map(repo => repo.language).filter(Boolean)
                                                                ),
                                                            ].length
                                                        }
                                                    </h4>
                                                    <p>Languages</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                    <Button
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
