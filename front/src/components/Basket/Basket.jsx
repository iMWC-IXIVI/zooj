import { LoadBasket, RemoveFromCart } from "../../services/basket";
import RoundButton from "../Buttons/RoundButton/RoundButton";
import SvgSelector from "../SvgSelector";
import { useState } from "react";
import classes from "./Basket.module.scss";
import Button from "../Buttons/Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
import CloseButton from "../Buttons/CloseButton/CloseButton";

export function Basket() {
  const defaultBasket = {
    items: [],
    fats: {},
    carbos: {},
    kcal: {},
    proteins: {},
  };
  const [basket, setBasket] = useState(defaultBasket);
  const [visible, setVisible] = useState(false);
  async function showBasket() {
    const data = await LoadBasket();
    setBasket(data);
    setVisible(true);
  }

  async function Remove(id) {
    RemoveFromCart(id);
    const data = await LoadBasket();
    setBasket(data);
  }

  function hideBasket() {
    setVisible(false);
  }

  let itemsList = [];
  let curProviderImage = "";
  basket.items.forEach((item) => {
    let showProviderLogo = false;
    if (curProviderImage !== item.link_image) {
      curProviderImage = item.link_image;
      showProviderLogo = true;
    }

    itemsList.push(
      <div>
        {showProviderLogo && (
          <>
            <img src={item.link_image} alt="лого" width="100" />
            <br />
          </>
        )}
        <div className={classes.dish}>
          <img src={item.image} width="130" alt="блюдо" />
          <div className={classes.dishDescription}>
            <h2>{item.title}</h2>
            <ul>
              <li>
                <strong>{item.weight}</strong> г
              </li>
              <li>•</li>
              <li>
                <strong>{item.kcal}</strong> ккал
              </li>
              <li>•</li>
              <li>⭐ 5.0</li>
            </ul>

            <p className={classes.price}>{item.price} руб.</p>
            <a href={item.link} target="_blank" rel="noreferrer">
              Заказать
            </a>
          </div>
          <Button onClick={() => Remove(item.dish_id)}>
            <SvgSelector name="delete" />
          </Button>
        </div>
      </div>
    );
  });

  return (
    <>
      <RoundButton onClick={showBasket}>
        <SvgSelector name="basket" />
      </RoundButton>

      <div
        id="basket"
        className={
          classes.modal +
          " " +
          (visible ? classes.displayFlex : classes.displayNone)
        }
      >
        <div className={classes.content}>
          <div className={classes.popupCloser}>
            <CloseButton onClick={hideBasket} />
          </div>

          <h1>Ваша корзина</h1>
          <div className={classes.kpfc}>
            <ProgressBar
              title="РСК"
              id="Kcal"
              color="#EFBB58"
              curValue={basket.kcal.actual}
              maxValue={basket.kcal.expected + 1500}
            />
            <ProgressBar
              title="Жиры"
              id="Fats"
              color="#FF7841"
              curValue={basket.fats.actual}
              maxValue={basket.fats.expected + 80}
            />
            <ProgressBar
              title="Углеводы"
              id="Carbos"
              color="#FFDA22"
              curValue={basket.carbos.actual}
              maxValue={basket.carbos.expected + 70}
            />
            <ProgressBar
              title="Белки"
              id="Proteins"
              color="#63A3DD"
              curValue={basket.proteins.actual}
              maxValue={basket.proteins.expected + 100}
            />
          </div>
          {itemsList}
        </div>
      </div>
    </>
  );
}
