import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import firebaseConfig  from './config/firebaseConfig';
import { FirebaseAppProvider } from 'reactfire';
import { BrowserRouter } from 'react-router-dom';

const WhitRouter = () => <BrowserRouter><App /></BrowserRouter>

ReactDOM.render(
  (
  <FirebaseAppProvider firebaseConfig={ firebaseConfig }>
  <Suspense fallback={<p>Cargando...</p>}>
  <WhitRouter />
  </Suspense>
  </FirebaseAppProvider>
  ), document.getElementById('root')
);

//serviceWorker.unregister();
