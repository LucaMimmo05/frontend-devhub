import "../styles/inputfield.css";

const InputField = ({ type, placeholder, value, onChange, required = false, minLength, maxLength, pattern, name }) => {
    return (
        <div className="input-field-wrapper">
            <input
                className="input-field"
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
        </div>
    );
};

export default InputField;
