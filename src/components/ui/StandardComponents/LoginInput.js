import React from "react";
import PropTypes from "prop-types";

export const LoginInput = (props) => {
    return (
        <div>
            <input
                className={props.className}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

LoginInput.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};