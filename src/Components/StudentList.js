import { db } from './Config';
import React, { useState, useContext, } from 'react';
import { AuthContext } from "./Auth";
import { Redirect, Link } from "react-router-dom";
import { firebaseApp } from './Config';

const OtherComponents = (props) => {
    return (
        <div >
            <button className="btn btn-warning float-right ml-2"><Link style={{ textDecoration: 'none', color: "black" }} to={props.link}>{props.name}</Link></button>
        </div>)
}

function StudentList() {
    const { currentUser } = useContext(AuthContext);
    const [info, setInfo] = useState([]);
    const [val, setval] = useState(0);
    if (!currentUser) {
        return <Redirect to="/" />;
    }
    const Fetchdata = () => {
        db.collection(currentUser._delegate.uid).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
            });
        })
    }
    if (val === 0) {
        setval(1);
        Fetchdata();
    }

    return (

        <div>
            <div className="container mt-2">
                <OtherComponents name="Log Details" link="log" />
                < div className="row justify-content-center align-items-center text-center p-2">
                    <div className="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white rounded" >
                        <div className="pt-5 pb-5">
                            <img className="rounded mx-auto d-block"
                                src="https://www.kpriet.ac.in/asset/frontend/images/logo/logo.png"
                                alt="" style={{ width: 100 + "px", height: 100 + "px" }} /><br />
                            <p className="text-center text-uppercase mt-3">KPRIET MENTEES TRACKING SYSTEM</p>
                            <b className="text-center text-uppercase mt-3">Student Detial's</b><br /><br />

                            {

                                info.map((data) => (

                                    <Frame

                                        name={data.Name}

                                        rollnumber={data.Roll_Number}

                                        email={data.Student_Email}

                                        studentphone={data.Phone_Student}

                                        fatherphone={data.Father_Number}

                                        motherphone={data.Mother_Number} />

                                ))

                            } </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
}

const Frame = ({ name, rollnumber, email, studentphone, fatherphone, motherphone }) => {


    return (

        <div>
            <div className="card" style={{ width: 18 + "rem" }}>
                <div class="card-body">
                    <p class="card-text">
                        Name : {name} <br />
                        Roll_Number : {rollnumber}<br />
                        Email : {email}<br />
                        Phone (Student): {studentphone}<br />
                        phone (Father): {fatherphone}<br />
                        Phone(Mother) : {motherphone}<br /></p>
                </div>
            </div>
            <br></br>

        </div>

    );
}

export default StudentList;