import {FormProvider, useForm} from "react-hook-form";
import classes from "../PersonalAccount.module.scss";
import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";

export default function ApplicationForm({userData}) {
  const defaultForm = {};
  defaultForm.age = userData.anketa?.age;
  defaultForm.weight = userData.anketa?.weight;
  defaultForm.height = userData.anketa?.height;
  defaultForm["des_weight"] = userData.anketa["des_weight"];
  defaultForm.activity = userData.anketa.activity;

  const methods = useForm({defaultValues: defaultForm});

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
            label={"Возраст"}
            placeholder={"00 лет"}
            registerName={"age"}
          />
          <InputTextBox
            label={"Вес (кг)"}
            placeholder={"00 кг"}
            registerName={"weight"}
          />
          <InputTextBox
            label={"Рост (см)"}
            placeholder={"000 см"}
            registerName={"height"}
          />
          <InputTextBox
            label={"Желаемый вес (кг)"}
            placeholder={"00 кг"}
            registerName={"des_weight"}
          />

          <label className={classes.label}>Активность</label>
          <select className={classes.input} {...methods.register("activity")}>
            <option value="0">Как часто занимаетесь спортом</option>
            <option value="1">Минимальная (не тренируюсь)</option>
            <option value="2">Низкая (1-2 раза в неделю)</option>
            <option value="3">Средняя (3-4 раза в неделю)</option>
            <option value="4">Высокая (5-6 раз в неделю)</option>
            <option value="5">Предельная (7 раз в неделю)</option>
          </select>
          <SubmitButton disabled={!methods.formState.isDirty}>
            Сохранить
          </SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}
