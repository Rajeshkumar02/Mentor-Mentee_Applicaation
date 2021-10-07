import React, { useState } from 'react';
import { firebaseApp } from "./Config";
import FormButton, { FormInput, FormHeader, OtherComponents } from "./FormButton";

function Forgot() {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        firebaseApp.auth().sendPasswordResetEmail(email)
            .then(function () {
                alert('Please check your email...')
            }).catch(function (e) {
                console.log(e)
            })
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
                        <p className="text-center text-uppercase mt-3">Forgot Password</p>
                        <form className="form text-center" onSubmit={handleSubmit}>
                            <div class="form-group input-group-md">
                                <input className="form-control" type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <input className="btn btn-lg btn-block btn-primary mt-4" type="submit" value="submit" name="submit" />
                        </form>
                    </div>
                    <OtherComponents name="Log In" link="login" value="Go to Log In" />
                </div>
            </div>
        </div>
    );
}

export default Forgot;
