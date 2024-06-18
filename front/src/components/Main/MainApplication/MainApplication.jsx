import classes from "./MainApplication.module.scss";
import SpecifyGenderForm from "./SpecifyGenderForm/SpecifyGender";




export default function MainApplication() {
  return (
    <div className={classes.main_form}>
        <SpecifyGenderForm />
        
    </div>
  );
}
