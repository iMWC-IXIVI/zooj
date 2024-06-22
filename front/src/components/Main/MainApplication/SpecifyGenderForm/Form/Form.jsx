import classes from "./Form.module.scss";


export default function Form({setGender}) {
  
    return(
        <div className={classes.gender_form}>
            <div className={classes.header}>
            <h3>Укажите Ваш пол</h3>
            <div className={classes.number_form}>1/3</div>
            </div>
            <p>Это поможет нам правильно подобрать рацион</p>
     
                <form className={classes.form}>
                    <button className={classes.btn} onClick={()=>{setGender("М")}}>Мужчина</button>

                    <button className={classes.btn} onClick={()=>{setGender("Ж")}}>Женщина</button>
                </form>
        </div>
    )
}