import React, { useEffect } from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory, Link } from "react-router-dom";
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import styles from './nav.module.css'


const Navbar = () => {
    const firebase = useFirebaseApp();
    const history = useHistory();

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
    });

    const logout = async () => {
        await firebase.auth().signOut();
        history.push("/");
        window.location.reload(true)
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper  green accent-1 black-text">
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><Link className="black-text" to="/">Inicio</Link></li>

                        <li><Link className="black-text" to="/UpdateUserProfile">Mi perfil</Link></li>

                        <li><Link className="black-text" to="/UpdateCardData">Mi auto</Link></li>

                        <li> <Link className="black-text" to="/Services">Mis servicios</Link></li>

                        <li><button onClick={e => logout(e)} className={styles.btnText}>Logout</button></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li className="center-align"><img className="imgDragOut" src="assets/logo-laaps-ejemplo.jpg" alt="logo-laaps" width="210" /></li>
                <li><Link className="black-text" to="/">Inicio</Link></li>

                <li><Link className="black-text" to="/UpdateUserProfile">Mi perfil</Link></li>

                <li><Link className="black-text" to="/UpdateCardData">Mi auto</Link></li>

                <li> <Link className="black-text" to="/Services">Mis servicios</Link></li>

                <li className="endSessionDrag"><button onClick={e => logout(e)} className="btn-menu">Logout</button></li>
            </ul>

        </div>
    );
}

export default Navbar;