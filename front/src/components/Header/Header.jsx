import classes from "./Header.module.scss";
import RoundButton from "../Buttons/RoundButton/RoundButton";
import {Basket} from "../Basket/Basket";
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

        <Basket />
        {localStorage.getItem("token") ? (
          <Link className={classes.user_lk} to="/account">
            <SvgSelector name="user" />
          </Link>
        ) : null}

        {localStorage.getItem("token") ? (
          <button
            className={classes.lk}
            onClick={() => {
              setWrapperLogin(null);
              localStorage.removeItem("token");
              localStorage.removeItem("uuid");
            }}
          >
            Выйти
          </button>
        ) : (
          <button
            className={classes.lk}
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
