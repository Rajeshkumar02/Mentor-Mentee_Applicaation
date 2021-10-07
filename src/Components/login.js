import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import { firebaseApp } from "./Config.js";
import FormButton, { FormInput, FormHeader, OtherComponents } from "./FormButton";


const Form = () => {
    const [showpasswordtype, setpasswordtype] = useState("password");
    return (<div>
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
        <FormButton title="Log in" type="submit" />
    </div>
    )
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
        return <Redirect to="/dashboard" />;
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
                        <form className="form text-center" onSubmit={handleSubmit}>
                            <div id="loginform">
                                <FormHeader title="Login" />
                                <Form />
                                <p className="float-right mt-2">
                                    <Link to="/forgot">Lost Your Password ?</Link>
                                </p>
                                <p className="centerTextRed">{passwordWrong}</p>
                            </div>
                        </form>
                    </div>
                    <OtherComponents name="Sign Up" link="signUp" value="Dont have an account" />
                </div>
            </div>
        </div>
    );
};

export default LogIn;