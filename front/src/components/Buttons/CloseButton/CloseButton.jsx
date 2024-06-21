import SvgSelector from "../../SvgSelector";
import classes from "./CloseButton.module.scss"

export default function CloseButton({onClick }) {
  return (
    <button className={classes.button} onClick={onClick}>
      <SvgSelector name="close"/>
    </button>
  );
}
