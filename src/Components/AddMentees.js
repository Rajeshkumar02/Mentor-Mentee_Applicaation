import React, { useState, useContext } from 'react';
import { db, firebaseApp } from "./Config";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";



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
        )

    }
    if (!currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <form onSubmit={handler}>
                <label>
                    Student Name:<br></br>
                    <input type="text" name="name" onChange={(e) => setMentee_Name(e.target.value)} required />
                </label><br />
                <label>
                    Roll Number :<br></br>
                    <input type="text" name="name" onChange={(e) => setM_Roll_Number(e.target.value)} required />
                </label><br />
                <label>
                    Mobile Nmumber (Student) : <br></br>
                    <input type="text" name="name" onChange={(e) => setM_Number(e.target.value)} required />
                </label><br />
                <label>
                    Email Id (Student) : <br></br>
                    <input type="text" name="name" onChange={(e) => setM_Email(e.target.value)} required />
                </label><br />
                <label>
                    Mobile Number (Father) : <br></br>
                    <input type="text" name="name" onChange={(e) => setM_F_Number(e.target.value)} required />
                </label><br />
                <label>
                    Mobile Number (Mother) : <br></br>
                    <input type="text" name="name" onChange={(e) => setM_M_Number(e.target.value)} />
                </label><br />
                <center><input className="btn button" type="submit" value="Submit" /></center>
            </form>
            <button className="btn btn-danger float-end mt-0 mx-2" onClick={() => firebaseApp.auth().signOut()}>Sign out</button><br /><br />
        </div>
    );
}

export default AddMentee;
