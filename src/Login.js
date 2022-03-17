import React,{useState} from "react";
import { setUserSession } from "./service/AuthService";
import axios from 'axios';
const loginUrl = 'https://aws/login';

const Login = (props) =>{
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [errorMessage, setErrorMessage] = useState(null);
        const submitHandler =(event) =>{
                event.prevenDefault();
                if(username.trim() === '' || password.trim() ===''){
                        setErrorMessage('username and password are required.');
                        return;
                }
                setErrorMessage(null);
                const requestConfig = {
                        headers:{
                                'x-api-key': 'api-key'
                        }
                }
                axios.post(registerUrl, requestBody, requestConfig).then(response =>{
                        setUserSession(response.data.user, response.data.token);
                        props.history.push("/login-content");
                }).catch(error =>{
                        if(error.response.status === 401 || error.response.status === 403){
                                setErrorMessage(errpor.response.data.message);
                        }else{
                                setErrorMessage('Sorry, please try again later.');
                        }
                })
        }
        return (
                <div>
                        <form onSubmit={submitHandler}>
                                <h5>Log in</h5>
                                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)}/><br/>
                                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)}/><br/>
                                <input type="submit" value="Log in"/>
                        </form>
                        {message && <p className="message">{errorMessage}</p>}
                </div>
        );
};
export default Login;