import classes from "./InputTextBox.module.scss";
import {useFormContext} from "react-hook-form";

export default function InputTextBox({
  placeholder,
  label,
  type,
  message,
  children,
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
      {label ? <label className={classes.text_box_label}>{label}</label> : null}
      <input
        {...register(`${registerName}`, registerValidate)}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        className={classes.text_box_input }
      />
      {error ? (
        <p className={classes.text_box_message}>{error}</p>
      ) : message ? (
        <p className={classes.text_box_message}>{message}</p>
      ) : null}
      {children ? (
        <div className={classes.control_box_input}>{children}</div>
      ) : null}
    </div>
  );
}
