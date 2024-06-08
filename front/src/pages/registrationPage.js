import React from "react";
import "../App.css"
// import Header from '../components/header';

function registrationPage(){
    return (
        <>
        {/* <Header/> */}
        <form>
            <input placeholder="username"></input>
            <input placeholder="email"></input>
            <input placeholder="tel number"></input>
            <input placeholder="password"></input>
            <input placeholder="confirm password"></input>
        </form>
        </>
        
    )
}

export default registrationPage;