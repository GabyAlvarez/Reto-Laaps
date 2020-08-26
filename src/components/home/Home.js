import React from 'react'
import Menu from '../navbar/Menu'
//import Navbar from '../navbar/Navbar'
import Routes from '../../Routes'
import MainView from './MainView'

const Home = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <Menu />
            <Routes />
        </div>
    )
}

export default Home
