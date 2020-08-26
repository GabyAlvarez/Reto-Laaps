import React from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory, Link } from "react-router-dom";
import 'materialize-css';

const Menu = () => {
    const firebase= useFirebaseApp();
    const history = useHistory();

    const logout = async () => {
        await firebase.auth().signOut();
        history.push("/");
        window.location.reload(true)
    }
    
    return (
        <div>
            <ul className="right hide-on-med-and-down">
            <Link to="/">
                <li><a className="black-text" href="#">Inicio</a></li>      
            </Link>
            <Link to="/UpdateUserProfile">
                <li><a className="black-text" href="#">Mi perfil</a></li>      
            </Link>
            <Link to="/UpdateCardData">
                <li><a className="black-text" href="#">Mi auto</a></li>      
            </Link>
            <Link to="/Pendiente">
                <li><a className="black-text" href="#">Mis servicios</a></li>      
            </Link>
            </ul>
            <button onClick = { e =>logout(e)} className="btn-menu">Logout</button>
        </div>
    )
}

export default Menu
