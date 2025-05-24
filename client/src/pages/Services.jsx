import React from "react";
import { Clock, TrainFront, BusFront } from "lucide-react";
import seventh from "../assets/seventh.jpg"; // You can change this to a bus/train image

export default function BusSchedule() {
  const schedules = [
    {
      trainNo: "12955",
      trainName: "JP MMCT Superfast Express",
      trainTime: "6:15 AM - 2:45 PM",
      busTime: "5:30 AM",
    },
    {
      trainNo: "19707",
      trainName: "Aravali Express",
      trainTime: "7:40 AM - 4:10 PM",
      busTime: "6:50 AM",
    },
    {
      trainNo: "22996",
      trainName: "Mandore Express",
      trainTime: "9:20 AM - 6:00 PM",
      busTime: "8:30 AM",
    },
    {
      trainNo: "19028",
      trainName: "Jat BDTS Vivek Express",
      trainTime: "11:00 AM - 8:00 PM",
      busTime: "10:10 AM",
    },
    {
      trainNo: "12955",
      trainName: "JP MMCT Superfast Express",
      trainTime: "6:15 AM - 2:45 PM",
      busTime: "5:30 AM",
    },
    {
      trainNo: "19707",
      trainName: "Aravali Express",
      trainTime: "7:40 AM - 4:10 PM",
      busTime: "6:50 AM",
    },
    {
      trainNo: "22996",
      trainName: "Mandore Express",
      trainTime: "9:20 AM - 6:00 PM",
      busTime: "8:30 AM",
    },
    {
      trainNo: "19028",
      trainName: "Jat BDTS Vivek Express",
      trainTime: "11:00 AM - 8:00 PM",
      busTime: "10:10 AM",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Bus & Train Schedules
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Check train timings and corresponding college bus departures for a smooth journey.
        </p>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Schedule
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <TrainFront size={20} />
                  <span className="font-semibold">
                    {schedule.trainNo} - {schedule.trainName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock size={18} />
                  <span>Train Time: {schedule.trainTime}</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <BusFront size={18} />
                  <span>Bus Departure: {schedule.busTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Travel Made Easy with EasyWay
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Stay updated with real-time train and college bus schedules. EasyWay ensures your journey starts right on time—hassle-free and student-friendly.
          </p>
          <img
            src={seventh}
            alt="Bus and Train Services"
            className="mx-auto w-full max-w-4xl rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}