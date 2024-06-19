import { FormProvider, useForm } from "react-hook-form";
import classes from "./Form.module.scss";
// import Button from "../../../../Buttons/Button/Button";

export default function Form() {
    const methods = useForm()
    return(
        <div className={classes.gender_form}>
            <div className={classes.header}>
            <h3>Укажите Ваш пол</h3>
            <div className={classes.number_form}>1/3</div>
            </div>
            <p>Это поможет нам правильно подобрать рацион</p>
            <FormProvider {...methods} >
                <form className={classes.form}>
                    <button>Мужчина</button>

                    <button>Женщина</button>
                </form>
            </FormProvider>

        </div>
    )
}