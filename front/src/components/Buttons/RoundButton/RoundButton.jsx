import classes from "./RoundButton.module.scss";

export default function RoundButton({children, onClick}) {
  return (
    <button className={classes.round_button} onClick={onClick}>
      {children}
    </button>
  );
}
