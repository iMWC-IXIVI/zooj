import React from "react";
import classNames from "classnames";

function Button({ className, label, active }) {
  const classes = classNames("btn", className, active);
  return <button className={classes}>{label}</button>;
}

export default Button;
