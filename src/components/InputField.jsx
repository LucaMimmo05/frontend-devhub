import "../styles/inputfield.css";

const InputField = ({
    type,
    placeholder,
    value,
    onChange,
    required = false,
    error = false,
    errorMessage = "",
    minLength,
    maxLength,
    pattern,
    name,
}) => {
    return (
        <div className="input-field-wrapper">
            <input
                className={`input-field ${error ? "error" : ""}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                name={name}
            />
            {error && errorMessage && <span className="input-field-error-message">{errorMessage}</span>}
        </div>
    );
};

export default InputField;
