import SvgSelector from "../../../../SvgSelector";
import classes from "./UserReviews.module.scss";

export default function UserReviews({riversData}) {
  return (
    <div className={classes.reviews}>
      <div className={classes.header}>
        <div className={classes.rating}>
          <div className={classes.star}>
            <SvgSelector name={"star"} />
            <SvgSelector name={"star"} />
            <SvgSelector name={"star"} />
            <SvgSelector name={"star"} />
            <SvgSelector name={"star"} />
          </div>

          <p className={classes.date}>{riversData.date}</p>
        </div>

        <p>Отзыв</p>
      </div>

      <div className={classes.message}>{riversData.message}</div>
    </div>
  );
}
