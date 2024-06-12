import React, { useState } from 'react';
import { LoadBasket, RemoveFromCart } from "../services/basket";

export function Basket() {
  const defaultBasket = {
    items: [],
    fats: {},
    carbos: {},
    kcal: {},
    proteins: {}    
  }
  const [basket, setBasket] = useState(defaultBasket)
  const [visible, setVisible] = useState(false)
  async function showBasket() {
    const data = await LoadBasket();
    setBasket(data)
    setVisible(true);
  }

  async function Remove(id) {
    RemoveFromCart(id);
    const data = await LoadBasket();
    setBasket(data)
  }

  function hideBasket() {
    setVisible(false);
  }

  let itemsList = []
  let curProviderImage = ""
  basket.items.forEach((item) => { 
      let showProviderLogo = false;
      if (curProviderImage !== item.link_image) {
        curProviderImage = item.link_image;
        showProviderLogo = true
      }

      itemsList.push(
        <div>
          { showProviderLogo && <><img src={item.link_image} alt="лого" width="200" /><br/></> }
          <img src={item.image} width="100" alt="пик"/>
          <br/>
          <h2>{item.title}</h2>

          <ul className="one-line">
            <li><strong>{item.weight}</strong> г</li>
            <li><strong>{item.kcal}</strong> ккал</li>
            <li>⭐ 5.0</li>
          </ul>

          <p>{item.price} руб</p>
          <a href={item.link} target="_blank"  rel="noreferrer">Заказать</a>
          <button onClick={() => Remove(item.dish_id)}>удалить из заказа</button>
        </div>
      )
    }
  )

  return (
    <>
        <button className="btn header-btn" onClick={showBasket}>К</button>

        <div id="basket" className={ "modal " + (visible ? 'display-flex' : '') }>
            <div class="content">
                <div className="popup-closer">
                    <a href="/#" className="closer" onClick={hideBasket}>&times;</a>
                </div>

                <h2>Ваша корзина</h2>
                <div>Жиры: {basket.fats.actual} / {basket.fats.expected} </div>
                <div>Углеводы: {basket.carbos.actual} / {basket.carbos.expected} </div>
                <div>РСК: {basket.kcal.actual} / {basket.kcal.expected} </div>
                <div>Белки: {basket.proteins.actual} / {basket.proteins.expected} </div>

                {itemsList}
        
            </div>
        </div>
    </>
  );
}
  