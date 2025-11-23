import "../styles/modalinputfield.css";
import { useState, useEffect } from "react";

const ModalInputField = ({
    type,
    placeholder,
    name,
    value,
    onChange,
    required = false,
    error = false,
    errorMessage = "",
    minLength,
    maxLength,
    pattern,
}) => {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = e => {
        setInternalValue(e.target.value);
        onChange && onChange(e);
    };

    return (
        <div className="project-input-field-wrapper">
            <div className="project-input-field-range">
                <input
                    required={required}
                    name={name}
                    className={`project-input-field ${error ? "error" : ""}`}
                    type={type}
                    placeholder={placeholder}
                    min={type === "range" ? 0 : undefined}
                    max={type === "range" ? 100 : undefined}
                    value={internalValue}
                    onChange={handleChange}
                    minLength={minLength}
                    maxLength={maxLength}
                    pattern={pattern}
                />
                {type === "range" && <span>{internalValue}%</span>}
            </div>
            {error && errorMessage && <span className="project-input-field-error-message">{errorMessage}</span>}
        </div>
    );
};

export default ModalInputField;
