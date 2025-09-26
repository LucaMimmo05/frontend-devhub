import "../styles/projectinputfield.css";
import { useState } from "react";

const ProjectInputField = ({ type, placeholder, name }) => {
    const [actualValue, setActualValue] = useState(0);

    const handleChange = e => {
        if (type === "range") {
            setActualValue(e.target.value);
        }
    };

    return (
        <>
            <div className="project-input-field-range">
                <input
                    name={name}
                    className="project-input-field"
                    min={0}
                    max={100}
                    type={type}
                    placeholder={placeholder}
                    value={type === "range" ? actualValue : undefined}
                    onChange={handleChange}
                />
                {type === "range" && <span>{actualValue}%</span>}
            </div>
        </>
    );
};

export default ProjectInputField;
