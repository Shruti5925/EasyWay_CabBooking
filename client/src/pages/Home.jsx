import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import car from "../assets/car.jpg";
import first from "../assets/first.jpeg";
import fourth from "../assets/fourth.jpeg";
import third from "../assets/third.jpeg";
import Banner from "./banner";
import UserBooking from "./UserBooking"
import seventh from  "../assets/seventh.jpg"
import sixth from "../assets/sixth.jpeg"

const slidesData = [
  {
    image: seventh, // Replace with your actual image import
    title: "Book A Cab",
    description: "Quick, reliable, and affordable rides at your fingertips.",
  },
  {
    image: fourth,
    title: "Drive Safe",
    description: "Ride with confidence—verified drivers, secure bookings, and responsive support.",
  },
  {
    image: sixth,
    title: "View Schedules",
    description: "Stay informed with up-to-date daily and festive college bus timings.",
  },
  {
    image: seventh,
    title: "Airport Travels",
    description: "On-time pickups and drop-offs to and from the airport, 24x7.",
  },
  {
    image: sixth,
    title: "Emergency Support",
    description: "Request urgent transportation quickly during unexpected situations—admin-approved for your safety.",
  },
  {
    image: third,
    title: "Safety First",
    description: "Your safety is our priority with verified drivers and emergency features.",
  }
];

export default function Home() {
  return (
    <>
      <div className="home-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px]">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full rounded-lg shadow-lg object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                  <h2 className="text-3xl sm:text-6xl font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-sm text-yellow-500 sm:text-lg">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Banner/>
    </>
  );
}
