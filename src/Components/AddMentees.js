import React, { useState, useContext } from 'react';
import { db, firebaseApp } from "./Config";
import { AuthContext } from "./Auth";
import { Redirect, Link } from "react-router-dom";

const OtherComponents = (props) => {
    return (<div >
        <button className="btn btn-warning float-right ml-2"><Link style={{ textDecoration: 'none',color: "black" }} to={props.link}>{props.name}</Link></button>
    </div>)
}


function AddMentee() {


    const { currentUser } = useContext(AuthContext);

    const [Mentee_Name, setMentee_Name] = useState("");
    const [M_Roll_Number, setM_Roll_Number] = useState("");
    const [M_F_Number, setM_F_Number] = useState("");
    const [M_M_Number, setM_M_Number] = useState("");
    const [M_Number, setM_Number] = useState("");
    const [M_Email, setM_Email] = useState("");

    const handler = async (event) => {
        event.preventDefault();
        db.collection(currentUser._delegate.uid).doc(M_Roll_Number).set(
            {
                Name: Mentee_Name,
                Roll_Number: M_Roll_Number,
                Phone_Student: M_Number,
                Student_Email: M_Email,
                Father_Number: M_F_Number,
                Mother_Number: M_M_Number,
                Mentor_Name: currentUser._delegate.displayName,
            }
        ).then(res => { deleteVal() })

    }
    const deleteVal = async (event) => {
        alert("Mentee added sucessfully");
        setMentee_Name("");
        setM_Roll_Number("");
        setM_F_Number("");
        setM_M_Number("");
        setM_Number("");
        setM_Email("");


    }
    if (!currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container mt-2">
            <OtherComponents className="btn btn-warning float-right ml-2" name="List" link="list" />
            <div className="row justify-content-center align-items-center text-center p-2">
                <div className="m-1 col-sm-8 col-md-6 col-lg-4 shadow-sm p-3 mb-5 bg-white border rounded" >
                    <div className="pt-5 pb-5">
                        <img className="rounded mx-auto d-block"
                            src="https://www.kpriet.ac.in/asset/frontend/images/logo/logo.png"
                            alt="" style={{ width: 100 + "px", height: 100 + "px" }} />
                        <p className="text-center text-uppercase mt-3">KPRIET MENTEES TRACKING SYSTEM</p>
                        <p className="text-center text-uppercase mt-3">Add Mentee's</p>
                        <form onSubmit={handler}>
                            <div className="form-group input-group-md">
                                <input type="text" className="form-control" placeholder="Mentee Name" name="name" value={Mentee_Name} onChange={(e) => setMentee_Name(e.target.value)} required />
                            </div>
                            <div className="form-group input-group-md">
                                <input type="text" className="form-control" placeholder="Mentee Roll No" name="name" value={M_Roll_Number} onChange={(e) => setM_Roll_Number(e.target.value)} required />
                            </div>
                            <div className="form-group input-group-md">
                                <input type="text" className="form-control" placeholder="Mentee Ph.Number" name="name" value={M_Number} onChange={(e) => setM_Number(e.target.value)} required />
                            </div>
                            <div className="form-group input-group-md">
                                <input type="text" className="form-control" name="name" placeholder="Mentee Email" value={M_Email} onChange={(e) => setM_Email(e.target.value)} required />
                            </div>
                            <div className="form-group input-group-md">
                                <input type="text" className="form-control" name="name" placeholder="Mentee Father Ph.Number" value={M_F_Number} onChange={(e) => setM_F_Number(e.target.value)} required />
                            </div>
                            <div className="form-group input-group-md">
                                <input type="text" className="form-control" name="name" placeholder="Mentee Mother Ph.Number" value={M_M_Number} onChange={(e) => setM_M_Number(e.target.value)} />
                            </div>
                            <center><input className="btn btn-lg btn-block btn-primary mt-4" type="submit" value="Submit" /></center>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddMentee;
