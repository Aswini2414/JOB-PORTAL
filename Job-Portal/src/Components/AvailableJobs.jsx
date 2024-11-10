import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(false);

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  // Fetch job data from an API
  useEffect(() => {
    const token = localStorage.getItem('token');
        
        
        if (!token) {
          // If token is not found, redirect to login page
          navigate('/user/login');
        } 
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const userObj = JSON.parse(localStorage.getItem("user"));
      const config = {
          headers:{
              Authorization: `Bearer ${token}`,
          }
      }
      // Replace with your API endpoint to fetch jobs
      const response = await axios.get(`http://localhost:8083/job-applications/employee/jobs/${userObj.id}`,config);
      console.log(response);
      setJobs(response.data); // Set the fetched jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Handle the apply button click
  const handleApply = async(jobId) => {
    try{
      const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
      const response = await axios.get(`http://localhost:8083/job-applications/employee/apply/${jobId}`,config);
      if(response.status==200){
        setAppliedJobs(true);
        toast.success("Job applied successfully");
        fetchJobs();
      }

    }catch(error){
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Available Jobs</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Title</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Location</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Salary</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b">
                  <td className="py-2 px-4 text-sm text-gray-700">{job.title}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.description}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.location}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">${job.salary.toLocaleString()}</td>
                  <td className="py-2 px-4">
                    
                      <button
                        onClick={() => handleApply(job.id)}
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300"
                      >
                        Apply
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AvailableJobs;
