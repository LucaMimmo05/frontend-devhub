<<<<<<< HEAD
import PropTypes from "prop-types";

const InputField = ({ type, placeholder, value, onChange }) => {
    return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
=======
import React from "react";

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
>>>>>>> 944ac4bbd4808a98df08c611738f8f0b29054fd8
};

export default InputField;
