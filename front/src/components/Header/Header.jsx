import classes from "./Header.module.scss";
import RoundButton from "../Buttons/RoundButton/RoundButton";
import SvgSelector from "../SvgSelector";
import {NavLink} from "react-router-dom";

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
          <SvgSelector name="love" />
        </RoundButton>
        <RoundButton>
          <SvgSelector name="basket" />
        </RoundButton>
        <button onClick={()=>{setWrapperLogin(true)}} >Войти</button>
      </div>
    </header>
  );
}
