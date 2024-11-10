import React, { useState,useContext } from "react";
import { context } from "../hooks/ContextProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const{user,setUser} = useContext(context);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try {
        const response = await axios.post("http://localhost:8083/auth/login", {
          email: email,
          password: password,
        });
        if (response.status == 200) {
          toast.success("Login successful!");
          console.log(response);
          const token = response.data.token;
          localStorage.setItem('token',token);
          const userDetails = {
            id:response.data.id,
        name:response.data.name,
        email:response.data.email,
        role:response.data.role
          };
          setUser(userDetails);
          localStorage.setItem('user',JSON.stringify(userDetails));
          navigate("/user/home");
        }
      } catch (error) {
          toast.error(error.message);
      }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/user/register" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;