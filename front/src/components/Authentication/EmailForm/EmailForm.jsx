import {useForm, FormProvider} from "react-hook-form";
import classes from "./EmailForm.module.scss";

import Auth from "../../../services/Authentication";

// Components
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";
import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import {useState} from "react";

export default function EmailForm({setEmail, uuid}) {
  const methods = useForm();
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    setEmail(data.email)
    setError(null)
    Auth.sendEmail(data.email, uuid).then((res) => {
      if (res.status === 201) {
        setEmail(data.email);
      } else {
        setError("Усп... что то пошло не так!");
      }
    });
  };
  return (
    <>
      <div>
        <p className={classes.message}>
          Мы отправим код на почту для подтверждения.
        </p>
        <FormProvider {...methods}>
          <form
            className={classes.form}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputTextBox
              type={"email"}
              registerName={"email"}
              label={"Почта"}
              registerValidate={{
                required: "Обязательное поле",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Неверный формат email",
                },
              }}
              error={
                methods.formState.errors?.email
                  ? methods.formState.errors.email.message
                  : ""
              }
            />
            {error ? <p>{error}</p> : null}
            <SubmitButton disabled={!methods.formState.isValid}>
              Выслать код
            </SubmitButton>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
