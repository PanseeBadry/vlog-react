import React, { useContext, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Bell, MessageCircle, Search, Menu, ChevronDown, BookOpen,  Users, Bookmark  } from "lucide-react";
import { AuthContext } from "../contexts/authContext";
import { LoginContext } from "../contexts/loginContext";

export default function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { loggedInUser } = useContext(AuthContext);
  const {handleLogout} = useContext(LoginContext)

  const handleClick = ()=>{
    if(loggedInUser){
      handleLogout()
    }else{
      setShowLogin(true)
    }
  }
  // console.log("userrrr" , loggedInUser)

  return (
    <div className="flex flex-col font-sans">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm fixed top-0 left-0 w-full h-16 z-50">
        <div className="container mx-auto flex items-center justify-between p-2">
          {/* Logo and Menu */}
          <div className="flex items-center">
            <button className="mr-3 lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Menu size={22} className="text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              <a href="/" className="flex items-center gap-2">
                <BookOpen size={24} />
                <span>PostHub</span>
              </a>
            </h1>
          </div>

          {/* Navigation Links - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-1">
            
            <a href="/" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Users size={18} className="mr-1" />
              Discover
            </a>
            <a href="/bookmarks" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Bookmark size={18} className="mr-1" />
              Bookmarks
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-6 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full text-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-all"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
           
            
            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <Bell size={20} className="text-gray-700 dark:text-gray-300" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                5
              </span>
            </button>
            
            {/* Messages */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <MessageCircle size={20} className="text-gray-700 dark:text-gray-300" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <img
                src={loggedInUser?.avatar || '/images/image.png'}
                alt="profile"
                className="w-8 h-8 rounded-full mr-2 border border-gray-200 dark:border-gray-700"
              />
              <span className="hidden md:inline text-gray-700 dark:text-gray-300 font-medium">
                {loggedInUser?.username || 'User'}
              </span>
              <ChevronDown size={16} className="ml-1 text-gray-500" />
            </div>
          </div>

          {/* Auth Buttons - Show when not logged in */}
          <div className="space-x-2">
            <button
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              onClick={handleClick}
            >
              {loggedInUser ? 'Logout' : 'Login'}
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        </div>
      </header>
      
      <div className="h-16"></div>
      
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Register isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
}