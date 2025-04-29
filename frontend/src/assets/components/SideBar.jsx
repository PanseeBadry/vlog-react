import React, { useContext } from 'react';
import { Home, Users, MessageCircle, Bell, Bookmark, Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router';
import { AuthContext } from '../contexts/authContext';
import { toast } from 'react-toastify';

export default function SideBar() {
  const { loggedInUser,setLoggedInUser } = useContext(AuthContext);
  const handleLogout = () => {
      setLoggedInUser()
      localStorage.removeItem('token');
      toast("Logged out successfully");
  }
  return (
    <div className="font-sans">
      {/* Sidebar */}
      <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow-lg fixed left-0  h-screen w-[260px] border-r border-gray-100 dark:border-gray-800 z-50 transition-all duration-300">
        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3">
          <div className="mb-6 px-4">
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Menu</h2>
          </div>
          
          <ul className="space-y-1 px-2">
            <Link to="/">
              <li className="flex items-center p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
                <Home size={20} className="flex-shrink-0" />
                <span className="ml-3">Home</span>
              </li>
            </Link>
            
            <Link to="/friends">
              <li className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300 transition-colors">
                <Users size={20} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Friends</span>
                <span className="ml-auto bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs px-2 py-1 rounded-full font-medium">12</span>
              </li>
            </Link>
            
            <Link to="/messages">
              <li className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300 transition-colors">
                <MessageCircle size={20} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Messages</span>
                <span className="ml-auto bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs px-2 py-1 rounded-full font-medium">3</span>
              </li>
            </Link>
            
            <Link to="/notifications">
              <li className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300 transition-colors">
                <Bell size={20} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Notifications</span>
              </li>
            </Link>
            
            <Link to="/saved">
              <li className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300 transition-colors">
                <Bookmark size={20} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Saved</span>
              </li>
            </Link>
          </ul>
          
          <div className="my-6 px-4">
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account</h2>
          </div>
          
          <ul className="space-y-1 px-2">
            <Link to="/profile">
              <li className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300 transition-colors">
                <User size={20} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Profile</span>
              </li>
            </Link>
            
            <Link to="/settings">
              <li className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300 transition-colors">
                <Settings size={20} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Settings</span>
              </li>
            </Link>
          </ul>
        </nav>
        
        {/* User Profile & Logout */}
        <div className="px-3 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
              <img src={loggedInUser?.avatar || 'images/image.png'} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">{loggedInUser?.username || 'User'}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs truncate">{loggedInUser?.email || 'User@email.com'}</div>
            </div>
            <div className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <LogOut size={18} className="text-gray-500 dark:text-gray-400" onClick={handleLogout}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}