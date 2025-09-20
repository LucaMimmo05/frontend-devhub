import "../styles/project.css";

const Project = ({ data }) => {
    return (
        <div className="box project">
            <div className="project-info">
                <div className="project-top">
                    <h2>{data.name}</h2>
                </div>
                <div className="project-desc">
                    <p>{data.description}</p>
                </div>
            </div>
            <div className="project-bottom">
                <button>See Deatils</button>
            </div>
        </div>
    );
};

export default Project;
