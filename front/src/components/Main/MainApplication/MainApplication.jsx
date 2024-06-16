import classes from "./MainApplication.module.scss";
import OneForm from "./OneForm/OneForm";


export default function MainApplication() {
  return (
    <div className={classes.main_form}>
      <OneForm />
    </div>
  );
}
