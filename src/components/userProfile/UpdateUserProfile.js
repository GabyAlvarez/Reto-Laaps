import React, {useState, useEffect} from 'react'
import firebase from '../../config/firebaseConfig'
import 'firebase/firestore'

function UpdateUserProfile() {
  const [userData, setUserData] = useState('');
  const [phone, setPhone] = useState('');
  const [pictureUri, setPictureUri] = useState('');

  function updateUserData(phone){
    console.log('hola');
    
    if(phone.length == 10){
      console.log('voy a subir phone');
      const db = firebase.firestore();
      db.collection('users').doc('oAhnrUaxcLYFpYl7tCz6').update({
        phone:phone
      }).then(()=>{
        console.log('num enviada correctamente')
      }).catch(err=>{
        console.log('error al subir num',err);
       })
    }else{
        console.log('Número de teléfono no válido');
    }
  
  }
  
  function updatePicture(setPictureUri){
    console.log('foto');
    const userPicture = document.getElementById('userPicture');
    console.log(userPicture.files);
  
    if (userPicture.files.length != 0){
      let reader = new FileReader();
      reader.onload = function () {
        setPictureUri(reader.result);
        
        /*
        let removeImg = document.getElementsByClassName("remove-img")[0];
        removeImg.onclick = function() {
          let image = ``
          imagesContainer.innerHTML = image;
          imagePost.value = null;
          console.log("Usuario quitó img:" + imagePost.value);
          validate();
        }*/
  
      }
      reader.readAsDataURL(userPicture.files[0]);
     
    }else{
      console.log('no foto');
    }
  }

    useEffect(() => {
      const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection('users').get()
        const users = data.docs.map(doc =>  doc.data())
        const userFilter = users.filter(user => user.id === 1)
        setUserData(userFilter[0])
        //console.log(userFilter[0])
      }
      fetchData()
    },[])

    return (
        <div>
          <label for="userPicture">f</label>
          <input 
          type="file" 
          class="load-img" 
          id="userPicture" 
          name="img" 
          accept="image/*"
          onChange={()=>updatePicture(setPictureUri)}  
          /><br/>
          <img src={pictureUri} className="" alt="" title=""></img>
          <label for="username">Nombre:</label> <br/>
          <input type="text" id="username" value={userData.username}></input><br/>
          <label for="mail">Correo:</label> <br/>
          <input type="text" id="mail" value={userData.mail}></input><br/>
          <label for="phone">Teléfono:</label> <br/>
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
          ></input><br/>
          <input 
          type="button" 
          value="Guardar"
          onClick={()=>updateUserData(phone)}
          >
          </input>

        </div>
    )
}

export default UpdateUserProfile;

