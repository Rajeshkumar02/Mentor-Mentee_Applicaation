import { db } from './Config';
import React, { useState, useContext, useEffect, } from 'react';
import { AuthContext } from "./Auth";

import { Redirect, Link } from "react-router-dom";

const OtherComponents = (props) => {
    return (
        <div >
            <button className="btn btn-warning float-right ml-2"><Link style={{ textDecoration: 'none', color: "black" }} to={props.link}>{props.name}</Link></button>
        </div>
    )
}
const Data = (props) => {
    var s = "";
    for (var i = 0; i < props.todo.length; i++) {
        s += props.todo[i];
    }
    if (s.includes(props.roll)) {
        return (<div>
            <div className="card" style={{ width: 18 + "rem" }}>
                <div class="card-body">
                    <p class="card-text">
                        Name : {props.name}<br />
                        Roll : {props.roll}<br />
                        Time : {props.time}<br />
                        Date : {props.date}</p>
                </div>
            </div>
            <br></br>

        </div>)
    }
    return (
        <br></br>
    )
};
function Logdetials() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [val, setval] = useState(0);
    function Fetchdata() {
        const { currentUser } = useContext(AuthContext);

        if (!currentUser) {
            return <Redirect to="/" />;
        }
        
        const getFromFirebase = db.collection(currentUser._delegate.uid);
        getFromFirebase.onSnapshot((querySnapShot) => {
            const saveFirebaseTodos = [];
            querySnapShot.forEach((doc) => {
                saveFirebaseTodos.push(doc.id);
            });
            setTodos(saveFirebaseTodos);
        });
    }

    useEffect(() => {
        fetch("https://sheet.best/api/sheets/91a05f03-799d-4cd4-94ae-1d265d39f23e")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (val === 0) {
        setval(1);
        Fetchdata();
    }
    return (
        <div>
            <div className="container mt-2">
                <OtherComponents name="Dashboard" link="dashboard" />
                < div className="row justify-content-center align-items-center text-center p-2">
                    <div className="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white rounded" >
                        <div className="pt-5 pb-5">
                            <img className="rounded mx-auto d-block"
                                src="https://www.kpriet.ac.in/asset/frontend/images/logo/logo.png"
                                alt="" style={{ width: 100 + "px", height: 100 + "px" }} />
                            <p className="text-center text-uppercase mt-3">KPRIET MENTEES TRACKING SYSTEM</p>
                            <b className="text-center text-uppercase mt-3">Log Detials</b><br /><br />
                            {items.map((pro) => (<Data name={pro.Name} roll={pro.RollNo} time={pro.Time} date={pro.Date} todo={todos} />))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logdetials;