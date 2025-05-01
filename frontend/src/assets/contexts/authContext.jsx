import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();




const baseUrl = 'https://vlog-react-production.up.railway.app';
const AuthProvider = ({ children }) => {
  const [ loggedInUser,setLoggedInUser] = useState({})
  const token = localStorage.getItem('token')
//   console.log(token)

  
useEffect(() => {
    if (token) {
      console.log("token", token)
      axios.get(`${baseUrl}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        
        .then((res) => {
            console.log("ress",res.data);
          setLoggedInUser(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setLoggedInUser();
        })
        
    }else{
      setLoggedInUser()
    }
    
  }, [token]);
 
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };


