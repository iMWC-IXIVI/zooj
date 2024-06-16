import classes from "./RoundButtonEmpty.module.scss";

export default function RoundButtonEmpty({children, onClick}){
    return(
        <button className={classes.button} onClick={onClick}>
            {children}
        </button>
    )
}