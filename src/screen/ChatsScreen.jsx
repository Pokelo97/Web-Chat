import React, {useState,useEffect} from 'react'
import { ChatEngine } from 'react-chat-engine';
import {auth} from '../firebase/firebase'
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
//components
import FormDialog from '../component/DialogComponent';
import CSnackbar from '../component/SnackbarComponent';

const Chats = ({history}) =>{
  const {user} = useAuth();
  const [loading , setLoading] = useState(true)
  const [open, setOpen] = React.useState();
  const [message,setMessage]=useState();

  const [snackbaropen, setSnackbarOpen] = React.useState(false);
  const severity="success";
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleClose= () => {
    setOpen(false);
  };
  const verf =()=>{
    var users = auth.currentUser;
    
    users.sendEmailVerification().then(function() {
        setMessage("Verification link sent to your email. Kinldy check to verify your account")
        setOpen(false);
        setSnackbarOpen(true)
    })
  }

  const getFile = async(url)=>{
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data],'userPhoto.jpg',{type:'image/jpeg'});
  }

  useEffect(()=>{
      if(user) setOpen(!user.emailVerified)
      if(!user){
          history.push('/')
          return;
      }
      axios.get('https://api.chatengine.io/users/me',{
          headers:{
              "project-id":process.env.PROJECTID,
              "user-name":user.email,
              "user-secret":user.uid
          }
      })
      .then(()=>{
          setLoading(false)
      })
      .catch(()=>{
          let formdata = new FormData()
          formdata.append('email',user.email);
          formdata.append('username',user.email);
          formdata.append("first_name", user.displayName)
          formdata.append('secret',user.uid);
          getFile(user.photoURL)
            .then((avater)=>{
                formdata.append('avater',avater,avater.name)
                console.log(avater)
                axios.post('https://api.chatengine.io/users',formdata,{
                    headers:{
                        "private-key":process.env.PRIVATEKEY
                    }
                }).then(()=>setLoading(false))
            })
        
      })
  },[user,history])
  if(!user||loading) return 'Loading...'
  return(
      <div>
        <FormDialog
            open={open} 
            handleClose={handleClose} 
            verf={verf} 
        /> 
        <ChatEngine 
            height="calc(100vh - 60px"
            projectID={process.env.PROJECTID}
            userName={user.email}
            userSecret={user.uid}
        />
        <CSnackbar
              open={snackbaropen}
              message={message} 
              handleClose={handleSnackbarClose}
              severity={severity}
        />
    </div>

  )
}
export default Chats;