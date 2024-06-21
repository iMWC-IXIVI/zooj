import { useState } from "react";
import DishPopup from "../DishPopup/DishPopup";
import Button from "../Buttons/Button/Button";
import { AddToCart } from '../../services/basket'
import classes from "./Dish.module.scss";
import SvgSelector from "../SvgSelector";

export default function Dish({ dish }) {
  const [visible, setVisible] = useState(false)
  function showPopup() {
    setVisible(true);
  }
  function hidePopup() {
    setVisible(false);
  }

  function addToCart() {
    AddToCart(dish.id)
  }
  
  return (
    <div className={classes.dish}>
      <a href={`#dish-popup-${dish.id}`} onClick={showPopup}>
        <div>
          <img src={dish.image} alt="dishImage" />
        </div>
        <p className={classes.title}>{dish.title}</p>
      </a>

      <p className={classes.weight}>
        {dish.weight} г • {dish.kcal} ккал 
      </p>
      <p className={classes.price}>
         {dish.price} руб.
      </p>
      <Button className={classes.add} onClick={addToCart}>Выбрать</Button>

      <div id={`dish-popup-${dish.id}`} className={ (classes.modal ) + " " + (visible ? (classes.displayFlex) : (classes.displayNone)) }>
        <div className={classes.content}>
          <div className={classes.popupCloser}>
            <button onClick={hidePopup}>
              <SvgSelector name="close" />
            </button>
          </div>

          <DishPopup dish={dish} />
        </div>
      </div>
    </div>
  );
}