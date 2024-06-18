import Form from "./Form/Form";
import classes from "./SpecifyGenderForm.module.scss";
import UserReviews from "./UserReviews/UserReviews";
// import plate_one from "../../../../images/plate_one.png"

export default function SpecifyGenderForm() {
  return (
    <div className={classes.gender_container}>
      <div className={classes.text_info}>
        <h3>Пeрсональная <br /> программа питания</h3>
        <p>
          Поможем Вам собрать полезный и питательный рацион из супов,<br/> салатов,
          напитков, десертов и блюд по методу Гарвардской тарелки.
        </p>
      </div>
      <Form />
      <UserReviews />
    </div>
  );
}
