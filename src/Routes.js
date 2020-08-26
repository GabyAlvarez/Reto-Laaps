import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UpdateUserProfile from './components/userProfile/UpdateUserProfile'
import UpdateCardData from './components/userProfile/UpdateCardData'
import MainView from './components/home/MainView'

const Routes = () => {
    return (
       <Switch>
           <Route path="/mainView" component={MainView}/>
           <Route path="/UpdateUserProfile" component={UpdateUserProfile}/>
           <Route path="/UpdateCardData" component={UpdateCardData}/>
       </Switch>
    )
}

export default Routes
