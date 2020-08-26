import React from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from "react-router-dom";
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
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">Logo</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
            <button onClick = { e =>logout(e)} className="btn-menu">Logout</button>
        </div>
    )
}

export default Menu
