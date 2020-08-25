import React from 'react';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'


const DragMaterialize = () => {


    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
    });


    return (
        <div>
            <nav>
                <div className="nav-wrapper  green accent-1">
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">Javascript</a></li>
                        <li><a href="mobile.html">Mobile</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li className="center-align"><img src="assets/logo-laaps-ejemplo.jpg" alt="logo-laaps" width="210" /></li>
                <li><a href="sass.html">Perfil</a></li>
                <li><a href="badges.html">Pagos</a></li>
                <li><a href="collapsible.html">Información de servicio</a></li>
                <li><a href="mobile.html">Cerrar sesión</a></li>
            </ul>
        </div>
    );
}

export default DragMaterialize