import React from 'react'
//import Menu from '../navbar/Menu'
import Navbar from '../navbar/Navbar'
import UpdateUserProfile from '../userProfile/UpdateUserProfile'
import UpdateCarData from '../userProfile/UpdateCarData'

const Home = () => {
    return (
        <div>
            <Navbar />
            {/* <Menu /> */}
            <h2>Y los routes</h2>
            {/*<UpdateUserProfile/>*/}
            <UpdateCarData/>
        </div>
    )
}

export default Home
