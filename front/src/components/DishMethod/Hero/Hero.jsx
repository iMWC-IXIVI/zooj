import classes from "./Hero.module.scss";
import heroImg from "../../../images/dishmethodpbg.png";
import SvgSelector from "../../SvgSelector";

export default function Hero() {
  return (
    <div className={classes.hero}>
      <div className={classes.mainidea}>
        <div className={classes.title}>
          <h1>Метод</h1>
          <h1>Тарелки</h1>
        </div>
        <p>
          «красота, здоровье, фигура — это на 80% питание, и на 20% -
          тренировки»
        </p>
        <img src={heroImg} alt="plate" />
      </div>
      <div className={classes.search}>
        <SvgSelector name="search" />
        <input type="search" placeholder="Как составлять тарелку?" />
      </div>
      <div className={classes.lists}>
        <ul className={classes.list1}>
          <li>Вредные советы</li>
          <li>Метод тарелки</li>
          <li>Тезисы питания</li>
          <li>Больше овощей</li>
          <li>Тарелка на практике</li>
        </ul>
        {/* <ul className={classes.list2}>
          <li>Пропорции</li>
          <li>Разнообразие</li>
          <li>Умеренность</li>
          <li>Комфорт</li>
          <li>Индивидуальность</li>
        </ul> */}
      </div>
    </div>
  );
}
