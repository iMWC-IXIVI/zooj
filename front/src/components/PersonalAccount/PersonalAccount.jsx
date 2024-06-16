import ApplicationForm from "./ApplicationForm/ApplicationForm";
import classes from "./PersonalAccount.module.scss";

import PersonalForm from "./PersonalForm/PersonalForm";

export default function PersonalAccount() {
  return (
    <div className={classes.personal_account}>
      <h3>Личные данные</h3>
      <div className={classes.container_main}>
        <PersonalForm />
        <ApplicationForm />
      </div>
    </div>
  );
}
