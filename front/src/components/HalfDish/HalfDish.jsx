import classes from "./HalfDish.module.scss";

export default function HalfDish({ dish, setRightDish, setLeftDish, leftDishId, rightDishId }) {
  
  let leftDish = dish.half_dishes.find((hdish) => hdish.left === true )
  let rightDish = dish.half_dishes.find((hdish) => hdish.right === true )

  let renderLeftDish = function() {
    return (
      <div className={classes.leftHalfDish}>
        <img 
          src={leftDish.image} alt="dishImage" 
          className={(leftDishId && leftDish.id !== leftDishId ? 'opacity-30 halfDish' : 'halfDish')}
          width="100px" onClick={() => setLeftDish({...leftDish})
          }/>
        <p>{leftDish.title}</p>
        <p>{leftDish.weight} г • {leftDish.kcal} ккал </p>
        <p>{leftDish.price} руб.</p>
      </div>
    )
  }

  let renderRightDish = function() {
    return (
      <div className={classes.rightHalfDish}>
        <img 
          src={rightDish.image} alt="dishImage" width="100px" 
          className={(rightDishId && rightDish.id !== rightDishId ? 'opacity-30 halfDish' : 'halfDish')}
          onClick={() => setRightDish({...rightDish})}/>
        <p>{rightDish.title}</p>
        <p>{rightDish.weight} г • {rightDish.kcal} ккал</p>
        <p>{rightDish.price} руб.</p>
      </div>
    )
  }

  return (    
    <div className={classes.dish}>
      { leftDish && renderLeftDish() }
      { rightDish && renderRightDish() }
    </div>
  );
}