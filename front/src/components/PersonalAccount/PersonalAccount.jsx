import { useState, useEffect} from "react";
// import ApplicationForm from "./ApplicationForm/ApplicationForm";
import classes from "./PersonalAccount.module.scss";

import PersonalForm from "./PersonalForm/PersonalForm";
import AccountApi from "../../services/PersonalAccount";

export default function PersonalAccount() {
  const [userData, setUserData] = useState();

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
        {/* <ApplicationForm userData={userData} /> */}
     
      </>
      ): null }
      
    </div>
  );
}
