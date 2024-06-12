import classes from "./Footer.module.scss";

import SvgSelector from "../SvgSelector";
import {Link} from "react-router-dom";
import RoundButtonEmpty from "../Buttons/RoundButtonEmpty/RoundButtonEmpty";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.one_line}>
        <div>
          <SvgSelector name={"logo"} />
        </div>
        <div className={classes.navigate_footer}>
          <Link to={"#"}>Полезное питание</Link>
          <Link to={"#"}>Готовые программы</Link>
          <Link to={"#"}>Метод тарелки</Link>
        </div>
        <div className={classes.button_footer}>
          <RoundButtonEmpty>
            <Link to="#">
              <SvgSelector name={"telegram"} />
            </Link>
          </RoundButtonEmpty>
          <RoundButtonEmpty>
            <Link to="#">
              <SvgSelector name={"vk"} />
            </Link>
          </RoundButtonEmpty>
          <RoundButtonEmpty>
            <Link to="#">
              <SvgSelector name={"youtube"} />
            </Link>
          </RoundButtonEmpty>
          <RoundButtonEmpty>
            <Link to="#">
              <SvgSelector name={"email"} />
            </Link>
          </RoundButtonEmpty>
        </div>
      </div>
      <div className={classes.two_line}>
        <div>
            <Link to="#">
            Политика конфиденциальности
            </Link>
            <Link to="#">
            Условия предоставления услуг
            </Link>
        </div>
        <div>
           <p>
           © 2023 Зожник. Все права защищены
           </p>
        </div>
      </div>
    </footer>
  );
}
