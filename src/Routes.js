import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UpdateUserProfile from './components/userProfile/UpdateUserProfile'
import UpdateCardData from './components/userProfile/UpdateCardData'
import MainView from './components/home/MainView'
import Layout from './components/geolocation/Layout'

const Routes = () => {
    return (
       <Switch>
           <Route path="/MainView" component={MainView}/>
           <Route path="/UpdateUserProfile" component={UpdateUserProfile}/>
           <Route path="/UpdateCardData" component={UpdateCardData}/>
           <Route path="/Services" component={Layout}/>
       </Switch>
    )
}

export default Routes
