import classes from "./CodeForm.module.scss";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";
import { useState} from "react";
import PinInput from "react-pin-input";

export default function CodeForm({email, setEmail}) {
  const [isActiveButton, setActiveButton] = useState(true);
  const [pinCode, setPinCode] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = () => {
    console.log(pinCode);
    setError("Тест")
  };

  return (
    <div>
      <div className={classes.header}>
        <p>Код отправлен на почту</p>
        <div className={classes.header_din}>
          <p><b>{email}</b></p>
          <button onClick={()=>{setEmail(null)}} >Изменить</button>
        </div>
      </div>

      <form className={classes.form} onSubmit={() => onSubmit()}>
        <PinInput
          length={4}
          type="numeric"
          onComplete={(value) => {
            setPinCode(value);
            setActiveButton(false);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: `${error ? "18px" : "40px"}`,
          }}
          inputStyle={{
            borderRadius: "20px",
            border: "1px solid #5A5A5A",
            fontSize: "36px",
            padding: "10px 20px",
            width: "66px",
            height: "75px",
            marginLeft: "14px",
          }}
        />
        {error ? <p className={classes.error_message}>{error}</p> : null}
        <SubmitButton disabled={isActiveButton}>
          {isActiveButton ? "Получить новый код" : "Отправить"}
        </SubmitButton>
      </form>
    </div>
  );
}
