import React, { useState,useEffect } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    
    if (!token) {
      // If token is not found, redirect to login page
      navigate('/user/login');
    } 
  }, []);

const userObj = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    employerId: userObj.id
  });

const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(userObj.id);
    // For now, just log the form data

    try{
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        console.log(formData);
        const response = await axios.post(`http://localhost:8083/job/post-job`,formData,config);
        if(response.status==200){
            console.log(response);
            toast.success("Job posted successfully");
            navigate("/user/employer/view-jobs");
        }
    }catch(error){
    toast.error(error.message);
    }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Post a New Job</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job title"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Job Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job location"
              required
            />
          </div>

          {/* Salary Field */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter salary"
              required
            />
          </div>
           {/* Employee ID Field */}
           <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 hidden">Employee ID</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={userObj.id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hidden"
              placeholder="Enter Employee ID"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default CreateJob;
