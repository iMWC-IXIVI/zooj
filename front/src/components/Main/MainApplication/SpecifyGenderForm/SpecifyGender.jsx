import Form from "./Form/Form";
import classes from "./SpecifyGenderForm.module.scss";
import UserReviews from "./UserReviews/UserReviews";
import Mask_group from "../../../../images/Mask_group.png";

export default function SpecifyGenderForm({setGender}) {
  const riversData = [
    {
      rating: 5,
      date: "12 июня 2022",
      message: "Очень вкусный салат!  Обязательно куплю еще",
    },
    {
      rating: 5,
      date: "12 июня 2022",
      message: "Очень вкусный салат!  Обязательно куплю еще",
    },
    {
      rating: 5,
      date: "12 июня 2022",
      message: "Очень вкусный салат!  Обязательно куплю еще",
    },
    {
      rating: 5,
      date: "12 июня 2022",
      message: "Очень вкусный салат!  Обязательно куплю еще",
    },
    {
      rating: 5,
      date: "12 июня 2022",
      message: "Очень вкусный салат!  Обязательно куплю еще",
    },
  ];
  return (
    <div className={classes.gender_container}>
      <div className={classes.information}>
        <div className={classes.text_info}>
          <h3>
            Пeрсональная <br /> программа питания
          </h3>
          <p>
            Поможем Вам собрать полезный и питательный рацион из супов,
            <br /> салатов, напитков, десертов и блюд по методу Гарвардской
            тарелки.
          </p>
        </div>
        <Form setGender={setGender} />
        <div className={classes.reviews}>
          {riversData.map((data) => (
            <UserReviews riversData={data} />
          ))}
        </div>
      </div>
      <div className={classes.img_box}>
        <img src={Mask_group} alt="qwe" />
      </div>
    </div>
  );
}
