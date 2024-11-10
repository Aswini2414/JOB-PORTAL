import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole] = useState("EMPLOYEE");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);
    console.log("role:",role.toUpperCase());

    try {
      const response = await axios.post("http://localhost:8083/auth/register", {
        name: username,
        email: email,
        password: password,
        role:role.toUpperCase()
      });
      if (response.status == 200) {
        toast.success("Signup successful!");
        navigate("/user/login");
      }
      console.log("response back....");
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-5" >
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Employee">Employee</option>
            <option value="Employer">Employer</option>
          </select>
        </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/user/login" className="text-indigo-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;