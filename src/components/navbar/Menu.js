import React from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory, Link } from "react-router-dom";
import 'materialize-css';

const Menu = () => {
    const firebase = useFirebaseApp();
    const history = useHistory();

    const logout = async () => {
        await firebase.auth().signOut();
        history.push("/");
        window.location.reload(true)
    }

    return (
        <div>
            <ul className="right hide-on-med-and-down">

                <li><Link className="black-text" to="/">Inicio</Link></li>

                <li><Link className="black-text" to="/UpdateUserProfile">Mi perfil</Link></li>

                <li><Link className="black-text" to="/UpdateCardData">Mi auto</Link></li>

                <li> <Link className="black-text" to="/Services">Mis servicios</Link></li>
            </ul>
            <button onClick={e => logout(e)} className="btn-menu">Logout</button>
        </div>
    )
}

export default Menu
