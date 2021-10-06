import { db } from './Config';
import React, { useState, useContext, useEffect, } from 'react';
import { AuthContext } from "./Auth";
import Axios from "axios"

function Logdetials() {
    const [todos, setTodos] = useState([]);
    const [products, setProducts] = useState([]);

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

    const fetchProducts = async () => {
        const { data } = await Axios.get(
            "https://sheet.best/api/sheets/d05d6de2-752f-4217-83d1-40f542f3b4f7"
        );
        const products = data;
        setProducts(products);
    };


    if (val === 0) {
        setval(1);
        Fetchdata();
        fetchProducts();
    }

    var num = todos.length;
    function Show() {
        products.map((pro) => {
            for (var i = 0; i < num; i++) {
                if (pro.RollNo === todos[i]) {
                    console.log("Name : ", pro.Name);
                    console.log("Roll Number : ", pro.RollNo);
                    console.log("Time : ", pro.Time);
                }
            }
        })
    };
    return (
        <div>
            {Show()}
        </div>
    );
}

export default Logdetials;