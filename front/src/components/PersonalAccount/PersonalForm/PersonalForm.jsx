import {FormProvider, useForm} from "react-hook-form";
import classes from "../PersonalAccount.module.scss";
import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";

export default function PersonalForm() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.container_form}>
      <FormProvider {...methods}>
        <form
          className={classes.form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InputTextBox
            label={"ФИО"}
            placeholder={"ФИО"}
            registerName={"name"}
          />
          <InputTextBox
            label={"Телефон"}
            placeholder={"Телефон"}
            registerName={"number"}
            defaultValue={"+7"}
          />
          <InputTextBox
            label={"Почта"}
            placeholder={"Электронная почта"}
            registerName={"email"}
            type={"email"}
          />
          <InputTextBox
            label={"Адрес"}
            placeholder={"Адрес"}
            registerName={"address"}
          />
          <InputTextBox
            label={"День рождения"}
            registerName={"birthday"}
            type={"date"}
          />
          <SubmitButton>Сохранить</SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}
