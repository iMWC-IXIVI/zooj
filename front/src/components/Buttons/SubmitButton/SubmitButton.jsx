import classes from "./SubmitButton.module.scss";

export default function SubmitButton({children, disabled}) {
  return (
    <button type="submit" className={`${classes.button} ${disabled? "": classes.active}`} disabled={disabled}>
      {children}
    </button>
  );
}
