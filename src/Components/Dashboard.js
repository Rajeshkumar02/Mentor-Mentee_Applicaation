import React, { useContext, } from 'react';
import { firebaseApp } from "./Config";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";
import "./Button.css"

function Dashboard() {

    const { currentUser } = useContext(AuthContext);

    let history = useHistory();

    const addmentee = () => {
        history.push('/addmentee')
    }
    const list = () => {
        history.push('/list')
    }
    const log = () => {
        history.push('/log')
    }
    if (!currentUser) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <div className="container mt-2">
                <button className="btn btn-warning float-right ml-2" onClick={() => firebaseApp.auth().signOut()}>Sign out</button><br /><br />
                < div className="row justify-content-center align-items-center text-center p-2">
                    <div className="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white rounded" >
                        <div className="pt-5 pb-5">
                            <img className="rounded mx-auto d-block"
                                src="https://www.kpriet.ac.in/asset/frontend/images/logo/logo.png"
                                alt="" style={{ width: 100 + "px", height: 100 + "px" }} /><br />
                            <b className="text-center text-uppercase mt-3">KPRIET MENTEES TRACKING SYSTEM</b>
                            <p className="text-center text-uppercase mt-3">Hello, {currentUser._delegate.displayName} Welcome back !</p><br />

                            <div className="buttons1">
                                <button className="btn_a btn-1_a" onClick={addmentee}>Add Mentee</button><br />
                                <button className="btn_a btn-3_a" onClick={list}>List Of Mentee's</button><br />
                                <button className="btn_a btn-2_a" onClick={log}>Log Detials</button><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;