import React from "react";
import PropTypes from "prop-types";
import "../../../styles/ui/FormField.scss";

export const FormField = (props) => {
  return (
    <div className="login field">
      <label className="form-input__label">{props.label}</label>
      <input
        min = {props.min}
        className="form-input__input"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
