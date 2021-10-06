import { db } from './Config';
import React, { useState,useContext,} from 'react';
import { AuthContext } from "./Auth";

function StudentList() {
    const { currentUser } = useContext(AuthContext);
    const [info, setInfo] = useState([]);
    const [val, setval] = useState(0);
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

            <center>

                <h2>Student Details</h2>

            </center>

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

            }

        </div>
    );
}

const Frame = ({ name, rollnumber, email, studentphone, fatherphone,motherphone }) => {


    return (

        <center>

            <div>
                Name : {name} <br />
                Roll_Number : {rollnumber}<br />
                Email : <a href='mailto: {email}'>{email}</a><br />
                Phone (Student): {studentphone}<br />
                phone (Father): {fatherphone}<br />
                Phone(Mother) : {motherphone}<br />
            </div>
            <br></br>

        </center>

    );
}

export default StudentList;