import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import DragOutFunction from './components/DragOutFunction/dragOut';
import DragMaterialize from './components/DragMaterialize/dragmaterialize';
import Geolocation from './components/Geolocation/geolocation';
import Layout from './componentsGeo/Map/Layout';




function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <DragOutFunction />
        </Route>

        <Route exact path="/dragout">
          <DragMaterialize />
        </Route>

        <Route exact path="/maps">
          <Geolocation />
        </Route>

        <Route exact path="/mapbox">
          <Layout />
        </Route>

      </Switch>
    </Router>
  );
}



export default App;
