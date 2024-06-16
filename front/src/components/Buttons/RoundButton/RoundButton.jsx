import classes from "./RoundButton.module.scss";

export default function RoundButton({children, onClick }) {
  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
}
