import "../styles/inputfield.css";

const InputField = ({ type, placeholder, value, onChange }) => {
    return <input className="input-field" type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default InputField;
