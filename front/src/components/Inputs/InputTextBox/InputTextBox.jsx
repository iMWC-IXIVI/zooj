import classes from "./InputTextBox.module.scss";
import {useFormContext} from "react-hook-form";

export default function InputTextBox({
  placeholder,
  label,
  type,
  message,
  error,
  registerName,
  registerValidate,
  defaultValue,
}) {
  const {register} = useFormContext();
  return (
    <div
      className={`${classes.text_box} ${error ? classes.text_box_error : null}`}
    >
      {label ? <label className={classes.label}>{label}</label> : null}
      <input
        {...register(`${registerName}`, registerValidate)}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        className={classes.input }
      />
      {error ? (
        <p className={classes.text_box_message}>{error}</p>
      ) : message ? (
        <p className={classes.text_box_message}>{message}</p>
      ) : null}
    </div>
  );
}
