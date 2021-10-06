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
            "https://sheet.best/api/sheets/fe4e988a-6ec3-4e35-9e8b-fed798e3de04"
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
