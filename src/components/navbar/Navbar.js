import React from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from "react-router-dom";
//import 'materialize-css';
//import 'materialize-css/dist/css/materialize.min.css';
//import M from 'materialize-css/dist/js/materialize.min.js';


const Navbar = () => {

    const firebase= useFirebaseApp();
    const history = useHistory();

    // document.addEventListener('DOMContentLoaded', function () {
    //     var elems = document.querySelectorAll('.sidenav');
    //     var instances = M.Sidenav.init(elems);
    // });

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
                        <li><a className="black-text" href="sass.html">Inicio</a></li>
                        <li><a className="black-text" href="badges.html">Mi perfil</a></li>
                        <li><a className="black-text" href="collapsible.html">Mis autos</a></li>
                        <li><a className="black-text" href="collapsible.html">Ayuda</a></li>
                        <li><a className="black-text" href="mobile.html">Cerrar sesión</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li className="center-align"><img className="imgDragOut" src="assets/logo-laaps-ejemplo.jpg" alt="logo-laaps" width="210" /></li>
                <li><a href="sass.html">Inicio</a></li>
                <li><a href="badges.html">Mi perfil</a></li>
                <li><a href="collapsible.html">Mis autos</a></li>
                <li><a href="collapsible.html">Ayuda</a></li>
                <li className="endSessionDrag"><a href="mobile.html">Cerrar sesión</a></li>
            </ul>
        </div>
    );
}

export default Navbar;