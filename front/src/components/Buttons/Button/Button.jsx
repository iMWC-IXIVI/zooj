import classNames from "classnames";

export default function Button({ className, label, active }) {
  const classes = classNames("btn", className, active);
  return <button className={classes}>{label}</button>;
}
