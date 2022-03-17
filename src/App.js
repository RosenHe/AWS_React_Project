import{ BrowerRouter, NavLink, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import LoginContent from "./LoginContent";
import PublicRoute from "../routes/PublicRoute";
import PrivateRoute from "../routes/PrivateRoute";
import {getUser, getToken, setUserSession, resetUserSession} from "./service/AuthService";
import React, {useState, useEffect } from "react";
import axios from "axios";

const verifyTokenAPIURL = 'https://aws/verify';

function App() {
  
  const [isAuthenicating, setAuthenicating] = useState(true);

  useEffect(()=>{
    const token = getToken();
    if(token ==='undefined' || token===undefined || token===null || !token){
      return;
    }

    const requestConfig ={
      headers: {
        'x-api-key' : 'api-key'
      }
    }
    const requestBody ={
      user: getUser(),
      token: token
    }
    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response =>{
      setUserSession(response.data.user, response.data.token);
      setAuthenicating(fasle);
    }).catch(() =>{
      resetUserSession();
      setAuthenicating(false);
    })
  }, []);

  const token = getToken();
  if(isAuthenicating && token){
    return <div className="content">Authenicating..</div>
  }

  return (
    <div className="App">
      <BrowerRouter>
      <div className="header">
        <NavLink exact activeClass="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Log in</NavLink>
        <NavLink activeClassName="active" to="/login-content">Content</NavLink>
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute  path="/login" component={Login}/>
          <PublicRoute  path="/register" component={Register}/>
          <PrivateRoute  path="/login-content" component={LoginContent}/>
        </Switch>
      </div>
      </BrowerRouter>
    </div>
  );
}

export default App;
