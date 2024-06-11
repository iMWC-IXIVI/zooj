import DishPopup from "./DishPopup";
import Button from "./Button";
function Dish({ dish }) {
  return (
    <div className="dish">
      <a href={`#dish-popup-${dish.id}`}>
        <div class="dish-img-wrapper">
          <img className="dish-img" src={dish.image} alt="some mama" />
        </div>

        <p>{dish.title}</p>
      </a>

      <p>
        {dish.weight} г • {dish.kcal} ккал • ⭐ 5.0
      </p>
      <Button className="dish-btn" label="Выбрать"></Button>

      <div id={`dish-popup-${dish.id}`} class="modal">
        <div class="content">
          <div className="popup-closer">
            <a href="/#" className="closer">
              &times;
            </a>
          </div>

          <DishPopup dish={dish} />
        </div>
      </div>
    </div>
  );
}

export default Dish;
