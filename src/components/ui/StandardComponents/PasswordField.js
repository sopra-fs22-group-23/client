import React from "react";
import PropTypes from "prop-types";
import "../../../styles/ui/FormField.scss";

export const PasswordField = (props) => {
  return (
    <div className="login field">
      <label className="form-input__label">{props.label}</label>
      <input
        type={"password"}
        className="form-input__input"
        placeholder="enter password"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

PasswordField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
