import React from "react";

export const MyButton = props => (
    <button
      {...props}
      style={{width: props.width, ...props.style}}
      className={`MyButton ${props.className}`}>
      {props.children}
    </button>
  );
  