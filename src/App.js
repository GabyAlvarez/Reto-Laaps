import React from 'react';
import logo from './logo.svg';
import './App.css';
import UpdateUserProfile from '../src/components/userProfile/UpdateUserProfile'
import 'firebase/firestore'

function App() {
  return (
    <UpdateUserProfile/>
  );
}

export default App;
