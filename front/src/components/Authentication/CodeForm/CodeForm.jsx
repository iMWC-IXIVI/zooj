import classes from "./CodeForm.module.scss";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";
import {useState} from "react";
import PinInput from "react-pin-input";
import {useForm, FormProvider} from "react-hook-form";
import Auth from "../../../services/Authentication";

export default function CodeForm({email, setEmail, uuid, setWrapperLogin}) {
  const methods = useForm();
  const [isActiveButton, setActiveButton] = useState(true);

  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    Auth.sendCode(data.code, uuid).then((res) => {
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        setWrapperLogin(false);
      } else {
        setError("Упс... что то пошло не так");
      }
    });
  };

  return (
    <div>
      <div className={classes.header}>
        <p>Код отправлен на почту</p>
        <div className={classes.header_din}>
          <p>
            <b>{email}</b>
          </p>
          <button
            onClick={() => {
              setEmail(null);
            }}
          >
            Изменить
          </button>
        </div>
      </div>
      <FormProvider {...methods}>
        <form
          className={classes.form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <PinInput
            length={4}
            type="numeric"
            onComplete={(value) => {
              methods.setValue("code", value);
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
      </FormProvider>
    </div>
  );
}
