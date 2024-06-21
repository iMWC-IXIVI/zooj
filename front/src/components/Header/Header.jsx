import classes from "./Header.module.scss";
import RoundButton from "../Buttons/RoundButton/RoundButton";
import { Basket } from '../Basket/Basket'
import SvgSelector from "../SvgSelector";
import {Link, NavLink} from "react-router-dom";

export default function Header({setWrapperLogin}) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <SvgSelector name={"logo"} />
      </div>

      <div className={classes.navigate}>
        <NavLink to="/" className={({isActive}) => isActive && classes.active}>
          Полезное питание
        </NavLink>
        <div className={classes.line}></div>
        <NavLink
          to={"/readyprogram"}
          className={({isActive}) => isActive && classes.active}
        >
          Готовые программы
        </NavLink>
        <div className={classes.line}></div>
        <NavLink
          to={"/dishmethod"}
          className={({isActive}) => isActive && classes.active}
        >
          Метод тарелки
        </NavLink>
      </div>
      <div className={classes.buttons}>
        <RoundButton>
          <SvgSelector name="favorite" />
        </RoundButton>
        <Basket/>
        {localStorage.getItem("token") ? (
          <button>
            <Link to="account">Профиль</Link>
          </button>
        ) : (
          <button
            onClick={() => {
              setWrapperLogin(true);
            }}
          >
            Войти
          </button>
        )}
      </div>
    </header>
  );
}
