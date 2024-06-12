import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import {useForm, FormProvider} from "react-hook-form";
import classes from "./EmailForm.module.scss";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";
export default function EmailForm({setEmail}) {
  const methods = useForm();

  const onSubmit = (data) => {
    setEmail(data.email);
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
            <SubmitButton disabled={!methods.formState.isValid}>
              Выслать код
            </SubmitButton>
          </form>
        </FormProvider>
        
      </div>
    </>
  );
}
