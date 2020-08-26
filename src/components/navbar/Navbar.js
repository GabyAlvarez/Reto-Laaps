import React, { useEffect } from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory, Link } from "react-router-dom";
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import styles from './nav.module.css'
import logo from '../../assets/images/Logo.png';


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
                <div className="nav-wrapper   indigo accent-2 black-text">
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><Link className="black-text" to="/MainView">Inicio</Link></li>

                        <li><Link className="black-text" to="/UpdateUserProfile">Mi perfil</Link></li>

                        <li><Link className="black-text" to="/UpdateCardData">Mi auto</Link></li>

                        <li> <Link className="black-text" to="/Services">Mis servicios</Link></li>

                        <li><button onClick={e => logout(e)} className={styles.btnText}>Logout</button></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li className="center-align"><img src={logo} className={styles.logo} alt="logo" /></li>
                <li><Link className="black-text" to="/MainView">Inicio</Link></li>

                <li><Link className="black-text" to="/UpdateUserProfile">Mi perfil</Link></li>

                <li><Link className="black-text" to="/UpdateCardData">Mi auto</Link></li>

                <li> <Link className="black-text" to="/Services">Mis servicios</Link></li>

                <li className="endSessionDrag"><button onClick={e => logout(e)} className={styles.btnText}>Logout</button></li>
            </ul>

        </div>
    );
}

export default Navbar;