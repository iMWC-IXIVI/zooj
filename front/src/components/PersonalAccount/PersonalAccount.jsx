import ApplicationForm from "./ApplicationForm/ApplicationForm";
import classes from "./PersonalAccount.module.scss";

import PersonalForm from "./PersonalForm/PersonalForm";

export default function PersonalAccount() {
  return (

      <div className={classes.container_main}>
        <PersonalForm />
        <ApplicationForm />
      </div>

  );
}
