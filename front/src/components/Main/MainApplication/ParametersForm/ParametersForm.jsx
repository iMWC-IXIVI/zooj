import {useState} from "react";
import classes from "./ParametersForm.module.scss";
import Mask from "../../../../images/Mask group 3.png";

export default function ParametersForm({setPhysical, physical, gender}) {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [desWeight, setDesWeight] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    let data = {age, height, weight, desWeight, gender, active: physical};
    console.log(data);
  };
  return (
    <div className={classes.container}>
      <div className={classes.pizdex}>
        <div className={classes.header}>
          <h3>Укажите Ваши параметры</h3>
          <div className={classes.header_info}>
            <p className={classes.num}>3/3</p>
            <p className={classes.active}>Параметры</p>
          </div>
        </div>
        <p className={classes.info_message}>
          Введите свои данные и мы расчитаем Вам <br /> рекомендуемую норму
          потребления
        </p>

        <form onSubmit={handelSubmit}>
          <div className={classes.box_input}>
            <input
              className={classes.input}
              name="age"
              placeholder="Ваш возраст"
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              className={classes.input}
              name="height"
              placeholder="Ваш рост, см"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className={classes.box_input}>
            <input
              className={classes.input}
              name="weight"
              placeholder="Текущий вес, кг"
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              className={classes.input}
              name="des_weight"
              placeholder="Желаемый вес, кг"
              onChange={(e) => setDesWeight(e.target.value)}
            />
          </div>

          <div className={classes.buttons}>
            <button
              className={classes.back}
              onClick={() => {
                setPhysical(null);
              }}
            >
              Назад
            </button>
            <button type="submit" className={classes.next}>
              Дальше
            </button>
          </div>
        </form>
      </div>
      <div className={classes.img_cont}>
      <img src={Mask} alt="asd" />
      </div>
     
    </div>
  );
}
