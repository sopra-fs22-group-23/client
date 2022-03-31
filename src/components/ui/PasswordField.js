import React from 'react';
import PropTypes from "prop-types";

export const PasswordField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input
                type={"password"}
                className="login input"
                placeholder="enter password"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

PasswordField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};