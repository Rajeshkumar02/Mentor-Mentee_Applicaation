import React, { useContext, } from 'react';
import { firebaseApp } from "./Config";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";

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
            <h1>Hello, {currentUser._delegate.displayName} Welcome back !</h1><br />
            <button onClick={addmentee}>Addmentee</button><br />
            <button onClick={list}>List</button><br />
            <button onClick={log}>Log</button><br />
            <button className="btn btn-danger float-end mt-0 mx-2" onClick={() => firebaseApp.auth().signOut()}>Sign out</button><br /><br />
        </div>
    );
}

export default Dashboard;