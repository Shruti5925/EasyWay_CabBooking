// src/data/teamData.js

import u1 from '../assets/u1.jpg'
import u2 from '../assets/u2.jpg'

import u3 from '../assets/u3.jpg'
import u4 from '../assets/u4.jpg'


 
const teamMembers = [
  {
    name: "Anubhuti Sharma",
    image: u1,
    role: "",
    bio: "",
  },
  {
    name: "Khushi Malik",
    image: u2,
    role: "",
    bio: "",
  },
  {
    name: "Shruti Jha",
    image: u3,
    role: "",
    bio: "",
  },
  {
    name: "Vatsala Tripathi",
    image: u4,
    role: "",
    bio: "",
  },
];


import React from "react";

import aboutpg from "../assets/aboutpg.png";
import aboutbv from "../assets/aboutbv.png";

export default function About() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="w-full max-w-6xl mx-auto p-8 rounded-xl ">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About EasyWay
        </h2>
        <p className=" text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        EasyWay is a comprehensive travel management system built specifically for students
         to simplify their transportation needs within and outside the campus. It offers a 
         range of services including daily cab booking, cab sharing for cost-effective travel, 
         emergency ride requests during urgent situations, and access to real-time college bus 
         schedules. The platform ensures safety through verified drivers and an admin approval 
         system, especially for sensitive features like emergency and festival travel. Designed 
         with user convenience in mind, EasyWay brings all essential travel services into one 
         seamless interface—making commutes smoother, more reliable, and better organized for college students.
        </p>

        
        
        {/* Bottom Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <img src={aboutpg} alt="Cab environment" className="rounded-lg shadow-md" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">Your go-to travel partner for every plan</h4>
            <p className="text-gray-600 text-sm">
            EasyWay is your ultimate travel companion, offering seamless booking experiences for cabs, buses, and emergency rides. With real-time schedules, reliable services, and easy navigation, we make commuting hassle-free and efficient for every journey
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-12">
          <div className="md:order-2">
            <img src={aboutbv} alt="Booking visual" className="rounded-lg shadow-md" />
          </div>
          <div className="md:order-1">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Seamless Booking Experience</h4>
            <p className="text-gray-600 text-sm">
              With just a few clicks, you can find and reserve a  cab that suits your needs. Our platform ensures a smooth and hassle-free booking process
              so you can focus on what truly matters — enjoying your time.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-yellow-500 mb-6 text-center">
          Meet Our Team
        </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 hover:shadow-xl transition-shadow rounded-lg p-6 text-center shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-4 border-yellow-400"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h4>
              <p className="text-yellow-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>

    </div>
    
  );
}
