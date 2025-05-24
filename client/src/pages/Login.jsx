import React, { useContext, useState } from 'react';
import sideImg from '../assets/sideimg.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CabAppContext } from '../context/CabAppContext';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate=useNavigate();

  const { backendUrl, setToken } = useContext(CabAppContext);

  const [formData,setFormData]=useState({
    email:'',
    password:''
  })

  const handleChange=(e)=>{
    const {name, value}= e.target
    setFormData({
      ...formData,
      [name]:value
    })
  
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
  
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, formData);
  
      if (data.success) {
        toast.success("Login Successfully!", {
          className: "bg-green-600 text-white rounded shadow",
        });
  
        setToken(data.token);  
        localStorage.setItem("token", data.token);  
        setFormData({ name: "", email: "", password: "" });  
        navigate("/");  
      } else {
        toast.error(data.msg || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
      // console.error(error);
    }
  };
  


  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      {/* Left - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}

              className="w-full p-3 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-gray-700 text-white cursor-pointer py-3 rounded-md hover:bg-gray-600"
            >
              Login
            </button>
          </form>

          <div className='mt-3 '>
            <p>Don't  have an Account !   <span className='text-gray-700 font-bold cursor-pointer' onClick={()=>navigate('/signup')} > Register</span> </p>
          </div>


        </div>
      </div>

      {/* Right - Image */}
      <div className=" md:w-1/2">
        <img
          src={sideImg}
          alt="Side Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
