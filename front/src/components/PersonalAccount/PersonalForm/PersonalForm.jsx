import {FormProvider, useForm} from "react-hook-form";
import classes from "../PersonalAccount.module.scss";
import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import AccountApi from "../../../services/PersonalAccount";

export default function PersonalForm({userData}) {
  if (!userData.user.phone) {
    userData.user.phone = "+7";
  }

  const methods = useForm({defaultValues: userData.user});

  const onSubmit = (data) => {
    delete data.id;
    AccountApi.updateUser(data);
  };

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
          <button type="submit"
            disabled={!methods.formState.isDirty}
            className={`${classes.form_user_btn} ${methods.formState.isDirty? classes.active: null}`}
          >
            Сохранить
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
