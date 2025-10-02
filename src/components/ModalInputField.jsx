import "../styles/modalinputfield.css";
import { useState } from "react";

const ModalInputField = ({ type, placeholder, name, value, onChange, required = false }) => {
    const [internalValue, setInternalValue] = useState(value);

    const handleChange = e => {
        setInternalValue(e.target.value);
        onChange && onChange(e);
    };

    return (
        <div className="project-input-field-range">
            <input
                required={required}
                name={name}
                className="project-input-field"
                type={type}
                placeholder={placeholder}
                min={type === "range" ? 0 : undefined}
                max={type === "range" ? 100 : undefined}
                value={internalValue}
                onChange={handleChange}
            />
            {type === "range" && <span>{internalValue}%</span>}
        </div>
    );
};

export default ModalInputField;
