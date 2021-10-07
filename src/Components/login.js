import React, { useContext, useState } from "react";
import { Link ,Redirect} from "react-router-dom";
import { AuthContext } from "./Auth";
import { firebaseApp} from "./Config.js";
import FormButton, { FormInput, FormHeader, OtherComponents } from "./FormButton";


const Form = () => {
    const [showpasswordtype, setpasswordtype] = useState("password");
    return (<div>
        <FormInput description="Email" placeholder="Enter your email" type="email" name="email" /><br /><br />
        <FormInput description="Password" placeholder="Enter your password" type={showpasswordtype} name="password" /><br /><br />
        <div className="float-end mx-5">
            <input type="checkbox" onClick={(e) => {
                if (showpasswordtype === "password") {
                    setpasswordtype("text");
                } else if (showpasswordtype === "text") {
                    setpasswordtype("password");
                }
            }} />Show Password</div>
        <br />
        <FormButton title="Log in" type="submit" />
    </div>)
};
const LogIn = () => {

    const { currentUser } = useContext(AuthContext);
    
    const [passwordWrong, setpasswordWrong] = useState(null);
    const handleSubmit = (e) => {
        let today = new Date();
        let counter = today.getTime();
        let id = counter += 1;

        e.preventDefault();
        const { email, password } = e.target.elements;
        firebaseApp.auth().signInWithEmailAndPassword(email.value, password.value).then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            if (user.emailVerified) {
                window.location = '/Dashboard';
            } else {
                alert("Your emails is not verified. Please do verify.")
            }
        }).catch(error => {
            setpasswordWrong("Check email or password");
            console.log("Error !");
        })
    }
    if (currentUser) {
        return <Redirect to="/dashboard"/>;
      }
    return (<div>

        <center><h1>KPRIET MENTEES TRACKING SYSTEM </h1></center>

        <form onSubmit={handleSubmit}>
            <div id="loginform">
                <FormHeader title="Login" />
                <Form />
                <p className="centerText">
                    <Link to="/forgot">Lost Your Password ?</Link>
                </p>
                <p className="centerTextRed">{passwordWrong}</p>
                <OtherComponents name="Sign Up" link="signUp" value="Dont have an account" />
            </div>
        </form>
    </div>);
};

export default LogIn;