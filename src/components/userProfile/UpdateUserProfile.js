import React, {useState, useEffect} from 'react'
import firebase from '../../config/firebaseConfig'
import 'firebase/firestore'
import 'firebase/storage'
import './userProfile.css'
import imageIcon from '../../assets/images/BotonSubirImg.png'

const db = firebase.firestore();

function fecthUserData(phone,uid, setUserDataId, pictureUri, pictureProfile, setPictureProfile){
  console.log('hola');
  
  db.collection("Users").where("uid", "==", uid).get()
  .then((querySnapshot)=> {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserDataId(doc.id);
      updateUserData(phone,doc.id, pictureUri, pictureProfile, setPictureProfile);
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  }); 
}

function updateUserData(phone, userDocId, pictureFile, pictureProfile, setPictureProfile){
  
  if(pictureFile){
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
      if(phone.length == 10){
        console.log('voy a subir phone');
        console.log(phone, link);
        db.collection('Users').doc(userDocId).update({
          phone:phone,
          picture: link
        })
        .then(()=>{
          console.log('num enviada correctamente')
        }).catch(err=>{
          console.log('error al subir num',err);
        })
      }else{
        console.log('Número de teléfono no válido');
      }
    })
    .catch((error)=> {
      console.log("Error al guardar imagen: " + error);
    });
  }else{
    if(phone.length == 10){
      console.log('voy a subir phone');
      
      db.collection('Users').doc(userDocId).update({
        phone:phone,
        picture: ''
      })
      .then(()=>{
        console.log('num enviada correctamente')
      }).catch(err=>{
        console.log('error al subir num',err);
      })
    }else{
      console.log('Número de teléfono no válido');
    }
  }
}

function UpdateUserProfile() {
  const [userData, setUserData] = useState('');
  const [phone, setPhone] = useState('');
  const [pictureUri, setPictureUri] = useState(imageIcon);
  const [pictureFile, setPictureFile] = useState('');
  const [pictureProfile, setPictureProfile] = useState('');
  const [uid, setUid] = useState('');
  const [userDataId, setUserDataId] = useState('');
  
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
  
  useEffect(() => {
    const fetchData = async (userId) => {
      //const db = firebase.firestore();
      const data = await db.collection('Users').get()
      const users = data.docs.map(doc =>  doc.data())
      const userFilter = users.filter(user => user.uid === userId)
      setUserData(userFilter[0])
      setUid(userId);
      console.log(userFilter[0])
      if(userFilter[0].picture){
         setPictureUri(userFilter[0].picture)
      }
      if(userFilter[0].phone){
        setPhone(userFilter[0].phone);
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
        <label className="label" for="username">Nombre:</label> <br/>
        <input type="text" id="username" value={userData.name}></input>
      <div>
      <br/>
      </div>
        <label className="label" for="mail">Correo:</label> <br/>
        <input type="text" id="mail" value={userData.email}></input><br/>
      <div>
      <br/>
      </div>
        <label className="label" for="phone">Teléfono:</label> <br/>
        <input 
          type="text" 
          id="phone" 
          onChange={(e)=>{
            if(e.target.value.match(/\d/gi) &&  e.target.value.length <= 10){
              setPhone(e.target.value);
            }else{
              setPhone(phone.slice(0,));
            }
          }}
          value={phone}         
        ></input>
      </div>        
      <br/>
      <input 
        type="button" 
        value="Guardar"
        className='save-btn'
        onClick={()=>fecthUserData(phone,uid, setUserDataId, pictureFile, pictureProfile, setPictureProfile)}
      >
      </input>
    </div>
  )
}

export default UpdateUserProfile;