import "../styles/repositoryitem.css";
const RepositoryItem = ({ data }) => {
    return (
        <div className="repository-item">
            <a href={data.html_url}>
                <div className="text">
                    <img src={data.owner.avatar_url} alt="" height={30} width={30} className="avatar" />
                    <h4>{data.name}</h4>
                </div>
            </a>
            <hr />
        </div>
    );
};

export default RepositoryItem;
