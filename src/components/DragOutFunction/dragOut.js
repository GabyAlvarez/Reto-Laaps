import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/css/menu.css';


const DragOutFunction = () => {

    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }

    });

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">

                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="assets/logo-laaps-ejemplo.jpg" height="28" />
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>


                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Perfil
                        </a>

                        <a className="navbar-item">
                            Cuenta
		                </a>

                        <a className="navbar-item">
                            Ruta
		                </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Cerrar sesión</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
            <Link to="/dragout">
                <button>Enviar</button>
            </Link>
        </div>
    );
}

export default DragOutFunction;