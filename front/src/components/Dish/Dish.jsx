import DishPopup from "../DishPopup/DishPopup";
import Button from "../Buttons/Button/Button";
import classes from "./Dish.module.scss";

export default function Dish({ dish }) {
  return (
    <div className={classes.dish}>
      <a href={`#dish-popup-${dish.id}`}>
        <div>
          <img src={dish.image} alt="dishImage" />
        </div>
        <p>{dish.title}</p>
      </a>

      <p>
        {dish.weight} г • {dish.kcal} ккал 
      </p>
      <p>
        От 230руб.
      </p>
      <Button className={classes.dishBtn} label="Выбрать"></Button>

      <div id={`dish-popup-${dish.id}`} class={classes.modal}>
        <div className={classes.content}>
          <div className={classes.popupCloser}>
            <a href="/readyprogram" className={classes.closer}>
              &times;
            </a>
          </div>

          <DishPopup dish={dish} />
        </div>
      </div>
    </div>
  );
}