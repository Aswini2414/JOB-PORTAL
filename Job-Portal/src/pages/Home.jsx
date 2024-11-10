import React,{useContext,useEffect} from 'react';
import { context } from '../hooks/ContextProvider';
import { Link,useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        
        if (!token) {
          // If token is not found, redirect to login page
          navigate('/user/login');
        } 
      }, []);

    // const {user} = useContext(context);
    const user = JSON.parse(localStorage.getItem('user'));
    
    const handleLogout =(e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/user/login");
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Job Portal</h1>
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-700">Welcome, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h1>
        <p className="text-lg text-gray-700 text-center mb-2">Your email is: <span className="font-semibold">{user.email}</span></p>
        <p className="text-lg text-gray-700 text-center mb-4">You are an <span className="font-semibold">{user.role}</span></p>
        <p className="text-lg text-gray-700 text-center mb-6">Good luck for your future!</p>

        {user.role.toLowerCase() === 'employer' && (
          <div className="space-y-4">
            <Link
              to="/user/employer/create-job"
              className="block w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300 text-center"
            >
              Create Job Post
            </Link>
            <Link
              to="/user/employer/view-jobs"
              className="block w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300 text-center"
            >
              View Job Posts
            </Link>
            <Link
              to="/user/employer/view-applications"
              className="block w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300 text-center"
            >
              View Received Job Applications
            </Link>
          </div>
        )}

        {/* Buttons for EMPLOYEE */}
        {user.role.toLowerCase() === 'employee' && (
          <div className="space-y-4">
            <Link
              to="/user/employee/applied-jobs"
              className="block w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300 text-center"
            >
              View Applied Jobs
            </Link>
            <Link
              to="/user/employee/view-jobs"
              className="block w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300 text-center"
            >
              View Available Jobs
            </Link>
            <Link
              to="/user/employee/track-jobs"
              className="block w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300 text-center"
            >
              Track Jobs
            </Link>
          </div>
        )}

        {/* Buttons with proper alignment */}
        <div className="flex justify-between mt-6">
          <Link
            to="/user/update-profile"
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300"
          >
            Update Profile
          </Link>
          <button onClick={(e)=>handleLogout(e)}
            className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;