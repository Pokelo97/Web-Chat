import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CSnackbar =(props)=> {
  if(props.chatOpen){
    <Snackbar open={props.chatOpen} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
  }
  if(props.open){
      return(
        <Alert onClick={props.handleClose} onClose={props.handleClose} severity={props.severity}>
          {props.message}
        </Alert>)}
  return(<></>)
}
export default CSnackbar