import classes from "./Footer.module.scss";
import SvgSelector from "../SvgSelector";
import {Link} from "react-router-dom";


export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.one_line}>
        <div className={classes.footer_logo}>
          <SvgSelector name={"logo"} />
        </div>
        <div className={classes.navigate_footer}>
          <Link to={"/"}>Полезное питание</Link>
          <Link to={"/readyprogram"}>Готовые программы</Link>
          <Link to={"/dishmethod"}>Метод тарелки</Link>
        </div>
        <div className={classes.button_footer}>
          <Link to="https://t.me/zozhnik" target="_blank">
            <SvgSelector name={"telegram"} />
          </Link>

          <Link to="https://vk.com/bestzozhnik" target="_blank">
            <SvgSelector name={"vk"} />
          </Link>

          <Link to="https://www.youtube.com/channel/UCjv-0_V5dxNkBE7Xf1uoDRg" target="_blank">
            <SvgSelector name={"youtube"} />
          </Link>

          <Link to="mailto:m@zozhnik.ru" target="_blank">
            <SvgSelector name={"email"} />
          </Link>
        </div>
      </div>
      <div className={classes.two_line}>
          <Link to="#">Политика конфиденциальности</Link>
          <Link to="#">Условия предоставления услуг</Link>
      </div>
      <p>© 2023 Зожник. Все права защищены</p>
    </footer>
  );
}
