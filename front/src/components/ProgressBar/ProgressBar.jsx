import classes from "./ProgressBar.module.scss";

export default function ProgressBar({ color, id, curValue, title, maxValue }) {
  let max = maxValue;
  let cur = curValue;
  let progrw = (cur / max) * 100;

  const progrstyle = {
    width: `${progrw}%`,
    backgroundColor: color,
  };
  return (
    <div className={classes.Bar}>
      <div className={classes.labels}>
        <label className={classes.name}>{title}</label>
        <label className={classes.value}>{curValue} г</label>
      </div>
      <div>
        <div className={classes.container}>
          <div id={id} color={color} className={classes.progress} style={progrstyle}></div>
        </div>
      </div>
    </div>
  );
}
