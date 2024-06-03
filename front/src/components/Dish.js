import React from "react";

function Dish({dish}) {

  let ingList = [];

  dish.ingredients.forEach((ing) => {
    ingList.push(
      <li>{ing.title}, {ing.weight} г</li>
    )
  });

  let stepsList = []

  dish.steps.forEach((step) => {
    stepsList.push(
      <li>{step.description}</li>
    )
  });

  return (
    <div className="dish">
      <h2>{dish.title}</h2>
      <ul>
        <li>Каллорийность: {dish.kcal} ккал</li>
        <li>Белки: {dish.carbos} г</li>
        <li>Жиры: {dish.fats} г</li>
        <li>Углеводы: {dish.carbos}</li>
      </ul>

      <h3>Ингредиенты:</h3>
      <ul>
        { ingList }
      </ul>

      <h3>Способ приготовления:</h3>
      <ul>
        { stepsList }
      </ul>
    </div>
  );
}

export default Dish;
