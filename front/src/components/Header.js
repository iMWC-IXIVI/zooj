import React from "react";
import Button from "./Button";
// import FavIcon from "./FavIcon";

function Header({ className }) {
  return (
    <header>
      <div className={className}>
        <div className="logo">ЗОЖНИК</div>
        <nav>
          <ul className="header-list">
            <li className="header-list_item">
              <a href="https://zozhnik.ru/#gsc.tab=0">Полезное питание</a>
            </li>
            <li>
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
                  fill-opacity="0.08"
                />
              </svg>
            </li>
            <li className="header-list_item">
              <a href="https://zozhnik.ru/#gsc.tab=0">Готовые программы</a>
            </li>
            <li>
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
                  fill-opacity="0.08"
                />
              </svg>
            </li>
            <li className="header-list_item">
              <a href="https://zozhnik.ru/#gsc.tab=0">Метод тарелки</a>
            </li>
          </ul>
        </nav>
        <div className="header-btns">
        <Button className="header-btn" label=" "></Button>
        <Button className="header-btn" label=" "></Button>
        <Button className="header-btn-login" label="Войти"></Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
