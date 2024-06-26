import { LoadBasket, RemoveFromCart } from "../../services/basket";
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
      <div className={classes.container}>
        {showProviderLogo && (
          <>
            <img className={classes.logo} src={item.link_image} alt="лого" width="100" />
            <br />
          </>
        )}
        <div className={classes.dish}>
          <img src={item.image} width="130" alt="блюдо" />
          <div className={classes.article}>
            <div className={classes.description}>
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
                <li>
                  <SvgSelector name="rating"/>
                   5.0
                </li>
              </ul>
              <p className={classes.price}>{item.price} руб.</p>
            </div>
            <div className={classes.btns}>
              <a href={item.link} target="_blank" rel="noreferrer">
                Заказать
              </a>
              <Button onClick={() => Remove(item.dish_id)}>
                <SvgSelector name="delete" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <button className={classes.btn_round} onClick={showBasket}>
        <SvgSelector name="basket" />
      </button>

      <div
        id="basket"
        className={ classes.modal + " " + (visible ? classes.displayFlex : classes.displayNone) }
      >
        <div className={classes.content}>
          <div className={classes.container}>
            <CloseButton onClick={hideBasket} />
            <h1>Ваша корзина</h1>
          </div>
          <div className={classes.kpfc}>
            <div className={classes.container}>
              <ProgressBar
                title="РСК"
                add="ккал"
                id="Kcal"
                color="#EFBB58"
                curValue={basket.kcal.actual}
                maxValue={2000}
              />
              <ProgressBar
                title="Жиры"
                add="г"
                id="Fats"
                color="#FF7841"
                curValue={basket.fats.actual}
                maxValue={100}
              />
              <ProgressBar
                title="Белки"
                add="г"
                id="Proteins"
                color="#63A3DD"
                curValue={basket.proteins.actual}
                maxValue={120}
              />
              <ProgressBar
                title="Углеводы"
                add="г"
                id="Carbos"
                color="#FFDA22"
                curValue={basket.carbos.actual}
                maxValue={100}
              />
            </div>
          </div>
          {itemsList}
        </div>
      </div>
    </>
  );
}
