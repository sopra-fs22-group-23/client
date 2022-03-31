import React from "react";

export const Button = props => (
    <button
      {...props}
      style={{width: props.width, ...props.style}}
      className={`primary-button ${props.className}`}>
      {props.children}
    </button>
  );
  