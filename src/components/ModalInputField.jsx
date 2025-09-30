import "../styles/modalinputfield.css";
import { useState } from "react";

const ProjectInputField = ({ type, placeholder, name, value, onChange, required = false }) => {
    const [actualValue, setActualValue] = useState(value || 0);

    const handleChange = e => {
        if (type === "range") {
            setActualValue(e.target.value);
            onChange && onChange(e);
        }

        onChange && onChange(e);
    };

    return (
        <>
            <div className="project-input-field-range">
                <input
                    required={required}
                    name={name}
                    className="project-input-field"
                    min={0}
                    max={100}
                    type={type}
                    placeholder={placeholder}
                    value={type === "range" ? actualValue : value}
                    onChange={handleChange}
                />
                {type === "range" && <span>{actualValue}%</span>}
            </div>
        </>
    );
};

export default ProjectInputField;
