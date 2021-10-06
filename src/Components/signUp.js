import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// import Recaptcha from "react-recaptcha";
import FormButton, { FormInput, FormHeader, OtherComponents } from "./FormButton";
import { AuthContext } from "./Auth";
import { firebaseApp } from "./Config.js";
import { db } from "./Config.js";

const Form = props => {
    const [showpasswordtype, setpasswordtype] = useState("password");
    return (<div>
        <FormInput description="name" placeholder="Enter your name" type="text" name="name" />
        <FormInput description="rollnumber" placeholder="Enter your Rollnumber" type="text" name="rollnumber" />
        <FormInput description="Email" placeholder="Enter your email" type="email" name="email" />
        <FormInput description="Password" placeholder="Enter your password" type={showpasswordtype} name="password" />
        <div className="float-end mx-5">
            <input type="checkbox" onClick={(e) => {
                if (showpasswordtype === "password") {
                    setpasswordtype("text");
                } else if (showpasswordtype === "text") {
                    setpasswordtype("password");
                }
            }} />Show Password</div>
        <br />
        <FormButton title="Sign Up" type="submit" />
    </div>)
};

const SignUp = () => {
    const [userExists, alreadyUserExists] = useState(null);
    const [now, setNow] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, rollnumber, email, password } = e.target.elements;
        firebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
            if (userCredential.user) {
                userCredential.user.updateProfile({
                    displayName: name.value
                })
            }
                setNow(false);
                db.collection("Mentor_List").doc(userCredential.user.uid).set({ Name: name.value, StafId: rollnumber.value, Email: email.value, password: password.value }).then(() => {
                    firebaseApp.auth().signOut();
                    userCredential.user.sendEmailVerification().then(() => {
                        alert("Verification Email is send");
                        setRedirect(true);
                    }).catch(() => {

                        alert("Try after some time")
                    })
                }).catch((err) => {
                    if (err.message === "The email address is badly formatted.") {
                        alert(err.message);
                        console.log(err.message);
                    } else {
                        alert(err.message);
                        console.log(err.message);
                    }
                })
            }).catch((err) => {
                if (err.message === "Password should be at least 6 characters") {
                    alert(err.message);
                    console.log(alert.message);
                } else if (err.message === "The email address is already in use by another account.") {
                    console.log("User already exist");
                    alert(err.message);
                    alreadyUserExists(true);
                } else {
                    alert(err.message);
                }
            })
    };
    if (redirect) {
        return <Redirect to="/Login" />;
    }
    if (currentUser) {
        if (now)
            return <Redirect to="/" />;
    }
    if (userExists) {
        return <Redirect to="/Login" />;
    }

    return (<div>

        <form onSubmit={handleSubmit}>
            <div id="loginform">
                <FormHeader title="Register" />
                <Form />
                <OtherComponents name="Login" link="Login" value="Already have an account" />
            </div>
        </form>
    </div>);
};

export default SignUp;