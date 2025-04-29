import React, { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";
import { AuthContext } from "../contexts/authContext";

export default function Login(props) {
  const { isOpen, onClose} = props;
  const {handleLogin } = useContext(LoginContext)
  const {setLoggedInUser} = useContext(AuthContext)
  
  if (!isOpen) return null; 
  
  const handleSubmit =(e)=>{

    e.preventDefault()
   

      const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries()); 

    // console.log("user logged in: ", data);

    handleLogin(data)
    setLoggedInUser(data)
    onClose()
    
    

    
  }


  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-black"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-xl text-center mb-4">Login</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name="username"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
           className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name="password"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
