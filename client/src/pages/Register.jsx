import React, { useContext, useState } from "react";
import sideImg from "../assets/sideimg.jpg";
import { useNavigate } from "react-router-dom";
import { CabAppContext } from "../context/CabAppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(CabAppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/register`,
        formData
      );
      console.log(data);
      if (data.success) {
        toast.success(data.msg, {
          className: "bg-green-600 text-white rounded-lg shadow-lg",
          bodyClassName: "text-sm font-medium",
          progressClassName: "bg-white",
        })

        localStorage.setItem("token", data.token); 
        setToken(data.token); 
        setFormData('');
        navigate('/');

      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      {/* Left - Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Register</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              Sign Up
            </button>
          </form>

          <div className="mt-3 ">
            <p>
              Already have an Account !{" "}
              <span
                className="text-gray-700 font-bold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {" "}
                Login
              </span>{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Right - Image */}
      <div className=" md:w-1/2 ">
        <img src={sideImg} alt="Cab" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
