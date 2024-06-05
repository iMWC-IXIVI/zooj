import React from "react";
import classNames from "classnames";

function Button({ className, active, label }) {
  const classes = classNames("btn", className, active);
  return <button className={classes}>{label}</button>;
}

export default Button;
