import React, {useState, useEffect} from 'react'
import firebase from '../../config/firebaseConfig'
import 'firebase/firestore'
import 'firebase/storage'
import './userProfile.css'
import imageIcon from './images/BotonSubirImg.png'

function UpdateCarData() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState(''); 
  const [plate, setPlate] = useState('');
  const [pictureUri, setPictureUri] = useState(imageIcon);
  
  return (
      <div className="update-user-profile">
        <label for="userPicture" className='user-picture'>
          <img src={pictureUri} className="" alt="" title=""></img>
        </label>
        <input 
          type="file" 
          className="user-picture-input" 
          id="userPicture" 
          name="img" 
          accept="image/*"
          
        /><br/>       
        <label for="marca">Marca:</label> <br/>
        <input 
          type="text" 
          id="marca" 
          value={brand}
          onChange={(e)=>{setBrand(e.target.value)}}
        >          
        </input><br/>
        <label for="modelo">Modelo:</label> <br/>
        <input 
          type="text" 
          id="modelo" 
          value={model}
          onChange={(e)=>{setModel(e.target.value)}}
        ></input><br/>
        <label for="color">Color:</label> <br/>
        <input 
          type="text" 
          id="color" 
          value={color}
          onChange={(e)=>{setColor(e.target.value)}}
        ></input><br/>
        <label for="placa">Placa:</label> <br/>
        <input 
          type="text" 
          id="placa" 
          value={plate}
          onChange={(e)=>{setPlate(e.target.value)}}
        ></input><br/>
        <input 
          type="button" 
          value="Guardar"
          className='save-btn'
          
        >
        </input>
      </div>
  )
}

export default UpdateCarData;