import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";

const UpdateProfile = () => {

    const navigate = useNavigate();

  // State to hold the form data
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    email: '',
    password: '',
    role: ''
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser) {
      setFormData(storedUser);  // Pre-fill the form with user data
    } else {
      // If no user data is found, redirect to the login page
      navigate('/user/login');
    }
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    if(name=="role"){
      value = value.toUpperCase();
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission to update user profile
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.put(`http://localhost:8083/token/authorize/update/${formData.id}`,formData,config);
        if(response.status==200){
        // Update user data in localStorage
          const newUserObj ={
            id:response.data.id,
            name:response.data.name,
            email:response.data.email,
            role:response.data.role,
          }
        localStorage.setItem('user', JSON.stringify(newUserObj));
        console.log(response);
        toast.success(response.data.message);
        navigate("/user/home");
        }else{
            toast.error("User not updated");
        }

    }catch(error){
        toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Role Field */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="EMPLOYER">Employer</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default UpdateProfile;