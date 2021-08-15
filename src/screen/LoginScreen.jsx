import React from 'react'
import LoginComponent from '../component/LoginComponent'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {useStyles} from '../Styles'

const Login = (props) =>{
  const classes = useStyles(props);

  
  return(
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Welcome to Chat Room
          </Typography>
          <br/><br/>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <br/>
          <LoginComponent/>
        </Paper>
      </div>
    </Container>
  )
}
export default Login;