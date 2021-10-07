import { db } from './Config';
import React, { useState, useContext, useEffect, } from 'react';
import { AuthContext } from "./Auth";

import { Redirect ,Link} from "react-router-dom";

const OtherComponents = (props) => {
    return (<div >
        <button>
      <Link to={props.link}>{props.name}</Link></button>    
  
    </div>)
  }
const Data = (props) => {
    var s ="";
    for(var i=0;i<props.todo.length;i++){
        s+=props.todo[i];
    }
    if(s.includes(props.roll)){
    return (<div>
      <h1>Name = {props.name}</h1>
      <h1>Roll = {props.roll}</h1>
      <h1>Time = {props.time}</h1>

    </div>)}
    return(
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
        const getFromFirebase = db.collection(currentUser._delegate.uid);
        getFromFirebase.onSnapshot((querySnapShot) => {
            const saveFirebaseTodos = [];
            querySnapShot.forEach((doc) => {
                saveFirebaseTodos.push(doc.id);
            });
            setTodos(saveFirebaseTodos);
        });
    }

<<<<<<< HEAD
    useEffect(() => {
        fetch("https://sheet.best/api/sheets/91a05f03-799d-4cd4-94ae-1d265d39f23e")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
=======
    const fetchProducts = async () => {
        const { data } = await Axios.get(
            "https://sheet.best/api/sheets/fe4e988a-6ec3-4e35-9e8b-fed798e3de04"
        );
        const products = data;
        setProducts(products);
    };
>>>>>>> bace78ecbcc840773ebc76afcba6bcb7a572d21a


    if (val === 0) {
        setval(1);
        Fetchdata();
    }

    //var num = todos.length;
    // function Show() {
    //     products.map((pro) => {
    //         for (var i = 0; i < num; i++) {
    //             if (pro.RollNo in todos) {

    //                 console.log(pro.RollNo);
    //                 console.log(pro.Name);
    //                 console.log(pro.Time);
    //                 console.log(pro.Date)

    //             }
    //         }
    //     })
    // };

    return (
        <div>
            <OtherComponents name="Dashboard" link="dashboard"/>
            {items.map((pro) => (<Data name={pro.Name} roll={pro.RollNo} time={pro.Time} todo={todos}/>))}
        </div>
    );
}

export default Logdetials;
