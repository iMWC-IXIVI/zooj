import {useState} from "react";
import SvgSelector from "../../../SvgSelector";
import classes from "./PhysicalActivityForm.module.scss";

export default function PhysicalActivityForm({setGender, setPhysical}) {
  const [activeCard, setActiveCard] = useState("0");
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h3>Укажите уровень Вашей физической активности</h3>
        <div className={classes.header_info}>
          <p className={classes.num}>2/3</p>
          <p className={classes.active}>Активность</p>
        </div>
      </div>
      <div className={classes.box_card}>
        <div
          className={`${classes.card} ${classes.one_card} ${
            activeCard === "1" ? classes.active_card : null
          } `}
          onClick={() => {
            setActiveCard("1");
          }}
        >
          <SvgSelector name="watch" />
          <p className={classes.title}>Минимальная</p>
          <p className={classes.message}>
            Не тренируюсь. Физической нагрузки нет. Работа сидячая, в офисе или
            за рулем. Хожу мало и/или недалеко
          </p>
        </div>
        <div
          className={`${classes.card} ${classes.two_card} ${
            activeCard === "2" ? classes.active_card : null
          }`}
          onClick={() => {
            setActiveCard("2");
          }}
        >
          <SvgSelector name="running" />
          <p className={classes.title}>Низкая</p>
          <p className={classes.message}>
            Легкие тренировки 1-2 раза в неделю. Недолгие пешие прогулки или
            небольшой физический труд (сборка мебели, работа курьером)
          </p>
        </div>
        <div
          className={`${classes.card} ${classes.three_card} ${
            activeCard === "3" ? classes.active_card : null
          }`}
          onClick={() => {
            setActiveCard("3");
          }}
        >
          <SvgSelector name="biceps" />
          <p className={classes.title}>Средняя</p>
          <p className={classes.message}>
            Регулярные тренировки 3-4 раза в неделю.Физический труд средней
            тяжести (погрузка-разгрузка, нетяжелая работа на стройке)
          </p>
        </div>
        <div
          className={`${classes.card} ${classes.four_card} ${
            activeCard === "4" ? classes.active_card : null
          }`}
          onClick={() => {
            setActiveCard("4");
          }}
        >
          <SvgSelector name="whistle" />
          <p className={classes.title}>Высокая</p>
          <p className={classes.message}>
            Интенсивные тренировки 5-6 раз в неделю. Физическая работа полный
            день (перенос тяжелых предметов, строительство, работапо
            хозяйствуили с землей)
          </p>
        </div>
        <div
          className={`${classes.card} ${classes.five_card} ${
            activeCard === "5" ? classes.active_card : null
          } `}
          onClick={() => {
            setActiveCard("5");
          }}
        >
          <SvgSelector name="medal" />
          <p className={classes.title}>Предельная</p>
          <p className={classes.message}>
            Интенсивные тренировки от 7 раз в неделю.Тяжелый и длительный
            физический труд (погрузка-разгрузка тяжелых предметов, тяжелая
            работана стройке или с землей)
          </p>
        </div>
      </div>
      <div className={classes.buttons}>
        <button
          className={classes.back}
          onClick={() => {
            setGender(null);
          }}
        >
          Назад
        </button>
        <button
          onClick={() => {
            setPhysical(activeCard);
          }}
          className={classes.next}
        >
          Дальше
        </button>
      </div>
    </div>
  );
}
