import {FormProvider, useForm} from "react-hook-form";
import classes from "../PersonalAccount.module.scss";
import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";

export default function ApplicationForm() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className={classes.container_form}>
      <FormProvider {...methods}>
        <form
          className={classes.form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InputTextBox
            label={"Возраст"}
            placeholder={"0 лет"}
            registerName={"age"}
          />
          <InputTextBox
            label={"Вес (кг)"}
            placeholder={"0 кг"}
            registerName={"weight"}
          />
          <InputTextBox
            label={"Рост (см)"}
            placeholder={"0 см"}
            registerName={"height"}
            type={"email"}
          />
          <InputTextBox
            label={"Желаемый вес (кг)"}
            placeholder={"0 кг"}
            registerName={"desired_weight"}
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
