import { useState, useEffect} from "react";
import ApplicationForm from "./ApplicationForm/ApplicationForm";
import classes from "./PersonalAccount.module.scss";

import PersonalForm from "./PersonalForm/PersonalForm";
import AccountApi from "../../services/PersonalAccount";

export default function PersonalAccount() {
  const [userData, setUserData] = useState({
    "user": {
        "id": 4,
        "email": "zooj@yandex.ru",
        "username": null,
        "phone": null,
        "address": null,
        "birthday": null
    },
    "anketa": {
        "user": 4,
        "gender": "Ж",
        "age": 25,
        "weight": 62,
        "des_weight": 61,
        "height": 163,
        "activity": 5,
        "calorie": 2313.2,
        "protein": 173.49,
        "fats": 77.11,
        "carbohydrates": 231.32
    }
});

  useEffect(() => {
    AccountApi.getUser().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setUserData(res.data);
      }
    });
  }, []);
  return (
    <div className={classes.container_main}>
      {userData ? (
        <>
       
        <PersonalForm userData={userData} />
        <ApplicationForm userData={userData} />
     
      </>
      ): null }
      
    </div>
  );
}
