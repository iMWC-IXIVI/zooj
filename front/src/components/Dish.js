import DishPopup from "./DishPopup";

function Dish({dish}) {
  return (
    <div className="dish">
      <a href={`#dish-popup-${dish.id}`}>
        <img className="dish-img" src={dish.image} alt="some mama"/>
        <p>{dish.title}</p>
      </a>

      <p>{dish.weight} г • {dish.kcal} ккал • ⭐ 5.0</p>
      <a href="/#">Выбрать</a>

      <div id={`dish-popup-${dish.id}`} class="modal">
        <div class="content">
          <div className="popup-closer">
            <a href="/#" className="closer">&times;</a>
          </div>
          
          <DishPopup dish={dish}/>  
        </div>
      </div>
    </div>
  );
}

export default Dish;
