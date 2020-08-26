import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UpdateUserProfile from './components/userProfile/UpdateUserProfile'

const Routes = () => {
    return (
       <Switch>
           <Route path="/UpdateUserProfile" component={UpdateUserProfile}/>
       </Switch>

    )
}

export default Routes
