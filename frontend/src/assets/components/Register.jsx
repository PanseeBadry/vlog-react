import React, { useContext } from "react";
import { RegisterContext } from "../contexts/registerContext";
import axios from "axios";
import { Image } from "lucide-react";

export default function Register({ isOpen, onClose }) {
  const {handleRegister} = useContext(RegisterContext)
  const handleSubmit =async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("user avatar before: ",data.avatar)
    const imageUrl = await handleImageChange(data.avatar)
    handleRegister({...data,avatar:imageUrl})  
    onClose()    
  }
  const handleImageChange = async (avatar) => {
    if(!avatar) return;
    const formData = new FormData();
    formData.append('image', avatar);
    const apiKey = 'a92532ee4e136be66af8c7d01d6a5e28';
  
    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
      const imageUrl = response.data.data.url;
      console.log("image url", imageUrl);
      return imageUrl
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };


  if (!isOpen) return null; 
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-black"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-xl text-center mb-4">Register</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name="name"
          />
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name="username"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name="email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name="password"
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name="phone"
          />
           <div className="flex items-center gap-2">
    <Image size={18} />
    <input
      type="file"
      name="avatar"
      id="image"
      accept="image/*"
    />
  </div>

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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
