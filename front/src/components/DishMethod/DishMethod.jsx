import { useState, useEffect } from "react";
import classes from "./DishMethod.module.scss";
import HalfDish from "../HalfDish/HalfDish";
import Hero from "./Hero/Hero";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function DishMethod() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    let url = "http://localhost/api/v1/catalog";

    let params = ["half_dishes=true"];

    if (params.length > 0) {
      url = url + "?" + params.join("&");
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let dishes = [];

        data.dishes.forEach((dish) => {
          dishes.push(dish);
        });

        setDishes(dishes);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [currentDish, setCurrentDish] = useState({ half_dishes: [] });
  const [currentLeftDish, setCurrentLeftDish] = useState({});
  const [currentRightDish, setCurrentRightDish] = useState({});

  const setLeftDish = function (halfDish) {
    setCurrentDish({ half_dishes: [{ ...halfDish }, { ...currentRightDish }] });
    setCurrentLeftDish(halfDish);
  };

  const setRightDish = function (halfDish) {
    setCurrentDish({ half_dishes: [{ ...currentLeftDish }, { ...halfDish }] });
    setCurrentRightDish(halfDish);
  };

  let dishesList = [];
  dishes.forEach((dish) =>
    dishesList.push(
      <HalfDish
        dish={dish}
        setLeftDish={setLeftDish}
        setRightDish={setRightDish}
        leftDishId={currentLeftDish.id}
        rightDishId={currentRightDish.id}
      />
    )
  );

  return (
    <div>
      <Hero />
      <div className={classes.breakfast}>
        <div className={classes.currentDish}>
          <HalfDish dish={currentDish} />

          <div>
            <h2>Ваша тарелка</h2>
            <div className={classes.bar}>
              <ProgressBar
                title="РСК"
                add="ккал"
                id="Kcal"
                color="#EFBB58"
                curValue={
                  (currentRightDish.kcal || 0) + (currentLeftDish.kcal || 0)
                }
                maxValue={2000}
              />
              <ProgressBar
                title="Жиры"
                add="г"
                id="Fats"
                color="#FF7841"
                curValue={(currentRightDish.fats || 0) + (currentLeftDish.fats || 0)}
                maxValue={100}
              />
              <ProgressBar
                title="Белки"
                add="г"
                id="Proteins"
                color="#63A3DD"
                curValue={(currentRightDish.proteins || 0) + (currentLeftDish.proteins || 0)}
                maxValue={120}
              />
              <ProgressBar
                title="Углеводы"
                add="г"
                id="Carbos"
                color="#FFDA22"
                curValue={(currentRightDish.carbos || 0) + (currentLeftDish.carbos || 0)}
                maxValue={100}
              />
            </div>
          
          </div>
        </div>
        <div className={classes.halfDishes}>
          <div className={classes.halfdishIndex}>{dishesList}</div>
        </div>

        <div className={classes.clearFloat}></div>
      </div>
    </div>
  );
}
