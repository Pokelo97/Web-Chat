import React from 'react'
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom'
import Narbar from './component/Navbar';
import { AuthProvider } from './contexts/AuthContext';

import Login from "./screen/LoginScreen"
import Chats from "./screen/ChatsScreen"

import CreateUser from './screen/CreateUserScreen';

import {useStyles} from './Styles.js'

function App(props) {
  const classes = useStyles(props);
  return (<>
    <div className={classes.root}>
        <Narbar/>
      </div>  
        <main >
          <div className={classes.drawerHeader} />
          <Router>
            <Switch>
              <Route exact path="/createuser" component={CreateUser}/>
              <AuthProvider>
                <Route exact path="/chats" component={Chats}/>
                <Route exact path="/" component={Login}/>
              </AuthProvider>
            </Switch>
          </Router>
        </main></>
  );
}

export default App;
