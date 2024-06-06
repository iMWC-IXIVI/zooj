import React from "react";
import Button from "./Button";
function Header({ className }) {
  return (
    <header>
      <div className={className}>
        <div className="logo">ЗОЖНИК</div>
        <nav>
          <ul className="header-list">
            <li>
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
            <li>
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
            <li>
              <a href="https://zozhnik.ru/#gsc.tab=0">Метод тарелки</a>
            </li>
          </ul>
        </nav>
        <Button className="header-btn" label="Войти"></Button>
      </div>
    </header>
  );
}

export default Header;
