import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrackJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);  // Add a loading state
  
    const navigate = useNavigate();
    // Fetch applied jobs in useEffect
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        
        if (!token) {
          // If token is not found, redirect to login page
          navigate('/user/login');
        } 
      fetchAppliedJobs();
    }, []);
  
    const fetchAppliedJobs = async () => {
      try {
        const userObj = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
        
        // Replace with your API endpoint that returns the applied jobs for the employee
        const response = await axios.get(`http://localhost:8083/job-applications/employee/my-applications/${userObj.id}`, config);
  
        // Log the response data to check its structure
        console.log("Response Data:", response.data);
  
        setAppliedJobs(response.data); // Set the fetched jobs
        setLoading(false);  // Turn off loading once data is fetched
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setLoading(false);  // Turn off loading even if there's an error
      }
    };
  
    if (loading) {
      return <p>Loading...</p>;  // Show a loading message while data is being fetched
    }
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Your Applied Jobs</h2>
  
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Title</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Location</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job) => {
                  return(<tr key={job.id} className="border-b">
                      {console.log(job.id)}
                    <td className="py-2 px-4 text-sm text-gray-700">{job.job.title}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{job.job.location}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{job.status}</td>
                  </tr>
  
                  )
                  
  
                }
  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default TrackJobs