import "../styles/recentactivity.css";
import Button from "./Button";
import { timeSince } from "../utility/dateformatter";

const RecentActivity = ({ activity }) => {
    const renderType = type => {
        switch (type) {
            case "PushEvent":
                return "Pushed to";
            case "PullRequestEvent":
                return "Opened a pull request in";
            case "IssuesEvent":
                return "Opened an issue in";
            case "ForkEvent":
                return "Forked";
            case "WatchEvent":
                return "Starred";
            case "CreateEvent":
                return "Created a repository";
            default:
                return type;
        }
    };

    const commitLinks =
        activity?.payload?.commits?.map(commit =>
            commit.url.replace("https://api.github.com/repos/", "https://github.com/").replace("/commits/", "/commit/")
        ) || [];

    const renderRepo = repo => {
        if (!repo) return null;
        const parts = repo.split("/");

        return parts[1];
    };

    return (
        <div className="recent-activity box">
            <div className="recent-activity-left">
                <h2>{renderType(activity.type)}</h2>
                <p>
                    {renderRepo(activity.repo.name)} | {timeSince(activity.created_at)}
                </p>
            </div>
            <Button type={"View"} onClick={() => window.open(commitLinks[0], "_blank")} />
        </div>
    );
};

export default RecentActivity;
