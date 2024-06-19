import {FormProvider, useForm} from "react-hook-form";
import classes from "../PersonalAccount.module.scss";
import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";

export default function PersonalForm({userData}) {

  if(!userData.user.phone){
    userData.user.phone = "+7"
  }

  const methods = useForm({defaultValues:userData.user});

  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(methods.formState.isDirty);

  return (
    <div className={classes.container_form}>
      <FormProvider {...methods}>
        <form
          className={classes.form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h3>Личные данные</h3>
          <InputTextBox
            label={"ФИО"}
            placeholder={"ФИО"}
            registerName={"username"}
          />
          <InputTextBox
            label={"Телефон"}
            placeholder={"Телефон"}
            registerName={"phone"}
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
          <SubmitButton disabled={!methods.formState.isDirty} >Сохранить</SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}
