import React ,{useState} from 'react'
import CreateUserComponent from '../component/CreateUserComponent'
//firebase
import { auth } from '../firebase/firebase';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CSnackbar from '../component/SnackbarComponent';

import {useStyles} from '../Styles'

const CreateUser = ({history},props) =>{
  const classes = useStyles(props);
  const [values, setValues] = useState({
    name:{value:"", error:false,message:""},
    surname:{value:"", error:false,message:""},
    email:{value:"", error:false,message:""},
    password: {value:"", error:false,message:""},
    confirmPassword:{value:"", error:false,message:""},
    role:"user",
  });
  const [errMessage,setErrMessage]=useState({
    message:'',
    error:false
  })
  const [show,setShow] = useState({
    confirmPassword:false,
    password:false,
  });
  const [open, setOpen] = React.useState(false);
  const severity="error";
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSignIn =()=>{
    history.push('/')
  }
  const handleClickShowConfirmPassword = () => {
      show.confirmPassword? setShow({confirmPassword:false}): setShow({confirmPassword:true})
  };
  const handleClickShowPassword = () => {
      show.password? setShow({password:false}): setShow({password:true})
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (e) => {
    e.preventDefault();
    let errorFlag=false;
    let errM=""
    if(e.target.value===""){
  		errorFlag=true;
      errM="Is Required"
  	}
    if(e.target.value.length >0){
      if((e.target.id==="name" || e.target.id==="surname") && e.target.value.length < 3 ){
          errorFlag=true;
          errM="Minimum  of 3 characters is required!";
      }
      if(e.target.id==="email" && (!(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.target.value)))){
        errorFlag=true;
        errM="Email is not valid."
      }
      if (e.target.id==="password" && e.target.value.length < 6){
        errorFlag=true;
        errM="Password should have minimum 6 characters!"
      }
      if (e.target.id==="confirmPassword" && e.target.value !== values.password.value){
        errorFlag=true;
        errM="The passwords do not match!"
      }
    }
  	setValues({...values, [prop]:{value:e.target.value.trim(),error: errorFlag,message:errM}});
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
      if(values.name.error||
          values.surname.error||
          values.password.error||
          values.email.error||
          values.confirmPassword.error){
        console.log("err")
        setErrMessage("please fill in the empty fields")
      }else{
        auth.createUserWithEmailAndPassword(values.email.value,values.password.value)
        .then((authenticate)=>{
            authenticate.user.updateProfile({
                displayName: values.name.value +" "+values.surname.value 
              })
              .then(() => history.push('/chats'))
              .catch((error) => {
                setErrMessage(error.message);
                setOpen(true);});
        })
        .catch((err)=> {
          setErrMessage(err.message);
          setOpen(true);})
      }
  }
  return(
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>
          <br/>
          <CSnackbar
            open={open}
            message={errMessage}
            handleClose={handleClose}
            severity={severity}
          />
          <CreateUserComponent 
              handleChange={handleChange}
              handleSubmit = {handleSubmit}
              handleSignIn={handleSignIn}
              handleMouseDownPassword ={handleMouseDownPassword}
              handleClickShowPassword ={handleClickShowPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              show= {show}
              values = {values}
          />
        </Paper>
      </div>
    </Container>
  )
}
export default CreateUser;