import { useState } from "react";
import DishPopup from "../DishPopup/DishPopup";
import { AddToCart } from "../../services/basket";
import classes from "./Dish.module.scss";
import SvgSelector from "../SvgSelector";
import CloseButton from "../Buttons/CloseButton/CloseButton";

export default function Dish({ dish }) {
  const [visible, setVisible] = useState(false);
  function showPopup() {
    setVisible(true);
  }
  function hidePopup() {
    setVisible(false);
  }

  function addToCart() {
    AddToCart(dish.id);
  }

  return (
    <div className={classes.dish}>
      <a href={`#dish-popup-${dish.id}`} onClick={showPopup}>
        <div>
          <img src={dish.image} alt="dishImage" />
          <div className={classes.favorite}>
            <SvgSelector name="favorite" />
          </div>
          <div className={classes.rating}>
            <SvgSelector name="rating" />
            5.0
          </div>
        </div>
        <p className={classes.title}>{dish.title}</p>
      </a>

      <p className={classes.weight}>
        {dish.weight} г • {dish.kcal} ккал
      </p>
      <p className={classes.price}>{dish.price} руб.</p>
      <button className={classes.button} onClick={addToCart}>
        Выбрать
      </button>

      <div
        id={`dish-popup-${dish.id}`}
        className={
          classes.modal +
          " " +
          (visible ? classes.displayFlex : classes.displayNone)
        }
      >
        <div className={classes.content}>
          <CloseButton onClick={hidePopup} />
          <DishPopup dish={dish}>
            <button className={classes.button} onClick={addToCart}>
            В корзину
            </button>
          </DishPopup>
        </div>
      </div>
    </div>
  );
}
