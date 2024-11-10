import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewRecievedJobApplications = () => {

    const [applications, setApplications] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        
        if (!token) {
          // If token is not found, redirect to login page
          navigate('/user/login');
        } 
        const fetchApplications = async () => {
            try {
                const userObj = JSON.parse(localStorage.getItem("user"));
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                };
                const response = await axios.get(`http://localhost:8083/job-applications/get-job-applications-by-employees/${userObj.id}`, config);
                setApplications(response.data);
                toast.success("Fetched applications successfully");
            } catch (error) {
                console.error('Error fetching applications:', error);
                toast.error('Error fetching applications');
            }
        };

        fetchApplications();
    }, []);

    // Handle status change for a specific application
    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            
            // API call to update the status of the application
            const response = await axios.put(`http://localhost:8083/job-applications/update-status/${applicationId}`, { status: newStatus }, config);
            console.log(response);
            
            // Update local state after successful API call
            setApplications((prevApplications) =>
                prevApplications.map((application) =>
                    application.id === applicationId ? { ...application, status: newStatus } : application
                )
            );
            toast.success(`Application status updated to ${newStatus}`);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error updating status');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Job Applications for Your Jobs</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Job Title</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Employee Name</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application, i) => (
                                <tr key={i} className="border-b">
                                    <td className="py-2 px-4 text-sm text-gray-700">{application.title}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{application.name}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">
                                        <select
                                            value={application.status}
                                            onChange={(e) => handleStatusChange(application.id, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleStatusChange(application.id, 'Accepted')}
                                            className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition duration-300 mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(application.id, 'Rejected')}
                                            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-300"
                                        >
                                            Reject
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

export default ViewRecievedJobApplications;
