import {FormProvider, useForm} from "react-hook-form";
import classes from "../PersonalAccount.module.scss";
import InputTextBox from "../../Inputs/InputTextBox/InputTextBox";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";
import AccountApi from "../../../services/PersonalAccount";

export default function ApplicationForm({userData}) {
  function anketaData(obj) {
    const defData = ["gender",
      "age",
      "weight",
      "des_weight",
      "height",
      "activity",]
      if(obj === null){
        let res = {}
        for(let key of defData){
          res[key] = ""
        }
      return res
    }
    for (let key in obj) {
          if(!defData.includes(key)){
            delete obj[key]
          }
    }
    return obj
  }
  userData = anketaData(userData.anketa);

  const methods = useForm({defaultValues: userData});

  const onSubmit = (data) => {
    AccountApi.updateUserFrom(data).then(res => console.log(res))
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
          <label className={classes.label}>Пол</label>
          <select className={classes.input} {...methods.register("gender")} >
              <option value={""} disabled selected>Выберете орентицию</option>
              <option value={"М"}>Мужской</option>
              <option value={"Ж"}>Женский</option>
          </select>


          <label className={classes.label}>Активность</label>
          <select className={classes.input} {...methods.register("activity")}>
            <option value="" disabled selected>Как часто занимаетесь спортом</option>
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
