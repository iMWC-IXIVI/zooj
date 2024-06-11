function DishPopup({ dish }) {
  let ingList = [];

  dish.ingredients.forEach((ing) => {
    ingList.push(
      <li>
        {ing.title}, {ing.weight} г
      </li>
    );
  });

  let stepsList = [];

  dish.steps.forEach((step) => {
    stepsList.push(<li>{step.description}</li>);
  });

  function renderIngredients(ingList) {
    return (
      <>
        <h3>Ингредиенты:</h3>
        <ul className="no-pad">{ingList}</ul>
      </>
    );
  }

  function renderSteps(stepsList) {
    return (
      <>
        <h3>Способ приготовления:</h3>
        <ul className="no-pad">{stepsList}</ul>
      </>
    );
  }

  return (
    <div className="dish-popup">
      <img src={dish.image} alt="some mama" width="400" />
      <h2>{dish.title}</h2>
      <ul className="one-line">
        <li>
          Вес: <strong>{dish.weight}</strong> г
        </li>
        <li>
          Каллорийность: <strong>{dish.kcal}</strong> ккал
        </li>
        <li>
          Белки: <strong>{dish.carbos}</strong> г
        </li>
        <li>
          Жиры: <strong>{dish.fats}</strong> г
        </li>
        <li>
          Углеводы: <strong>{dish.carbos}</strong>
        </li>
      </ul>

      <div>
        <div className="float-left w-50 text-left">
          {ingList.length > 0 ? renderIngredients(ingList) : null}
        </div>
        <div className="float-right w-50 text-left">
          {stepsList.length > 0 ? renderSteps(stepsList) : null}
        </div>
      </div>
    </div>
  );
}

export default DishPopup;
