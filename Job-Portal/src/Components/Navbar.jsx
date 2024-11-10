import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Handle the logout action
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigate to the login page
    navigate('/user/login');
  };

  // Handle the navigation to home
  const goToHome = () => {
    navigate('/user/home');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 flex justify-between items-center shadow-md">
      {/* Job Portal icon/text */}
      <div
        className="text-white text-3xl font-bold cursor-pointer hover:text-gray-200 transition duration-300"
        onClick={goToHome}
      >
        Job Portal
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow-lg"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
