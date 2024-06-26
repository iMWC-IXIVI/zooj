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
        <p className={classes.title}>{leftDish.title}</p>
        <p className={classes.weight}>{leftDish.weight} г <br/> {leftDish.kcal} ккал </p>
        <p className={classes.price}>{leftDish.price} руб.</p>
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
        <p className={classes.title}>{rightDish.title}</p>
        <p className={classes.weight}>{rightDish.weight} г <br/> {rightDish.kcal} ккал</p>
        <p className={classes.price}>{rightDish.price} руб.</p>
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