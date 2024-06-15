import DishPopup from "../DishPopup/DishPopup";
import Button from "../Buttons/Button/Button";
import classes from "./Dish.module.scss";

export default function Dish({ dish }) {
  return (
    <div className={classes.dish}>
      <a href={`#dish-popup-${dish.id}`}>
        <div className={classes.imgWrapper}>
          <img src={dish.image} alt="some mama" />
        </div>
        <p>{dish.title}</p>
      </a>

      <p>
        {dish.weight} г • {dish.kcal} ккал 
      </p>
      <Button className="dish-btn" label="Выбрать"></Button>

      <div id={`dish-popup-${dish.id}`} class={classes.modal}>
        <div className={classes.content}>
          <div className={classes.popupCloser}>
            <a href="/#" className={classes.closer}>
              &times;
            </a>
          </div>

          <DishPopup dish={dish} />
        </div>
      </div>
    </div>
  );
}