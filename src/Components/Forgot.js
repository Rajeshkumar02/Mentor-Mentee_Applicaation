import React, { useState } from 'react';
import {firebaseApp} from "./Config";

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
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td>EMAIL:</td>
                        <td><input type="email" name="email" onChange={(e) => setEmail(e.target.value)} /></td>
                    </tr>
                    <tr></tr>
                    <tr><td><input type="submit" value="submit" name="submit" /></td></tr>
                </table>
            </form>
        </div>
    );
}

export default Forgot;
