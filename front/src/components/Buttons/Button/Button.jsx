import classes from "./Button.module.scss";

export default function Button({ children, disabled, onClick }) {
  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}
