import React, {Fragment, useState, useEffect} from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import Login from './components/login/Login';
import CreateCount from './components/login/CreateCount';
import Home from './components/home/Home';
import { getUserStorage } from './Commons/userUtils'


function App() {

  const [haveAcount, setHaveAcount] = useState(false);
  const [isLoggin, setIsLoggin] = useState(false);

  return (
    <Fragment>
      {
        isLoggin ? <Home /> : haveAcount ? <Login setHaveAcount={setHaveAcount} setIsLoggin={setIsLoggin}/> : 
        <CreateCount setHaveAcount={setHaveAcount} setIsLoggin={setIsLoggin}/> 
      }

    </Fragment>
  );
}
export default App;
