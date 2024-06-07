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

  function renderIngredients(ingList) {
    return (
      <>
        <h3>Ингредиенты:</h3>
        <ul>
          { ingList }
        </ul>
      </>
    )
  }

  function renderSteps(stepsList) {
    return (
      <>
        <h3>Способ приготовления:</h3>
        <ul>
          { stepsList }
        </ul>
      </>
    )
  }

  return (
    <div className="dish">
      <h2>{dish.title}</h2>
      <img src={dish.image} alt="some mama" width="400"/>
      <ul>
        <li>Каллорийность: {dish.kcal} ккал</li>
        <li>Белки: {dish.carbos} г</li>
        <li>Жиры: {dish.fats} г</li>
        <li>Углеводы: {dish.carbos}</li>
      </ul>

      { ingList.length > 0 ? renderIngredients(ingList) : null }
      { stepsList.length > 0 ? renderSteps(stepsList) : null }
    </div>
  );
}

export default Dish;
