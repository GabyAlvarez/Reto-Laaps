import React, { useState } from 'react'
//import logo from '../assets/image/logo.png';
import {useFirebaseApp} from 'reactfire';
import  { setUserStorage, getUserStorage } from '../../Commons/userUtils'
import { useHistory } from 'react-router-dom';

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
        let uid = ('');
        const user = firebase.auth().currentUser;
        if (user != null) {
            console.log(user.uid);
            uid = user.uid 
        }
        await db.collection("Users").add({
            name: name,
            email: email,
            rol: "cliente",
            uid: uid
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

        switch(rol) {
            case "cliente":
                console.log("Eres cliente")
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
        <div className="login-container">
            <div className="login-input">
                <div className="logo-circle">
                    {/* <img src={logo} className="logo" alt="logo" /> */}
                </div> 
                <input type="text" id="name" placeholder="Nombre" onChange={(ev) => setName(ev.target.value) } />
                <input type="email" id="email" placeholder="Email" onChange={(ev) => setEmail(ev.target.value) } />
                <input type="password" id="password" placeholder="Password" onChange={ (ev) => setPassword(ev.target.value) }/>
                <input type="password" id="confirmPassword" placeholder="Confirm Password" onChange={ (ev) => setConfirmPassword(ev.target.value) }/>
                <button className="btn-newUser" onClick={validateFields}>Create Account</button>
                <button className="btn-newUser" onClick= {() => setHaveAcount(true) } > Inicia sesion</button>
            </div>
        </div>
    )
}

export default CreateCount