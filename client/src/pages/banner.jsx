import React from "react";

import services from "../assets/services.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

// import { useContext } from "react";
// import  cabAppContextProvider from "../context/AuthContext";

export default function Banner() {

    // 
  const banners = [
    {
    image: services,
    title: "Welcome to EasyWay",
    subtitle: "Your smart travel companion",
    description:
      "From daily commutes to emergency rides, EasyWay brings you safe, reliable, and seamless travel services tailored for students. Plan, book, and manage your trips—all in one place.",
    buttonText: "Explore More",
  },
  {
    image: banner2,
    title: "Reliable Travel",
    subtitle: "Focused on safety and convenience",
    description:
      "EasyWay ensures every ride is backed by verified drivers, clear routes, and student-focused services—from regular buses to emergency bookings, all with your comfort in mind.",
    buttonText: "Know More",
  },
  {
    image: banner3,
    title: "Book a Ride Now",
    subtitle: "Your ride is just a few clicks away",
    description:
      "Skip the hassle—reserve your ride in advance for daily commutes or emergency travel. Whether it’s a regular trip or urgent need, EasyWay is here to get you where you need to go, stress-free.",
    buttonText: "Book Now",
  },
  ];

  return (
    <div className="w-full px-6 py-12 md:px-[5%] space-y-16">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
        <span className="text-yellow-500">Discover</span> Our  EasyWay
      </h2>
      <p className="text-gray-600 mx-auto w-3/4">
      EasyWay is a student-focused travel management system designed to simplify 
      and streamline campus transportation. Whether you need to book a daily cab, 
      share rides with classmates, catch a scheduled college bus, or request urgent 
      travel during emergencies, EasyWay brings all your travel needs into one easy-to-use 
      platform. With verified drivers, admin oversight, and flexible booking options, EasyWay 
      ensures safe, reliable, and efficient journeys tailored to student life.
      </p>
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } items-center gap-10`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-64 md:h-96 object-contain rounded-2xl shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800">
              {banner.title}
            </h2>
            <h3 className="text-lg text-gray-600 mb-4 font-medium">
              {banner.subtitle}
            </h3>
            <p className="text-base  text-gray-700 mb-6 leading-relaxed">
              {banner.description}
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300">
              {banner.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
