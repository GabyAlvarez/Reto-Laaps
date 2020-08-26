import React, {useState, useEffect} from 'react'
import firebase from '../../config/firebaseConfig'
import 'firebase/firestore'
import 'firebase/storage'
import './userProfile.css'
import imageIcon from './images/BotonSubirImg.png'

const db = firebase.firestore();

function UpdateCarData() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState(''); 
  const [plate, setPlate] = useState('');
  const [carData, setCarData] = useState('');
  const [pictureUri, setPictureUri] = useState(imageIcon);
  const [pictureFile, setPictureFile] = useState('');
  const [uid, setUid] = useState('');

  function updatePicture(setPictureUri){
    console.log('foto');
  
    const userPicture = document.getElementById('userPicture');
    console.log(userPicture.files[0]);
    setPictureFile(userPicture.files[0]);
    if (userPicture.files.length != 0){
     
      let reader = new FileReader();
      reader.onload = function () {
        setPictureUri(reader.result);
      }
      reader.readAsDataURL(userPicture.files[0]);
     
    }else{
      console.log('no foto');
      setPictureUri(imageIcon);
      setPictureFile('');
    }
  }

  function fecthUserData(uid){
    console.log(uid);
    
    db.collection("Users").where("uid", "==", uid).get()
    .then((querySnapshot)=> {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        updateData(doc.id);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    }); 
  }

  function updateData(userDocId){
    if(brand && model && color && plate && pictureFile){
      console.log('puedo subir datos de auto')
      const storage = firebase.storage();
      const imgRef = storage.ref('images');
      const date = new Date();
      const idImg = date.getTime();
      const token =  idImg+'_'+pictureFile.name
      console.log(token);
     
      imgRef.child(token).put(pictureFile)
      .then(snap => {
        return snap.ref.getDownloadURL();
      })
      .then(link => {
        console.log(link);
        db.collection('Users').doc(userDocId).update({
          car:{
            carPicture: link, 
            brand: brand,
            model: model,
            color: color,
            plate: plate
          }
        })        
        .then(()=>{
          console.log('data enviada correctamente')
        })
        .catch(err=>{
          console.log('error al subir data',err);
        })
      })
      .catch((error)=> {
        console.log("Error al guardar imagen: " + error);
      });
    }else{
      console.log('no se llenaron todos los campos');
    }
  }

  useEffect(() => {
    
    const fetchData = async (userId) => {
      //const db = firebase.firestore();
      const data = await db.collection('Users').get()
      const users = data.docs.map(doc =>  doc.data())
      const userFilter = users.filter(user => user.uid === userId)
      setCarData(userFilter[0])
      setUid(userId);
      console.log(userFilter[0].car)
      if(userFilter[0].car){
        console.log(); 
        //setPictureUri(userFilter[0].picture)
        setBrand(userFilter[0].car.brand);
        setModel(userFilter[0].car.model);
        setColor(userFilter[0].car.color);
        setPlate(userFilter[0].car.plate);
        setPictureUri(userFilter[0].car.carPicture);
      }
    }
  
    const user = firebase.auth().currentUser;
    if (user != null) {
      console.log(user.uid);
      const userId = user.uid 
      fetchData(userId)
    }


  },[])

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
          onChange={()=>updatePicture(setPictureUri)}
        /><br/>       
        <div>
          <label className="label" for="marca">Marca:</label> <br/>
          <input 
            type="text" 
            id="marca" 
            value={brand}
            onChange={(e)=>{setBrand(e.target.value)}}
          >          
          </input>
        </div>    
          <br/>
        <div>  
          <label className="label" for="modelo">Modelo:</label> <br/>
          <input 
            type="text" 
            id="modelo" 
            value={model}
            onChange={(e)=>{setModel(e.target.value)}}
          ></input>
        </div>    
          <br/>
        <div>
          <label className="label" for="color">Color:</label> <br/>
          <input 
            type="text" 
            id="color" 
            value={color}
            onChange={(e)=>{setColor(e.target.value)}}
          ></input>
        </div>    
          <br/>
        <div>
          <label className="label" for="placa">Placa:</label> <br/>
          <input 
            type="text" 
            id="placa" 
            value={plate}
            onChange={(e)=>{setPlate(e.target.value)}}
          ></input>
        </div>    
          <br/>
        <input 
          type="button" 
          value="Guardar"
          className='save-btn'
          onClick={()=> fecthUserData(uid)}
        >
        </input>
      </div>
  )
}

export default UpdateCarData;