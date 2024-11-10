import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ViewJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

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
      // Replace with your API endpoint
      const userObj = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      const config = {
          headers:{
              Authorization: `Bearer ${token}`,
          }
      }
      const response = await axios.get(`http://localhost:8083/job/employer/my-jobs/${userObj.id}`,config);

      console.log(response);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false); // Turn off loading even if there's an error
    }
  };

  // Handle job update action
  const handleUpdate = (id) => {
    // Navigate to the update job page with the job ID (replace with actual route)
    navigate(`/employer/update-job/${id}`);
  };

  // Handle job delete action
  const handleDelete = async (id) => {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        // Replace with your delete API endpoint
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.delete(`http://localhost:8083/job/employer/delete/${id}`,config);
        console.log(response);
        if(response.status==200){
            toast.success("Job deleted Successfully");
            fetchJobs();
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
        <p className="text-white text-xl">Loading Jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Job Posted</h2>

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
                    {console.log(job.id)}
                  <td className="py-2 px-4 text-sm text-gray-700">{job.title}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.description}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{job.location}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">${job.salary.toLocaleString()}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <Link
                      to={`/user/employer/update-job/${Number(job.id)}`}
                      className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
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

export default ViewJobs;
