import React from "react";
import PropTypes from "prop-types";

const Input = ({label, text, type, id, defaultValue, handleChange}) =>
(
    <div className="form-group">
        <label htmlFor={label}>{text}</label>
        <input
            type={type}
            className="form-control"
            id="id"
            defaultValue={defaultValue}
            onChange={handleChange}
            required
        />
    </div>
);

Input.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    //defaultValue: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Input;