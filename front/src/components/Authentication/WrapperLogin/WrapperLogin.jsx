import {useState} from "react";
import classes from "./WrapperLogin.module.scss";

// Components
import CodeForm from "../CodeForm/CodeForm";
import EmailForm from "../EmailForm/EmailForm";
import SvgSelector from "../../SvgSelector";

export default function WrapperLogin({setWrapperLogin}) {
  const [email, setEmail] = useState(null);

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper_window}>
        <div className={classes.header}>
        
          <h3>Вход на сайт</h3>
          <button onClick={()=> {
            setWrapperLogin(false)
          }}>
            <SvgSelector name="close" />
          </button>
        </div>
        {email ? <CodeForm email={email} setEmail={setEmail}/> : <EmailForm setEmail={setEmail} />}
        <p className={classes.agreement}>
          Продолжая, вы соглашаетесь со сбором и обработкой персональных данных
          и пользовательским соглашением
        </p>
      </div>
    </div>
  );
}
