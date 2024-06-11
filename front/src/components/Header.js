import React from "react";
import {NavLink} from "react-router-dom"

import Button from "./Button";
import FavIcon from "./FavIcon";
import Logo from "./Logo";

function Header({ className }) {
  return (
    <header>
      <div className={className}>
        <Logo />
        <nav>
          <ul className="header-list">
            <li className="header-list_item">
              <NavLink to="/MainPage">Полезное питание</NavLink>
            </li>
            <li className="header-list_item">
              <svg
                width="2"
                height="22"
                viewBox="0 0 2 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  width="1"
                  height="22"
                  fill="#444444"
                  fillOpacity="0.08"
                />
              </svg>
            </li> 
            <li className="header-list_item">
              <NavLink to="/ReadyProgs">Готовые программы</NavLink>
            </li>
            <li className="header-list_item">
              <svg
                width="2"
                height="22"
                viewBox="0 0 2 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  width="1"
                  height="22"
                  fill="#444444"
                  fillOpacity="0.08"
                />
              </svg>
            </li>
            <li className="header-list_item">
              <NavLink to="/DishMethod">Метод тарелки</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-btns">
          <Button className="header-btn" label=" ">
            <div>
              <FavIcon />
            </div>
          </Button>
          <Button className="header-btn" label=" "></Button>
          <Button className="header-btn-login" label="Войти"></Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
