import React ,{useState} from 'react'
import { useHistory } from "react-router-dom";
//material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
//material-ui/icons
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Facebook from '@material-ui/icons/Facebook';
import Visibility from '@material-ui/icons/Visibility';
//firebase
import firebase from 'firebase/app'
import { auth } from '../firebase/firebase';

import CSnackbar from '../component/SnackbarComponent';

const useStyles = makeStyles((theme) => ({
  root: {
      margin: theme.spacing(1),
  },
}));

const LoginComponent = ()=> {
  const classes = useStyles();
  const [showPassword,setShowPassword] = useState(false);
  const [errorMessage,setErrorMessage] =useState({
    message:"",
    errorStatus:false
  });
  const [values, setValues] = useState({
    email:{value:"", error:false,message:""},
    password: {value:"", error:false,message:""},
  });
  const [open, setOpen] = React.useState(false);
  const severity="error";
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleChange = (prop) => (e) => {
    e.preventDefault();
    let errorFlag=false;
    let errM=""
    if(e.target.value===""){
  		errorFlag=true;
      errM="Is Required"
  	}
    if(e.target.id==="email" && (!(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.target.value)))){
      errorFlag=true;
      errM="Email is not valid."
    }
  	setValues({...values, [prop]:{value:e.target.value.trim(),error: errorFlag,message:errM}});
  };

  const handleClickShowPassword = () => {
    showPassword? setShowPassword(false): setShowPassword(true)
  };

  const handleMouseDownPassword = (event) => event.preventDefault(); 
  
  const LoginHandler = ()=>{
    if(!(values.email.error && values.password.error)){
      auth.signInWithEmailAndPassword(values.email.value,values.password.value)
      .catch((error)=> {
        setErrorMessage({message:error.message,errorStatus:true})
        setOpen(true)
      })
    }
  }
  const history = useHistory();
  const SignUpHandler = () => {
    history.push('/createuser')
  }

  return (
    <div className={classes.root}  >
      <Grid container spacing={2} justifyContent="center">
        <Grid item  xs={7}>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
              startIcon={<Facebook />}>
                Sign in with Google
            </Button>
        </Grid> 
        <Grid item xs={7}>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={()=>auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
            startIcon={<Facebook />}>
              Sign in with Facebook
          </Button>
        </Grid >
        <br/><br/>
          <Grid item xs ={12}>
            <CSnackbar
              open={open}
              message={errorMessage.message} 
              handleClose={handleClose}
              severity={severity}
            />
          </Grid>

        <Grid item xs={12} >
            <FormControl error = {values.email.error || false } variant="outlined" required fullWidth>
              <InputLabel htmlFor="Email">Email</InputLabel>
              <OutlinedInput
                id="email"
                label="Email"
                value={values.email.value}
                onChange={handleChange('email')}
              />
              {values.email.message&&
                <FormHelperText id="email">
                  {values.email.message}
                </FormHelperText>}
            </FormControl>
          </Grid> 
          <Grid item xs={12}>
            <FormControl error = {values.password.error || false } variant="outlined" required fullWidth>
              <InputLabel htmlFor="Password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={values.password.value}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment> }
              />
              {values.password.message&&
                <FormHelperText id="password">
                  {values.password.message}
                </FormHelperText>}
            </FormControl>
          </Grid> 
          <Grid item xs={6}>
            <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={SignUpHandler}>
                  Sign Up
              </Button>
          </Grid > 
          <Grid item xs={6}>
            <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={LoginHandler}>
                  Sign In 
              </Button>
          </Grid >  
      </Grid>
    </div>
  );
}
export default LoginComponent