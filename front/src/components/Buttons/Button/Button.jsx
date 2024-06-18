import classNames from "classnames";

export default function Button({className, label, active, onClick}) {
  const classes = classNames("btn", className, active);
  return (
    <button className={classes} onClick={onClick}>
      {label}
    </button>
  );
}
