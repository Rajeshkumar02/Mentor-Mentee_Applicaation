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
        <div className="form-group input-group-md">
            <FormInput className="form-control" description="name" placeholder="Enter your name" type="text" name="name" />
        </div>
        <div className="form-group input-group-md">
            <FormInput className="form-control" description="rollnumber" placeholder="Enter your Rollnumber" type="text" name="rollnumber" />
        </div>
        <div className="form-group input-group-md">
            <FormInput className="form-control" description="Email" placeholder="Enter your email" type="email" name="email" />
        </div>
        <div className="form-group input-group-md">
            <FormInput className="form-control" description="Password" placeholder="Enter your password" type={showpasswordtype} name="password" />
        </div>
        <div className="float-right mt-2">
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

    return (
        <div className="container mt-2">
            < div className="row justify-content-center align-items-center text-center p-2">
                <div className="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white border rounded" >
                    <div className="pt-5 pb-5">
                        <img className="rounded mx-auto d-block"
                            src="https://www.kpriet.ac.in/asset/frontend/images/logo/logo.png"
                            alt="" style={{ width: 100 + "px", height: 100 + "px" }} />
                        <p className="text-center text-uppercase mt-3">KPRIET MENTEES TRACKING SYSTEM</p>
                        <form onSubmit={handleSubmit}>
                            <div id="loginform">
                                <FormHeader title="Register" />
                                <Form />
                            </div>
                        </form>
                    </div>
                    <OtherComponents name="Login" link="Login" value="Already have an account" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;