import React, { useState } from 'react';
import {useFirebaseApp} from 'reactfire';
import { useHistory } from "react-router-dom";
import { setUserStorage, getUserStorage } from '../../Commons/userUtils';
import styles from './createcount.module.css'
import logo from '../../assets/images/Logo.png';

const Login = ({setIsLoggin, setHaveAcount}) => {
    const history = useHistory();    
    const firebase = useFirebaseApp();
    const db = firebase.firestore();

    const[ email, setEmail] = useState('');
    const[ password, setPassword] = useState('');

    const login = async () => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(exitoLogin(email))
            .catch(err => errorLogin(err))
    }

    const errorLogin = (err) => {
        console.log("error"+err)
    }

    const exitoLogin = async (email) => {
        // Guardamos LocalStorage
        await db.collection("Users").where("email", "==", email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let user = doc.data();
                    user['id'] = doc.id;
                    setUserStorage(user)
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
        });

        let rol = getUserStorage() ? getUserStorage().rol : "noLoginExito"
       
        switch(rol) {
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
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setIsLoggin(true)
        } else {
            setUserStorage(null)
            setIsLoggin(false)
        }
        
    });

    return ( 
        <div className={styles.newAcountContainer}>
            <div className="row">
                <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                    <img src={logo} className={styles.logo} alt="logo" />
                </div>
            </div>

                <div className="row">
                    <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                        <label for="username">Correo electronico:</label> <br/>
                        <input type="email" id="email" className={styles.loginInput} onChange={(ev) => setEmail(ev.target.value) } />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                        <label for="username">Ccontraseña:</label> <br/>
                        <input type="password" id="password" className={styles.loginInput} onChange={ (ev) => setPassword(ev.target.value) }/>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s8 offset-s2 m8 offset-m2" style={{textAlign: 'center'}}>
                        <button className={styles.btnNewUser} onClick={login}>Iniciar sesión</button>
                        {/* <p>¿No tienes cuenta?</p> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col s8 offset-s2  m8 offset-m2" style={{textAlign: 'center'}}>
                        <button className={styles.btnText}
                        onClick={() => setHaveAcount(false)} >Quiero registrarme</button>
                    </div>
                </div>

        </div>
        
    )
}
 
export default Login;