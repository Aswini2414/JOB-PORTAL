import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const UpdateJob = () => {
  let { id } = useParams(); // Get the job ID from the URL
  console.log(typeof(id),id);
  const navigate = useNavigate();
  const userObj = JSON.parse(localStorage.getItem("user"));
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    employerId: userObj.id
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    
    if (!token) {
      // If token is not found, redirect to login page
      navigate('/user/login');
    } 
  }, []);


  const [loading, setLoading] = useState(false);

  // Fetch job details by ID when the component mounts
  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Replace with your actual API endpoint to fetch the job by ID
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get(`http://localhost:8083/job/employer/get/${id}`,config);
        console.log(response);
        // Set the job data in the state
        setJob({
          title: response.data.title,
          description: response.data.description,
          location: response.data.location,
          salary: response.data.salary
        });
        setLoading(false); // Turn off the loading state
      } catch (error) {
        console.error('Error fetching job:', error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value
    });
  };

  // Handle form submission for updating the job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
      // Replace with your API endpoint for updating a job
      const response = await axios.put(`http://localhost:8083/job/employer/update/${id}`,job,config);
        console.log(response);
        if(response.status==200){
            toast.success("Job Updated Successfully");
        navigate("/user/employer/view-jobs")
        }else{
            toast.error("Error updating the job");
        }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Error updating job.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
        <p className="text-white text-xl">Loading Job Details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Job Post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={job.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={job.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              value={job.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              value={job.salary}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
