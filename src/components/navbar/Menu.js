import React from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from "react-router-dom";

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
            <button onClick = { e =>logout(e)} className="btn-menu">Logout</button>
        </div>
    )
}

export default Menu
