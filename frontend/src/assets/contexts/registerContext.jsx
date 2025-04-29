import React, { createContext  } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {

  const handleRegister = async (registeredUser) => {
    try {
      // console.log("registered user",registeredUser)
      const response = await axios.post('http://localhost:3000/register',registeredUser);
      if(response.status === 201) {
        toast("Registered successfully");
      }
      console.log(response.data.message)
    } catch (error) {
      if(error.response.status === 409) {
        toast("User already exists");

      }else{
        toast("Failed to register. Please try again.");
      }
    }
  };

  return (
    <RegisterContext.Provider value={{handleRegister  }}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };
