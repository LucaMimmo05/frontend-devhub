import "../styles/modalinputdatefield.css";

const ModalInputDateField = ({ value, onChange, name }) => {
    return (
        <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={value || ""}
            onChange={onChange}
            name={name}
        />
    );
};

export default ModalInputDateField;
