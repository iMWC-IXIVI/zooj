import {FormProvider, useForm} from "react-hook-form";
import classes from "../PersonalAccount.module.scss";
import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";

export default function ApplicationForm() {
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
          <h3>Анкета</h3>
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
          <label className={classes.label}>Активность</label>
          <select className={classes.input}>
            <option disabled selected>Как часто занимаетесь спортом</option>
            <option >Минимальная (не тренируюсь)</option>
            <option>Низкая (1-2 раза в неделю)</option>
            <option>Средняя (3-4 раза в неделю)</option>
            <option>Высокая (5-6 раз в неделю)</option>
            <option>Предельная (7 раз в неделю)</option>
          </select>

          <SubmitButton>Сохранить</SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}
