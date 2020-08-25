import React, { useState } from 'react';
//import  from '../assets/image/logo.png';
// import {useFirebaseApp, useUser} from 'reactfire';
import { useFirebaseApp } from 'reactfire';
import { useHistory, Link } from "react-router-dom";
import { setUserStorage, getUserStorage } from '../../Commons/userUtils';



const Login = ({ setIsLoggin, setHaveAcount }) => {
    const history = useHistory();
    const firebase = useFirebaseApp();
    const db = firebase.firestore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(exitoLogin(email), () => {
                console.log("Hubo un error al consultar en BDD")
            });
    }

    const exitoLogin = async (email) => {
        // Guardamos LocalStorage
        await db.collection("Users").where("email", "==", email)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let user = doc.data();
                    user['id'] = doc.id;
                    setUserStorage(user)
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        let rol = getUserStorage().rol

        switch (rol) {
            case "cliente":
                console.log("Eres cliente")
                history.push("/");
                // history.push("/Products");
                break;
            case "Trabajador":
                console.log("Eres trabajador")
                break;
            default:
                history.push("/");
        }
    }

    // Observador de estado
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            setIsLoggin(true)
        } else {
            setUserStorage(null)
            setIsLoggin(false)
        }

    });

    return (
        <div className="login-container">
            <div className="login-input">
                <div className="logo-circle">
                    {/* <img src={logoBurger} className="app-logo" alt="logo" /> */}
                </div>

                <input type="email" id="email" placeholder="Email" onChange={(ev) => setEmail(ev.target.value)} />
                <input type="password" id="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} />

                <button className="btn-menu" onClick={login}>Login</button>
                <p>¿No tienes cuenta?</p>
                <button className="btn-menu"
                    onClick={() => setHaveAcount(false)} >Registrate</button>
            </div>
        </div>
    );
}

export default Login;