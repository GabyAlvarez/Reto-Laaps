import React, { useState } from 'react'
//import logo from '../assets/image/logo.png';
import {useFirebaseApp, useUser} from 'reactfire';
import  { setUserStorage, getUserStorage } from '../../Commons/userUtils'
import { useHistory } from 'react-router-dom';
import styles from './createcount.module.css';
import logo from '../../assets/images/Logo.png';

const CreateCount = ({setHaveAcount,setIsLoggin}) => {
    const history = useHistory();  
    const firebase = useFirebaseApp();
    const db = firebase.firestore();
    

    const [name, setName] = useState('');
    const[ email, setEmail] = useState('');
    const[ password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validateFields = () => {
        if(!name || !email || !password || !confirmPassword){
            console.log("Favor de verificar los compos");
        } else{
            if(password === confirmPassword) {
                createAcount()
            }else {
                console.log("Favor de verificar password");
            }
        }

    }

    const createAcount = async () => {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, password).then(exitoCallback, (error) => {
                    console.log("Ya existe una cuenta con este E-mail " + error )
            });
    }

    const exitoCallback = async () => {
        // Guarda en la BDD
        await db.collection("Users").add({
            name: name,
            email: email,
            rol: "cliente"
        }).then(() => {
              console.log("Insert in BDD end. ")
        });

        // Guardamos el usuario en LocalStorage
        await db.collection("Users").where("email", "==", email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let user = doc.data()
                    user['id'] = doc.id
                    setUserStorage(user)
                    console.log("Insert in storage end. " + getUserStorage())
                });
            }).catch(function(error) {
                console.log("Error getting documents: ", error)
            });  

        let rol = getUserStorage().rol
        let order = await db.collection("Users").doc(getUserStorage().id)

        order.get().then((doc) => {
            console.log(doc.data())
        });

        switch(rol) {
            case "cliente":
                console.log("Eres cliente")
                history.push("/MainView");
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
        <div className={styles.newAcountContainer} id="createCount">
            <div className="row">
                <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                    <img src={logo} className={styles.logo} alt="logo" />
                </div>
            </div>
                
                <div className="row">
                    <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                        <label for="username">Nombre:</label> <br/>
                        <input type="text" className={styles.loginInput} id="name" onChange={(ev) => setName(ev.target.value) } />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s8 offset-s2 m8  offset-m2" style={{textAlign: 'center'}}>
                        <label for="username">Correo:</label> <br/>
                        <input type="email" className={styles.loginInput} id="email" onChange={(ev) => setEmail(ev.target.value) } />
                    </div>
                </div>
               
                <div className="row">
                    <div className="col s8 offset-s2 m8 offset-m2" style={{textAlign: 'center'}}>
                        <label for="username">Contraseña:</label> <br/>
                        <input type="password" className={styles.loginInput} id="password" onChange={ (ev) => setPassword(ev.target.value) }/>
                    </div>
                </div>

               
                <div className="row">
                    <div className="col s8 offset-s2 m8 offset-m2" style={{textAlign: 'center'}}>
                        <label for="username">Confirmar contraseña:</label> <br/>
                        <input type="password" className={styles.loginInput} id="confirmPassword" onChange={ (ev) => setConfirmPassword(ev.target.value) }/>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s6 offset-s3  m8  offset-m2" style={{textAlign: 'center'}}>
                        <button className={styles.btnNewUser} onClick={validateFields}>Registrarme</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col s6 offset-s3  m8  offset-m2" style={{textAlign: 'center'}}>
                        <button className={styles.btnText} onClick= {() => setHaveAcount(true) } >Ya tengo cuenta</button>
                    </div>
                </div>

                 
        </div>
    )
}

export default CreateCount