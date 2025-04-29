// LoginContext.js
import React, { createContext, useContext  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from './authContext';
import { toast } from 'react-toastify';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {

  const navigate = useNavigate()
  const {setLoggedInUser} = useContext(AuthContext)
  const handleLogin = async (userLoggedIn) => {
    // console.log("okkkk") // 1
    try {
      const response = await axios.post('http://localhost:3000/login',userLoggedIn);
      console.log("in login context",response.data.user) // 3
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);   
        console.log('token saved'); // 4
      
      }
      setLoggedInUser(response.data.user)
      // console.log(loggedInUser)
      navigate('/')
    } catch (error) {
      if(error.response.status === 401){ 
        toast("Invalid username or password");

      }else{
        toast("Failed to login. Please try again."); 
        console.error('Login failed:', error);
 

      }
      setLoggedInUser();    

    }
  };
  const handleLogout = () => {
    setLoggedInUser({});
    localStorage.removeItem('token');
    toast("Logged out successfully");
  };

  return (
    <LoginContext.Provider value={{  handleLogin ,handleLogout }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
